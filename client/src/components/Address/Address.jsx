import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./address.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "../public/placeholder.png",
  iconSize: [38, 38],
});

const Address = () => {
  const center = [27.70004, 85.32454];

  return (
    <>
      <div>
        <MapContainer
          center={center}
          zoom={10}
          style={{ width: "100%", height: "100vh" }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=pums8bD7Dz2ksjmy3E2z"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          ></TileLayer>
          <Marker position={center} icon={icon}></Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default Address;
