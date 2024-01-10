/*global google*/
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const PointView = ({ center, points, onMarkerClick }) => {
  const mapStyles = { height: "100vh", width: "100%", borderRadius: "20px" };

  return (
    <div>
      <div className="mapContainer">
        <LoadScript googleMapsApiKey="AIzaSyCccZNiLlQVuUUN__qwtUC5GdpJveXQ1s8">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={14}
            center={center}
          >
            {points.map((point, index) => (
              <Marker
                key={index}
                position={point}
                onClick={() => onMarkerClick(point)}
                icon={{
                  url: `http://maps.google.com/mapfiles/ms/icons/${index === 0 ? 'red' : 'blue'}-dot.png`,
                  scaledSize: new google.maps.Size(index === 1 ? 60 : 40, index === 1 ? 60 : 40) 
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default PointView;