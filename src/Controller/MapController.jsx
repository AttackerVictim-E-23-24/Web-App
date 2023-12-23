// MapController.jsx
import React, { useState, useEffect } from 'react';
import MapModel from '../Model/MapModel';
import MapView from '../View/MapView';

const MapController = ({ canDrawPolygons }) => {
  const [mapModel] = useState(new MapModel());
  const [infoWindow, setInfoWindow] = useState(null);
  const [manualPoints, setManualPoints] = useState([]);

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
    setManualPoints([]);
  };

  return (
    <MapView 
      center={mapModel.getCenter()} 
      polygons={mapModel.getPolygons()} 
      onMapClick={handleMapClick} 
      onPolygonClick={handlePolygonClick} 
      onButtonClick={handleButtonClick} 
      infoWindow={infoWindow} 
      manualPoints={manualPoints}
    />
  );
};

export default MapController;