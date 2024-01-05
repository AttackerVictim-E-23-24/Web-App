import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { BaseURL } from "./BaseURL";
import GeneralContext from "../GeneralContext";

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
      } catch (error) {
        console.error(error);
        alert("Error fetching locations");
      }
    };

    fetchLocations();
  }, [userAttacker.userName, userVictim.userName]);

  const mapStyles = {
    height: "100vh",
    width: "100%",
    borderRadius: "20px",
  };

  return (
    <div>
      <div className="mapContainer">
        <LoadScript googleMapsApiKey="AIzaSyCccZNiLlQVuUUN__qwtUC5GdpJveXQ1s8">
          <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={center}>
            {points.map((point, index) => (
              <Marker
                key={index}
                position={point}
                onClick={() => onMarkerClick(point)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        <br />
      </div>
      <br />
    </div>
  );
};

export default PointController;
