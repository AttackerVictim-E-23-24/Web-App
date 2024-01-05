// MapController.jsx
import React, { useState, useEffect, useContext } from 'react';  // Importa useContext
import MapModel from '../Model/MapModel';
import MonitoringModel from '../Model/MonitoringModel';
import MapView from '../View/MapView';
import { BaseURL } from './BaseURL';
import GeneralContext from '../GeneralContext';
import useLoginModel from "../Model/LoginModel";

const MapController = ({ canDrawPolygons }) => {
  const { loginData } = useLoginModel();
  const [mapModel] = useState(new MapModel());
  const [infoWindow, setInfoWindow] = useState(null);
  const [manualPoints, setManualPoints] = useState([]);
  const { monitoringData, setMonitoringData, userAttacker, userVictim } = useContext(GeneralContext);  // Accede al contexto

  const handleSendDataClick = async () => {
    const dataToSend = {
      activo: true,
      monitoreo: {
        cedulaAtacante: userAttacker.cedula,
        cedulaVictima: userVictim.cedula
      }
    };
  
    const response = await fetch(`${BaseURL.apiUrl}/zonasSeg/setZonaSeg`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });
  
    if (!response.ok) {
      console.error('Error en la petición:', response.status, response.statusText);
      return;
    }
  
    const data = await response.json();
    const { id, createdAt } = data.respuesta;
    const monitoringModel = new MonitoringModel(id, new Date(createdAt), null, null, null, null, null, null);
    setMonitoringData(monitoringModel);
    console.log('monitoringData.startDate:', monitoringData.startDate);
    console.log('loginData.userName:', loginData.userName);
    
    console.log("peticion de geolocationZona",mapModel.getPolygons().lat);
    const geoDataToSend = mapModel.getPolygons().map(point => ({
      latitud: point.lat,
      longitud: point.lng,
      createdAt: monitoringData.startDate,
      usuarioDto: {
        userName: loginData.userName
      }
    }));
  
    const geoResponse = await fetch(`${BaseURL.apiUrl}/users/setCoordenadasZona`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geoDataToSend)
    });
  
    if (!geoResponse.ok) {
      console.error('Error en la petición:', geoResponse.status, geoResponse.statusText);
      return;
    }
  
    const geoData = await geoResponse.json();
    console.log(geoData);
  };

  useEffect(() => {
    if (canDrawPolygons) {
      fetch('YOUR_API_URL')
        .then(response => response.json())
        .then(data => {
          data.forEach(polygon => {
            mapModel.addPolygon(polygon);
          });
        });
    }
  }, [canDrawPolygons, mapModel]);

  const handleMapClick = (event) => {
    if (canDrawPolygons) {
      const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setManualPoints([...manualPoints, newPoint]);
    }
  };

  const handlePolygonClick = (polygon) => {
    const contentString = polygon.map((point, index) => 
      `Coordinate ${index}: ${point.lat}, ${point.lng}`
    ).join('<br>');

    setInfoWindow({ content: contentString, position: polygon[0] });
  };

  const handleButtonClick = () => {
    mapModel.addPolygon(manualPoints);
    console.log(mapModel.getPolygons());
    setManualPoints([]);
  };

  return (
    <MapView 
    canDrawPolygons={canDrawPolygons}
      center={mapModel.getCenter()} 
      polygons={mapModel.getPolygons()} 
      onMapClick={handleMapClick} 
      onPolygonClick={handlePolygonClick} 
      onButtonClick={handleButtonClick} 
      infoWindow={infoWindow} 
      manualPoints={manualPoints}
      onSendDataClick={handleSendDataClick}  // Agrega esta línea
    />
  );
};

export default MapController;