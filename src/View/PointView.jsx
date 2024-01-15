/*global google*/
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { API_KEY } from "../Controller/API_KEY"; // Asegúrate de que la ruta sea correcta

const PointView = ({
  center,
  
  attackerPoints,
  victimPoints,
  onMarkerClick,
}) => {
  const mapStyles = { height: "100vh", width: "100%", borderRadius: "20px" };

  return (
      <div className="mapContainer">
        <LoadScript googleMapsApiKey={API_KEY.key}>
          <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={center}>
            {attackerPoints.map((point, index) => (
              <Marker
                key={index}
                position={point}
                onClick={() => onMarkerClick(point)}
                icon={{
                  url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
                  scaledSize: new google.maps.Size(40, 40),
                }}
              />
            ))}
            {victimPoints.map((point, index) => (
              <Marker
                key={index}
                position={point}
                onClick={() => onMarkerClick(point)}
                icon={{
                  url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
                  scaledSize: new google.maps.Size(80, 80),
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
  );
};

export default PointView;
