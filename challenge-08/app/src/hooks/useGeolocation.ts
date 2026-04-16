import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null);
  const [watchId, setWatchId] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const getCurrentLocation = async () => {
    try {
      setError(null);

      await Geolocation.requestPermissions();

      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      setPosition(pos.coords);
    } catch (err) {
      setError(err);
    }
  };

  const startTracking = async () => {
    try {
      setError(null);

      await Geolocation.requestPermissions();

      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
        (pos, err) => {
          if (err) {
            setError(err);
            return;
          }

          if (pos) {
            setPosition(pos.coords);
          }
        }
      );

      setWatchId(id);
    } catch (err) {
      setError(err);
    }
  };

  const stopTracking = async () => {
    try {
      if (watchId) {
        await Geolocation.clearWatch({ id: watchId });
        setWatchId(null);
      }
    } catch (err) {
      setError(err);
    }
  };

  return {
    position,
    error,
    getCurrentLocation,
    startTracking,
    stopTracking,
  };
};