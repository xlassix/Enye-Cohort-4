import React, { useState, useEffect, useRef } from 'react';

declare module window {
    function initMap(): any;
    const google: any;
}

// var map;
// var service;
// var infowindow;

// function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     query: 'restaurant'
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
const Map= ()=>{
    let googleMapRef = useRef(null);
    let [googleMap, setGoogleMap] = useState("")

    useEffect(() => {
        // Update the document title using the browser API
        window.initMap = () => {
            console.log("Creating map");
            setGoogleMap(new window.google.maps.Map(googleMapRef.current, {
                zoom: 8,
                center: {
                    lat:  6.465422,
                    lng:  3.406448,
                },
                disableDefaultUI: true
            }));
            console.log("done with map");
            // var pyrmont = new window.google.maps.LatLng(-33.867, 151.195)
            // var map = new window.google.maps.Map(document.getElementById('map'), {
            //   center: pyrmont,
            //   zoom: 15
            // });
      
            // const placesRequest = {
            //   location:  new window.google.maps.LatLng(1.3521, 103.8198),
            //   type: ['restaurant', 'cafe'],
            //   query: 'ice cream',
            //   rankBy:  window.google.maps.places.RankBy.DISTANCE,
              // radius: 30000, 
            //};
      
            //var placesService = new window.google.maps.places.PlacesService(map);
            // console.log(placesService)
            // placesService.textSearch(placesRequest, ((response : any) => {
            //   console.log("here")
            // }))
        }
        const googleScript = document.createElement('script');
        googleScript.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap";
        document.body.appendChild(googleScript)
        // window.google.maps.event.addListener(marker, 'click',(infowindow:any)=> {src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
        //     infowindow.setContent(place.name);
        //     infowindow.open(map, this);
        //   });

        // googleScript.addEventListener('load',async ()=>{
        //    await 
        // })

        googleScript.addEventListener('error', ev => {
            console.warn("it blew up", ev)
        })
    }, []);

    return (
        <div className="map__map"

                id="map"
                ref={googleMapRef}
    >

           </div>
    );
}
export default Map