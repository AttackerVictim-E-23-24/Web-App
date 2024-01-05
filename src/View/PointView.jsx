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
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default PointView;