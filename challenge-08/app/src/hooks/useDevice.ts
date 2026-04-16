import { useEffect, useState } from "react";
import { Device } from "@capacitor/device";

export const useDevice = () => {
  const [battery, setBattery] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const refresh = async () => {
    try {
      setError(null);

      const batteryInfo = await Device.getBatteryInfo();
      const deviceInfo = await Device.getInfo();
      const id = await Device.getId();

      setBattery(batteryInfo);
      setInfo(deviceInfo);
      setDeviceId(id.identifier);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    battery,
    info,
    deviceId,
    error,
    refresh,
  };
};