import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export default function useNetwork() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState("unknown");

  useEffect(() => {
    let listener: any;

    const loadStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);

      listener = await Network.addListener("networkStatusChange", (status) => {
        setIsOnline(status.connected);
        setConnectionType(status.connectionType);
      });
    };

    loadStatus();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, []);

  return { isOnline, connectionType };
}