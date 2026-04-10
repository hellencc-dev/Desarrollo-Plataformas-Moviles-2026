import { useEffect, useRef, useState } from "react";
import { Motion } from "@capacitor/motion";
import type { PluginListenerHandle } from "@capacitor/core";

export default function useAccelerometer() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [magnitude, setMagnitude] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [error, setError] = useState("");

  const listenerRef = useRef<PluginListenerHandle | null>(null);

  const requestBrowserPermission = async () => {
    const anyWindow = window as any;

    if (
      typeof anyWindow.DeviceMotionEvent !== "undefined" &&
      typeof anyWindow.DeviceMotionEvent.requestPermission === "function"
    ) {
      await anyWindow.DeviceMotionEvent.requestPermission();
    }
  };

  const start = async () => {
    try {
      setError("");
      await requestBrowserPermission();

      if (listenerRef.current) {
        await listenerRef.current.remove();
      }

      listenerRef.current = await Motion.addListener("accel", (event: any) => {
        const ax = event.acceleration?.x ?? 0;
        const ay = event.acceleration?.y ?? 0;
        const az = event.acceleration?.z ?? 0;

        setX(ax);
        setY(ay);
        setZ(az);

        const total = Math.abs(ax) + Math.abs(ay) + Math.abs(az);
        setMagnitude(total);
        setIsMoving(total > 1.5);
      });
    } catch (err: any) {
      setError(err?.message || "No se pudo usar el acelerómetro");
    }
  };

  const stop = async () => {
    if (listenerRef.current) {
      await listenerRef.current.remove();
      listenerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return { x, y, z, magnitude, isMoving, error, start, stop };
}