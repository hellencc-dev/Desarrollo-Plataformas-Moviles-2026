import { useEffect, useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

export default function useLocalNotifications() {
  const [permission, setPermission] = useState("");
  const [error, setError] = useState("");

  const requestPermission = async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
    } catch (err: any) {
      setError(err?.message || "No se pudo pedir permiso");
    }
  };

  const checkPermission = async () => {
    try {
      const result = await LocalNotifications.checkPermissions();
      setPermission(result.display);
    } catch (err: any) {
      setError(err?.message || "No se pudo revisar permiso");
    }
  };

  const sendNotification = async () => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: "Notificación",
            body: "Mensaje inmediato",
            schedule: { at: new Date(Date.now() + 1000) },
          },
        ],
      });
    } catch (err: any) {
      setError(err?.message || "No se pudo enviar la notificación");
    }
  };

  const scheduleNotification = async () => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: "Recordatorio",
            body: "En 5 segundos",
            schedule: { at: new Date(Date.now() + 5000) },
          },
        ],
      });
    } catch (err: any) {
      setError(err?.message || "No se pudo programar la notificación");
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    permission,
    error,
    requestPermission,
    sendNotification,
    scheduleNotification,
  };
}