import React, {useEffect} from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => {

    const getMarkers = () =>
      props.places &&
      props.places.map((place, i) => {
        let lat = parseFloat(place.coords.lat, 10);
        let lng = parseFloat(place.coords.lon, 10);

        return (
          <Marker
            id={place.name}
            key={place.name}
            position={{ lat: lat, lng: lng }}
            title="Click to zoom"
          ></Marker>
        );
      });
    let markers = getMarkers();  

    return (
      <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
        {markers}
      </GoogleMap>
    );
  })
);

export default MapWithAMarker;
