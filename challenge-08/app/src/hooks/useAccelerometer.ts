import { useEffect, useState } from "react";
import { Motion } from "@capacitor/motion";

export const useAccelerometer = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let listener: any = null;

    Motion.addListener("accel", (event) => {
      const x = event.acceleration?.x ?? 0;
      const y = event.acceleration?.y ?? 0;
      const z = event.acceleration?.z ?? 0;

      setAcceleration({ x, y, z });

      const total = Math.abs(x) + Math.abs(y) + Math.abs(z);
      setIsMoving(total > 2);
    })
      .then((handle) => {
        listener = handle;
      })
      .catch(() => {});

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  return { acceleration, isMoving };
};