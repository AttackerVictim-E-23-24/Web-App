// MapView.jsx
import React from "react";
import {
  GoogleMap,
  LoadScript,
  Polygon,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";

const MapView = ({
  canDrawPolygons,
  center,
  polygons,
  onMapClick,
  onPolygonClick,
  infoWindow,
  onButtonClick,
  manualPoints,
}) => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
    borderRadius: "20px",
  };

  return (
    <div className="mapContainer">
      <LoadScript googleMapsApiKey="AIzaSyCccZNiLlQVuUUN__qwtUC5GdpJveXQ1s8">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={center}
          onClick={onMapClick}
        >
          {polygons.map((polygon, index) => (
            <Polygon
              key={index}
              paths={polygon}
              onClick={() => onPolygonClick(polygon)}
            />
          ))}
          {manualPoints.length > 0 && (
            <Polyline
              path={manualPoints}
              options={{ strokeColor: "#FF0000 " }}
            />
          )}
          {infoWindow && (
            <InfoWindow position={infoWindow.position}>
              <div dangerouslySetInnerHTML={{ __html: infoWindow.content }} />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <br />
      {canDrawPolygons && <button onClick={onButtonClick}>Convertir a polígono normal</button>}
    </div>
  );
};

export default MapView;
