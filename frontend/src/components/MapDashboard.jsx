import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom icons
const customIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const redIcon = customIcon("red");
const yellowIcon = customIcon("gold");
const blueIcon = customIcon("blue");

export default function MapDashboard({ incidents = [], predictions = [] }) {
  // Center roughly on downtown SF as per the mock data generator
  const center = [37.7749, -122.4194];

  const getMarkerIcon = (severity) => {
    if (severity === "High") return redIcon;
    if (severity === "Medium") return yellowIcon;
    return blueIcon;
  };

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%", backgroundColor: "#1e1e1e" }}
        zoomControl={false}
      >
        {/* Dark theme tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Render Live Incidents */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.lat, incident.lng]}
            icon={getMarkerIcon(incident.severity)}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold text-gray-900 border-b pb-1 mb-2">
                  {incident.type}
                </h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {incident.status}
                  </p>
                  <p>
                    <span className="font-semibold">Severity:</span>
                    <span
                      className={`ml-1 px-2 py-0.5 rounded text-xs font-medium text-white ${incident.severity === "High"
                          ? "bg-red-500"
                          : incident.severity === "Medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                    >
                      {incident.severity}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    ID: {incident.id}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render Predicted Failure Zones */}
        {predictions.map((zone, index) => (
          <React.Fragment key={`pred-${index}`}>
            <Marker
              position={[zone.lat, zone.lng]}
              icon={redIcon} // Or a specific alert icon
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-red-600 border-b border-red-200 pb-1 mb-2">
                    Alert: Predicted Failure Zone
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Risk Score:</span>{" "}
                      {zone.risk_score}/100
                    </p>
                    <p>
                      <span className="font-semibold">Incidents in Area:</span>{" "}
                      {zone.incident_count}
                    </p>
                    <p className="text-xs italic text-red-500 mt-2">
                      Requires immediate inspection
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[zone.lat, zone.lng]}
              radius={250} // 250m radius visualizer
              pathOptions={{
                color: "red",
                fillColor: "#ef4444",
                fillOpacity: 0.2,
                weight: 1,
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>

      {/* Fallback styling for react-leaflet popups to match dark theme loosely if needed, though default is okay for MVP */}
      <style>{`
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95);
        }
      `}</style>
    </div>
  );
}
