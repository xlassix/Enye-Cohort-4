import React,{useState} from "react";
import { Input,AutoComplete,Form,Button,Spin} from 'antd';
import CardBox from './layouts/cardBox'
import {SearchOutlined,BankOutlined } from '@ant-design/icons';

interface Values {
  distance?: number;
  location?: string;
}
interface LooseObject {
  [key: string]: any
}

interface PriceInputProps {
  value?: Values;
  onChange?: (value: Values) => void;
}
declare module window {
  const google: any;
  const map:any;
  const infowindow: any;
}

//hospital icon
const hospital = (
  <BankOutlined
    style={{
      fontSize: 18,
      color: '#1890ff',
      margin: '0 5px'
    }}
  />
);

const SearchComponent= ()=>{

  //states  and variable declaration
  const {Option} =AutoComplete;
  const [result, setResult] = useState<string[]>([]);
  const [store, setStore] = useState<object[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [query_loc, setQuery] = useState<String>('');
  const [history, setHistory]= useState<string[]>([]);
  const [loading,setLoading]=useState<boolean>(false);
  var map:any;
  const [markers_loc,setMarkers] =useState<Array<LooseObject>>([]);
  var markers:Array<LooseObject>=[]
  var placesService;
  var longitude:number;
  var latitude:number;



  //handle search in autocomplete field
  const handleSearch = (value: string) => {
      let res: string[] = history;
      if (value ) {
        res = res.filter((domain:string) => domain.includes(value));
      }
      setResult(res);
    };

    
  function findHospitals(position: any){

    //get latitute and longitude
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;

    //create current location object
    var current_loc = new window.google.maps.LatLng(latitude,longitude)

    //initialize map
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: current_loc,
      zoom: 15
    });

    // create request object
    const placesRequest = {
      location:  current_loc,
      query: query_loc,
      radius: distance,
      type: ["hospital"],
    };

    // initialise library
    placesService = new window.google.maps.places.PlacesService(map);

    //request
    placesService.nearbySearch(placesRequest, function (results:any, status:any) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        results=results.filter((domain:LooseObject) =>{ 
          return( domain.name.toLowerCase().includes(query_loc.toLowerCase())||(domain.formatted_address? domain.formatted_address.toLowerCase().includes(query_loc.toLowerCase()):false )||(domain.vicinity? domain.vicinity.toLowerCase().includes(query_loc.toLowerCase()):false ))})
        for (var i = 0; i < results.length; i++) {
          markers[i]=createMarker(results[i],map);
          markers[i].id=i;
          results[i].id=i;
        }
      }

      //update state
      setStore(results)
      setMarkers(markers)
    });
    //update state
    setTimeout(() => {  setLoading(false); },2000);
    }

    //createMarket
    function createMarker(place:any,map:any) {
      var infoWindow = new window.google.maps.InfoWindow();
      var marker = new window.google.maps.Marker({
        map: map,
        animation: window.google.maps.Animation.DROP,
        position: place.geometry.location,
      });
      new window.google.maps.event.addListener(marker, 'click', (function(marker) {
        return function(){
          infoWindow.setContent(place.name)
          infoWindow.open(map,marker)
          map.setCenter(marker.getPosition());
        }
      })(marker));
      new window.google.maps.event.addListener(map, 'click', (function() {
        return function(){
          if (infoWindow) {
            infoWindow.close();
          }
        }
      })());
      return marker
    }

    //onCard Click
    const mapClick=(id:Number)=>{
      var infoWindow = new window.google.maps.InfoWindow();
      if (infoWindow) {
        infoWindow.close();
      }
      let current:LooseObject = markers_loc.filter((marker:any)=>{return marker.id===id});
      window.google.maps.event.trigger(current[0], 'click');
    }

    //handle Geoloaction Errors
    function errorHandler(err:any) {
        if(err.code === 1) {
           alert("Error: Access is denied!");
        } else if( err.code === 2) {
           alert("Error: Position is unavailable!");
        }
     }

     //get location from browser
     function getLocation(){
        if(navigator.geolocation){
           // timeout at 60000 milliseconds (60 seconds)
           var options = {timeout:60000};
           navigator.geolocation.getCurrentPosition
           (findHospitals, errorHandler, options);
        } else{
           alert("Sorry, browser does not support geolocation!");
        }
     }

     const handleSubmit = (values:LooseObject) => {
       setLoading(true)
       setHistory([...history,values.query])
       setTimeout(() => {  getLocation(); },2500);
    };
    const handleChange=(event:any)=>{
      if (typeof event.target === "undefined"){
        setQuery(event)
      }else{
        setDistance(parseInt(event.target.value))
      }
    }


    return (
      <div  className="perfect_scroll">
        <Spin tip="Loading..." spinning={loading} >
          <Form onFinish={handleSubmit} name="form">
            <Form.Item
                name="query"
                rules={[{ required: true, message: 'Please input Name' }]}
                style={{ width: '48%',textAlign:"left" }} 
              >
                <AutoComplete  onSearch={handleSearch}
                              placeholder="Enter Place"
                              onChange={handleChange}
                              >
                  {result.map((value: string) => (
                    <Option key={value} value={value}>
                      {value}
                    </Option>
                  ))}
                </AutoComplete>
              </Form.Item>
              <Form.Item name="radius"  rules={[{ required: true, message: 'Please input valid radius' }]} >
                <Input
                      max={50000}
                      min={0}
                      name="radius"
                      onChange={handleChange}
                      type="number"
                      placeholder="radius"
                      suffix="m"
                      />
              </Form.Item>
              <Form.Item>
                  <Button type="primary"  htmlType="submit" icon={<SearchOutlined  style={{ fontSize: 16}}/>}></Button>
              </Form.Item>
                </Form>
            <div className="Cards">
                  {loading? [<h2>{hospital} Finding hospitals near you.</h2>]:history.length===0? [<h2>{hospital} Find hospitals near you.</h2>]:store.length===0? [<h2>{hospital}No Hospitals found</h2>]: <CardBox CardClick={mapClick} data={store} /> }
            </div>
        </Spin>
      </div>
    );
}
export default SearchComponent