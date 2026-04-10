import { useEffect, useState } from "react";
import { Device } from "@capacitor/device";

export default function useDevice() {
  const [battery, setBattery] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDeviceData = async () => {
    try {
      setLoading(true);
      setError("");

      const batteryInfo = await Device.getBatteryInfo();
      const deviceInfo = await Device.getInfo();
      const id = await Device.getId();

      setBattery(batteryInfo);
      setInfo(deviceInfo);
      setDeviceId(id.identifier);
    } catch (err: any) {
      setError(err?.message || "No se pudo leer la información del dispositivo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeviceData();
  }, []);

  return { battery, info, deviceId, loading, error, refresh: loadDeviceData };
}