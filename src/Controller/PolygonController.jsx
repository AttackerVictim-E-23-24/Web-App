// PolygonController.jsx
import React, { useState, useEffect, useContext } from "react";
import PolygonModel from "../Model/PolygonModel";
import PointModel from "../Model/PointModel"; // Import PointModel
import PolygonView from "../View/PolygonView";
import { BaseURL } from "./BaseURL";
import MonitoringModel from "../Model/MonitoringModel";
import GeneralContext from "../GeneralContext";

const PolygonController = () => {
  const [message, setMessage] = useState(null);
  const [polygons, setPolygons] = useState([]); // Add this line
  const [infoWindow, setInfoWindow] = useState(null);
  const [manualPoints, setManualPoints] = useState([]); // New state for manualPoints
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.006 }); // New state for center
  const { monitoringData, setMonitoringData, userAttacker, userVictim } =
    useContext(GeneralContext);

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

  const handleMapClick = (event) => {
    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setManualPoints([...manualPoints, newPoint]);
    console.log("manual points:", manualPoints);
  };

  const handlePolygonClick = (polygon) => {
    const contentString = polygon
      .map((point, index) => `Coordinate ${index}: ${point.lat}, ${point.lng}`)
      .join("<br>");

    setInfoWindow({ content: contentString, position: polygon[0] });
  };

  const handleButtonClick = () => {
    const newPolygon = new PolygonModel();
    manualPoints.forEach((point) => {
      const pointModel = new PointModel(point.lat, point.lng);
      newPolygon.addPoint(pointModel);
    });

    // Convert newPolygon to an array of { lat, lng } objects
    const newPolygonPoints = newPolygon.getPoints().map((pointModel) => ({
      lat: pointModel.latitude,
      lng: pointModel.longitude,
    }));
    console.log("newPolygonPoints", newPolygonPoints);
    setPolygons((prevPolygons) => [...prevPolygons, newPolygonPoints]);
    setManualPoints([]);
    console.log("polygons", polygons);
  };

  const sendData = async (dataToSend) => {
    const response = await fetch(`${BaseURL.apiUrl}/zonasSeg/setZonaSeg`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      console.error(
        "Error en la petición:",
        response.status,
        response.statusText
      );

      setMessage("La petición fue exitosa");
      return null;
    }

    return await response.json();
  };

  const sendGeoData = async (geoDataToSend) => {
    const geoResponse = await fetch(
      `${BaseURL.apiUrl}/zonasSeg/setGeolocationZona`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geoDataToSend),
      }
    );

    if (!geoResponse.ok) {
      console.error(
        "Error en la petición:",
        geoResponse.status,
        geoResponse.statusText
      );
      setMessage("La petición fue exitosa");
      return null;
    }

    return await geoResponse.json();
  };

  const handleSendDataClick = async () => {
    const dataToSend = {
      activo: true,
      monitoreo: {
        cedulaAtacante: userAttacker.cedula,
        cedulaVictima: userVictim.cedula,
      },
    };

    const data = await sendData(dataToSend);
    if (data) {
      const { id, createdAt } = data.respuesta;
      const monitoringModel = new MonitoringModel(
        id,
        new Date(createdAt),
        null,
        null,
        null,
        null,
        null,
        null
      );
      setMonitoringData(monitoringModel);
      console.log("polygons", polygons);
      const geoDataToSend = polygons.flatMap((polygon) =>
        polygon.map((point) => ({
          latitud: point.lat,
          longitud: point.lng,
          createdAt: monitoringData.startDate,
          zonaSegDto: {
            id: monitoringData.id,
          },
        }))
      );
      console.log("geoDataToSend", geoDataToSend);

      const geoData = await sendGeoData(geoDataToSend);
      if (!geoData.error) {
        console.log(geoData);
        setPolygons([]); // Reinicia los puntos de la zona de seguridad
      } else {
        console.error("Error al enviar los datos geográficos:", geoData.error);
      }
    }
  };

  useEffect(() => {
    const fetchZones = async () => {
      const response = await fetch(
        `${BaseURL.apiUrl}/zonasSeg/getAllByUsername/${userAttacker.userName}`
      );
      const zoneData = await response.json();
  
      if (!response.ok) {
        console.error(
          "Error en la petición:",
          response.status,
          response.statusText
        );
        return;
      }
  
      console.log("zoneData", zoneData);
      console.log("ID del primer elemento:", zoneData.respuesta[0]?.id);
  
      let newPolygons = [];
  
      for (let point of zoneData.respuesta) {
        if (point.activo) {
          const response = await fetch(`${BaseURL.apiUrl}/coordenadas/getCoordZonaSeg/${point.id}`);
          const data = await response.json();
  
          if (data.status) {
            const newPolygon = new PolygonModel();
            for (let coord of data.respuesta) {
              const pointModel = new PointModel(coord.latitud, coord.longitud);
              newPolygon.addPoint(pointModel);
            }
  
            // Convert newPolygon to an array of { lat, lng } objects
            const newPolygonPoints = newPolygon.getPoints().map((pointModel) => ({
              lat: pointModel.latitude,
              lng: pointModel.longitude,
            }));
  
            newPolygons.push(newPolygonPoints);
          } else {
            console.error("Error fetching coordinates:", data.mensaje);
          }
        }
      }
  
      setPolygons(newPolygons);
    };
  
    fetchZones();
  }, [userAttacker.userName]);

  return (
    <div>
      <PolygonView
        center={center} // You can change this to your preferred center
        polygons={polygons}
        onMapClick={handleMapClick}
        onPolygonClick={handlePolygonClick}
        infoWindow={infoWindow}
        onButtonClick={handleButtonClick}
        manualPoints={manualPoints} // Pass manualPoints to PolygonView
        onSendDataClick={handleSendDataClick}
      />
      {message && <div style={{ color: "green" }}>{message}</div>}
    </div>
  );
};

export default PolygonController;
