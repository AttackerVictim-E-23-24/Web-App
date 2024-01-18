import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { API_KEY } from "../Controller/API_KEY"; // Asegúrate de que la ruta sea correcta

const PointView = ({
  center,
  attackerPoints,
  victimPoints,
  onMarkerClick,
  handleInfoWindowClose,
  infoWindow,
}) => {
  const mapStyles = { height: "100vh", width: "100%", borderRadius: "20px" };
  const [attackerIcon, setAttackerIcon] = useState(null);
  const [victimIcon, setVictimIcon] = useState(null);

  useEffect(() => {
    if (window.google) {
      setAttackerIcon({
        url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
        scaledSize: new window.google.maps.Size(80, 80),
      });
      setVictimIcon({
        url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`, 
        scaledSize: new window.google.maps.Size(40, 40),
      });
    }
  }, []);

  return (
    <div className="mapContainer">
      <LoadScript googleMapsApiKey={API_KEY.key}>
        <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={center}>
          {victimPoints.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: point.lat, lng: point.lng }} // Agrega un pequeño desplazamiento a la posición del marcador del atacante
              onClick={() => onMarkerClick(point)}
              icon={victimIcon}
            />
          ))}
          {attackerPoints.map((point, index) => (
            <Marker
              key={index}
              position={point}
              onClick={() => onMarkerClick(point)}
              icon={attackerIcon}
            />
          ))}
          {infoWindow && (
            <InfoWindow
              position={infoWindow.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div dangerouslySetInnerHTML={{ __html: infoWindow.content }} />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PointView;