import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";
import PointView from "../View/PointView"; // Importa PointView

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
  
          if (attackerResponse.status === 200 && victimResponse.status === 200) {
            setPoints([attackerResponse.data, victimResponse.data]);
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
          <PointView center={center} points={points} onMarkerClick={onMarkerClick} />
        <br />
      </div>
      <br />
    </div>
  );
};

export default PointController;
