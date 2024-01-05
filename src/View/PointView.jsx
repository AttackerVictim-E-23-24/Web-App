import React, { useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox
} from "@react-google-maps/api";

const PointView = ({ center, points, onMarkerClick }) => {
  const mapStyles = { height: "100vh", width: "100%", borderRadius: "20px" };
  const searchBoxRef = useRef();

  useEffect(() => {
    const searchBox = searchBoxRef.current;
    if (!searchBox) return;

    const button = document.createElement("button");
    button.textContent = "Pan to Current Location";
    button.classList.add("custom-map-control-button");

    button.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            searchBox.panTo(pos);
          },
          () => {
            alert("Error: The Geolocation service failed.");
          }
        );
      } else {
        alert("Error: Your browser doesn't support geolocation.");
      }
    });

    searchBox.controls[google.maps.ControlPosition.TOP_CENTER].push(button);
  }, []);

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
            <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)}>
              <input type="text" placeholder="Custom Search Box" />
            </StandaloneSearchBox>
          </GoogleMap>
        </LoadScript>
        <br />
      </div>
      <br />
    </div>
  );
};

export default PointView;