import React, { useState, useEffect, useRef } from 'react';

declare module window {
    function initMap(): any;
    const google: any;
}

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
        }
        const googleScript = document.createElement('script');
        googleScript.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap";
        document.body.appendChild(googleScript)

        googleScript.addEventListener('error', ev => {
            console.warn("it blew up", ev)
        })
    }, []);

    return (
        <div className="map__map"
             id="map"
             ref={googleMapRef}>
         </div>
    );
}
export default Map
