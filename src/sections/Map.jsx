import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Using default export as Leaflet might issue
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../styles/Map.css';

// Fix for default marker icon issues in React Leaflet
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const locations = [
    { id: 1, position: [48.8566, 2.3522], name: "Paris", desc: "Where we want to go." },
    { id: 2, position: [40.7128, -74.0060], name: "New York", desc: "Where we met." },
    // Add more relevant coordinates
];

const Map = () => {
    return (
        <section className="map-section">
            <h2 className="section-title">Places We've Been & Dream Of</h2>
            <motion.div
                className="map-container glass-panel"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                <MapContainer center={[40.7128, -74.0060]} zoom={3} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations.map(loc => (
                        <Marker key={loc.id} position={loc.position}>
                            <Popup>
                                <strong>{loc.name}</strong><br />{loc.desc}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </motion.div>
        </section>
    );
};

export default Map;
