import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";
import PointView from "../View/PointView"; // Importa PointView

const PointController = () => {
  const { userAttacker, userVictim } = useContext(GeneralContext);
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });
  const [attackerPoints, setAttackerPoints] = useState([]);
  const [victimPoints, setVictimPoints] = useState([]);
  
  const [infoWindow, setInfoWindow] = useState(null);

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
              username: userAttacker.userName, // Agrega el nombre de usuario
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
              username: userVictim.userName, // Agrega el nombre de usuario
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

  const onMarkerClick = (point) => {
    const contentString = `Username: ${point.username}<br>Coordinates: ${point.lat}, ${point.lng}`;
    setInfoWindow({ 
      content: contentString, 
      position: { lat: point.lat + 0.0001, lng: point.lng } // Ajusta la posición del InfoWindow
    });
  };
  const handleInfoWindowClose = () => {
    setInfoWindow(null);
  };

  return (
      <div className="mapContainer">
        <PointView
          center={center}
          attackerPoints={attackerPoints}
          victimPoints={victimPoints}
          onMarkerClick={onMarkerClick}
          handleInfoWindowClose={handleInfoWindowClose}
          infoWindow={infoWindow}
        />
      </div>
  );
};

export default PointController;
