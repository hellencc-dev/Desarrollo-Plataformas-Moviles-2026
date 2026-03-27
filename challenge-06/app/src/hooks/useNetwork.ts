import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export default function useNetwork() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    };

    checkStatus();

    const listener = Network.addListener("networkStatusChange", (status) => {
      setIsOnline(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  return { isOnline, connectionType };
}