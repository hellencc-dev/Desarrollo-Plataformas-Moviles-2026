import { useEffect, useState } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

export default function usePushNotifications() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState<any>(null);
  const [error, setError] = useState("");

  const requestPermission = async () => {
    try {
      const result = await PushNotifications.requestPermissions();

      if (result.receive === "granted") {
        await PushNotifications.register();
      } else {
        setError("Permiso denegado");
      }
    } catch (err: any) {
      setError(err?.message || "No se pudo pedir permiso");
    }
  };

  useEffect(() => {
    PushNotifications.addListener("registration", (token) => {
      setToken(token.value);
    });

    PushNotifications.addListener("registrationError", (err) => {
      setError(JSON.stringify(err));
    });

    PushNotifications.addListener("pushNotificationReceived", (notification) => {
      setNotification(notification);
    });

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (action) => {
        console.log("Push tocada:", action);
      }
    );

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return { token, notification, error, requestPermission };
}