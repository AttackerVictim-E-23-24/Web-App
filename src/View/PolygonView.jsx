// MapView.jsx
import React from "react";
import {
  GoogleMap,
  LoadScript,
  Polygon,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import "../Pages/css/MapView.css";
import { API_KEY } from "../Controller/API_KEY"; // Asegúrate de que la ruta sea correcta

const PolygonView = ({
  center,
  polygons,
  onMapClick,
  onPolygonClick,
  infoWindow,
  onButtonClick,
  manualPoints,
  onSendDataClick, // Nueva prop para la función de clic en el botón de enviar datos
}) => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
    borderRadius: "20px",
  };

  return (
    <div>
      <div className="mapContainer">
        <LoadScript googleMapsApiKey={API_KEY.key}>
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
      </div>
      <br />
      <div className="buttonContainer">
        <div className="buttonWrapper">
          <button className="polygon" onClick={onButtonClick}>Convertir a polígono complejo</button>
        </div>
        <div className="buttonWrapper">
          <button className="sendData" onClick={onSendDataClick}>Enviar datos</button>
        </div>
      </div>
    </div>
  );
};

export default PolygonView;