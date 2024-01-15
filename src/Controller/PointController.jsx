import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";
import PointView from "../View/PointView"; // Importa PointView

const PointController = ({ onMarkerClick }) => {
  const { userAttacker, userVictim } = useContext(GeneralContext);
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
  const [attackerPoints, setAttackerPoints] = useState([]);
  const [victimPoints, setVictimPoints] = useState([]);

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
    const fetchAttackerLocations = async () => {
      try {
        if (userAttacker) {
          const response = await axios.get(
            `${BaseURL.apiUrl}/users/getGeolocationHistory/${userAttacker.userName}`
          );
          console.log("attackerResponse", response);
    
          if (response.status === 200) {
            // Transformar los datos de la respuesta en objetos PointModel
            const points = response.data.respuesta.map(location => ({
              lat: Number(location.latitud),
              lng: Number(location.longitud),
            }));
            setAttackerPoints(points);
          } else {
            alert("Error fetching attacker locations");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    const fetchVictimLocations = async () => {
      try {
        if (userVictim) {
          const response = await axios.get(
            `${BaseURL.apiUrl}/users/getGeolocationHistory/${userVictim.userName}`
          );
          console.log("victimResponse", response);
    
          if (response.status === 200) {
            // Transformar los datos de la respuesta en objetos PointModel
            const points = response.data.respuesta.map(location => ({
              lat: Number(location.latitud),
              lng: Number(location.longitud),
            }));
            setVictimPoints(points);
          } else {
            alert("Error fetching victim locations");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAttackerLocations();
    fetchVictimLocations();
    const intervalId = setInterval(() => {
      fetchAttackerLocations();
      fetchVictimLocations();
    }, 30 * 1000);
  
    return () => clearInterval(intervalId);
  }, [userAttacker, userVictim]);
  

  return (
      <div className="mapContainer">
        <PointView
          center={center}
          attackerPoints={attackerPoints}
          victimPoints={victimPoints}
          onMarkerClick={onMarkerClick}
        />
      </div>
  );
};

export default PointController;
