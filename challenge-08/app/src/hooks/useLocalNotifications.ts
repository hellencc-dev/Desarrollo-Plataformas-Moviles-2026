import { useEffect, useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);

  const requestPermission = async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
      return result.display === "granted";
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const sendNotification = async ({
    title,
    body,
    seconds = 1,
  }: {
    title: string;
    body: string;
    seconds?: number;
  }) => {
    try {
      let currentPermission = permission;

      if (currentPermission !== "granted") {
        const granted = await requestPermission();
        if (!granted) return false;
        currentPermission = "granted";
      }

      const safeId = Math.floor(Math.random() * 1000000);

      await LocalNotifications.schedule({
        notifications: [
          {
            id: safeId,
            title,
            body,
            schedule: {
              at: new Date(Date.now() + seconds * 1000),
            },
          },
        ],
      });

      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  useEffect(() => {
    const check = async () => {
      try {
        const result = await LocalNotifications.checkPermissions();
        setPermission(result.display);
      } catch (err) {
        setError(err);
      }
    };

    check();
  }, []);

  return {
    permission,
    error,
    requestPermission,
    sendNotification,
  };
};