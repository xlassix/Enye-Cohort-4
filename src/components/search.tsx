import React, { useState } from "react";
import { Input, AutoComplete, Form, Button, Spin, message } from 'antd';
import CardBox from './layouts/cardBox'
import { SearchOutlined, BankOutlined } from '@ant-design/icons';
import { db} from '../firebase/config'
import HistoryBox from "./layouts/historyBox"
import { useDispatch, useSelector } from "react-redux"
import { updateResults, clearResult } from "../store/data/actions"
import withAuthentication from "../firebase/auth"
import {  Link } from "react-router-dom";
import { SIGN_OUT } from "../routes/all";
interface LooseObject {
  [key: string]: any
}

declare module window {
  const google: any;
  const map: any;
  const infowindow: any;
  const innerWidth: number;
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

const success = (info: string) => {
  message.success(info, 1.5);
};
const error = (info: string) => {
  message.error(info, 4);
};


const SearchComponent = () => {

  //states  and variable declaration
  const { Option } = AutoComplete;
  const [result, setResult] = useState<string[]>([]);
  const [radius_loc, setRadius] = useState<number>(0);
  const [query_loc, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  var searchCount: number = 0;
  var map: any;
  var markers: Array<LooseObject> = []
  var placesService: any;
  var longitude: number;
  var latitude: number;
  const [form] = Form.useForm();

  //initialise dispatcher
  const dispatch = useDispatch();
  const { results_loc, markers_loc } = useSelector((state: LooseObject) => { return (state.search) })
  const { userId, histories } = useSelector((state: LooseObject) => { return (state.user) })

  //handle search in autocomplete field
  const handleSearch = (value: string) => {
    let temp = new Set(histories.map((x: LooseObject) => { return (x.query) }))
      ;
    let res: any[] = Array.from(temp);
    if (value) {
      res = res.filter((domain: string) => domain.includes(value));
    }
    setResult(res);
  };


  //the function sends query to javascript API, process and stores the response
  function findHospitals(position: any) {

    //get latitute and longitude
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    //create current location object
    var current_loc = new window.google.maps.LatLng(latitude, longitude)

    //initialize map
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: current_loc,
      zoom: 15
    });


    // Types for Entity
    const loc_types = ['pharmacy', "hospital", 'doctor', 'drugstore'];
    var cache: string[] = [];

    // initialise library
    placesService = new window.google.maps.places.PlacesService(map);


    loc_types.forEach(loc_type => {
      // create request object
      const placesRequest = {
        location: current_loc,
        query: query_loc,
        radius: radius_loc,
        type: [loc_type],//'pharmacy']//'drugstore']//,'health',"pharmacy",'doctor','drugstore','pharmacy']
      };

      //request
      placesService.nearbySearch(placesRequest, function (results: any, status: any) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results = results.filter((domain: LooseObject) => {
            if (domain.place_id in cache) {
              return (false);
            }
            if (domain.name.toLowerCase().includes(query_loc.toLowerCase()) || (domain.formatted_address ? domain.formatted_address.toLowerCase().includes(query_loc.toLowerCase()) : false) || (domain.vicinity ? domain.vicinity.toLowerCase().includes(query_loc.toLowerCase()) : false)) {
              cache.push(domain.place_id)
              return (true);
            }
            return (false)
          })
          for (var i = 0; i < results.length; i++) {
            markers[i] = createMarker(results[i], map);
            markers[i].placeResult = results[i]
            markers[i].id = loc_type + i;
            results[i].id = loc_type + i;
          }
          dispatch(updateResults({ markers_loc: markers, results_loc: results }))
        }
      });
    });

    //Store entity Firebase
    db.collection("history").add({
      query: query_loc,
      radius: radius_loc,
      userId: userId
    })
      .then(function (docRef) {
        success("written to firestore")
      })
      .catch(function (err) {
        error("Error adding document: " + err)
      }).then(() => { setLoading(false) });
  }
  searchCount += 1;
  //createMarket
  function createMarker(place: any, map: any) {
    var infoWindow = new window.google.maps.InfoWindow();
    var marker = new window.google.maps.Marker({
      map: map,
      animation: window.google.maps.Animation.DROP,
      position: place.geometry.location,
    });
    new window.google.maps.event.addListener(marker, 'click', (function (marker) {
      return function () {
        infoWindow.setContent(place.name)
        infoWindow.open(map, marker)
        map.setCenter(marker.getPosition());
        map.setZoom(16)
      }
    })(marker));
    new window.google.maps.event.addListener(map, 'click', (function () {
      return function () {
        if (infoWindow) {
          infoWindow.close();
          map.setZoom(15)
        }
      }
    })());
    return marker
  }


  //handles the Click event of every card Component
  const mapClick = (id: String) => {
    var infoWindow = new window.google.maps.InfoWindow();
    if (infoWindow) {
      infoWindow.close();
    }
    let current: LooseObject = markers_loc.filter((marker: any) => { return marker.id === id });
    window.google.maps.event.trigger(current[0], 'click');
  }

  function errorHandler(err: any) {
    if (err.code === 1) {
      alert("Error: Access is denied!");
    } else if (err.code === 2) {
      alert("Error: Position is unavailable!");
    }
  }
  function getLocation() {
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      var options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition
        (findHospitals, errorHandler, options);
    } else {
      alert("Sorry, browser does not support geolocation!");
    }
  }

  //Handle the onSubmit event of search input form
  const handleSubmit = (values: LooseObject) => {
    dispatch(clearResult())
    setLoading(true)
    getLocation();
  };

  //Update form State values
  const handleChange = (event: any) => {
    if (typeof event.target === "undefined") {
      setQuery(event)
    } else {
      setRadius(parseInt(event.target.value))
    }
  }

  //Onhistory click
  const HistoryClick = (object: LooseObject) => {
    setRadius(object.radius)
    setQuery(object.query)
    form.setFieldsValue({
      query: object.query,
      radius: object.radius,
    });
    form.submit()
    //form.resetFields();
  }
  return (
    <div className="App__search perfect_scroll">
      <Spin tip="Loading..." spinning={loading} >
          <Form onFinish={handleSubmit} name="form" form={form} className='search_form'>
            <Form.Item
              name="query"
              rules={[{ required: true, message: 'Enter search params' ,}]}
              style={{ width: '45%', textAlign: "left" }}
            >
              <AutoComplete onSearch={handleSearch}
                placeholder="Search for facilities"
                onChange={handleChange}
              >
                {result.map((value: string) => (
                  <Option key={value} value={value}>
                    {value}
                  </Option>
                ))}
              </AutoComplete>
            </Form.Item>
            <Form.Item name="radius" rules={[{ required: true, message: 'Invalid' }]} >
              <Input
                max={50000}
                min={0}
                onChange={handleChange}
                type="number"
                placeholder="radius"
                suffix="m"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined style={{ fontSize: 16 }} />}></Button>
            </Form.Item>
            <Form.Item >
              <Button type="primary" style={{ margin: "0 0.5vw" }}><Link to={SIGN_OUT} > Logout</Link></Button>
            </Form.Item>
          </Form>

        {Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 798 ? <HistoryBox loaded={loading} ListItemClick={HistoryClick} /> : undefined}
        <div className="Cards">
          {loading ? [<h2>{hospital} Finding health facilities near you.</h2>] :
            searchCount === 0 ? [<h2>{hospital} Find Health facilities near you.</h2>] :
              results_loc.length === 0 ? [<h2>{hospital}No health facilities found</h2>] :
                <CardBox CardClick={mapClick} data={results_loc} />}
        </div>
      </Spin>
      {Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 798 ? <HistoryBox loaded={loading} ListItemClick={HistoryClick} /> : undefined}
    </div>
  );
}
export default withAuthentication(SearchComponent)