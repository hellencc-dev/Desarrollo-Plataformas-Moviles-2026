import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

type PositionData = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

export default function useGeolocation() {
  const [position, setPosition] = useState<PositionData | null>(null);
  const [watchId, setWatchId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const getCurrentLocation = async () => {
    try {
      setError("");
      await Geolocation.requestPermissions();

      const pos = await Geolocation.getCurrentPosition();
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy ?? null,
      });
    } catch (err: any) {
      setError(err?.message || "No se pudo obtener la ubicación");
    }
  };

  const startTracking = async () => {
    try {
      setError("");
      await Geolocation.requestPermissions();

      const id = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (pos, err) => {
          if (err) {
            setError(err.message);
            return;
          }

          if (pos) {
            setPosition({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy ?? null,
            });
          }
        }
      );

      setWatchId(id);
    } catch (err: any) {
      setError(err?.message || "No se pudo iniciar el seguimiento");
    }
  };

  const stopTracking = async () => {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
    }
  };

  return {
    position,
    error,
    getCurrentLocation,
    startTracking,
    stopTracking,
  };
}