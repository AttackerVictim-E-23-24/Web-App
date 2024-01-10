import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";
import PointView from "../View/PointView"; // Importa PointView
import PointModel from "../Model/PointModel"; // Asegúrate de que la ruta sea correcta

const PointController = ({ onMarkerClick }) => {
  const { userAttacker, userVictim } = useContext(GeneralContext);
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
  const [points, setPoints] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Error: The Geolocation service failed.");
      }
    );
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        if (userAttacker && userVictim) {
          const attackerResponse = await axios.get(
            `${BaseURL.apiUrl}/users/getGeolocation/${userAttacker.userName}`
          );
          const victimResponse = await axios.get(
            `${BaseURL.apiUrl}/users/getGeolocation/${userVictim.userName}`
          );
          console.log("attackerResponse", attackerResponse);
          console.log("victimResponse", victimResponse);
  
          if (
            attackerResponse.status === 200 &&
            victimResponse.status === 200
          ) {
            // Transformar los datos de la respuesta en objetos PointModel
            const attackerPoint = {
              lat: Number(attackerResponse.data.respuesta.latitud),
              lng: Number(attackerResponse.data.respuesta.longitud),
            };
            const victimPoint = {
              lat: Number(victimResponse.data.respuesta.latitud),
              lng: Number(victimResponse.data.respuesta.longitud),
            };
            setPoints([attackerPoint, victimPoint]);
          } else {
            alert("Error fetching locations");
          }
        }
      } catch (error) {
        console.error(error);
        alert("Error fetching locations");
      }
    };
  
    fetchLocations();
  }, [userAttacker, userVictim]);

  return (
    <div>
      <div className="mapContainer">
        <PointView
          center={center}
          points={points}
          onMarkerClick={onMarkerClick}
        />
        <br />
      </div>
      <br />
    </div>
  );
};

export default PointController;
