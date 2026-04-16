import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import "./MapComponent.css";

type Position = {
  latitude: number;
  longitude: number;
};

interface Props {
  position: Position | null;
  path: [number, number][];
}

function RecenterMap({ position }: { position: Position | null }) {
  const map = useMap();

  if (position) {
    map.setView([position.latitude, position.longitude], 18);
  }

  return null;
}

export default function MapComponent({ position, path }: Props) {
  if (!position) {
    return <p>Obteniendo ubicación...</p>;
  }

  return (
    <MapContainer
      center={[position.latitude, position.longitude]}
      zoom={18}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RecenterMap position={position} />

      <Marker position={[position.latitude, position.longitude]} />

      {path.length > 1 && <Polyline positions={path} />}
    </MapContainer>
  );
}