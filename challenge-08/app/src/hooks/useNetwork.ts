import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    const loadStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    };

    loadStatus();

    const listenerPromise = Network.addListener("networkStatusChange", (status) => {
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      listenerPromise.then((listener) => listener.remove());
    };
  }, []);

  return { isOnline, connectionType };
};