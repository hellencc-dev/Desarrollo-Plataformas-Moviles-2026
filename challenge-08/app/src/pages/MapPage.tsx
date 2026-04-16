import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import MapComponent from "../components/MapComponent";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { useDevice } from "../hooks/useDevice";
import { useFilesystem } from "../hooks/useFilesystem";
import { useGeolocation } from "../hooks/useGeolocation";
import { useHaptics } from "../hooks/useHaptics";
import { useLocalNotifications } from "../hooks/useLocalNotifications";
import { useNetwork } from "../hooks/useNetwork";
import { getAddress } from "../services/opencage";

interface SavedRoute {
  id: number;
  createdAt: string;
  address: string;
  points: [number, number][];
}

export default function MapPage() {
  const { isOnline, connectionType } = useNetwork();
  const {
    position,
    getCurrentLocation,
    startTracking,
    stopTracking,
  } = useGeolocation();
  const { isMoving } = useAccelerometer();
  const { battery, refresh } = useDevice();
  const { impact } = useHaptics();
  const { writeJson, readJson } = useFilesystem();
  const { requestPermission, sendNotification } = useLocalNotifications();

  const [tracking, setTracking] = useState(false);
  const [path, setPath] = useState<[number, number][]>([]);
  const [address, setAddress] = useState("Sin dirección");
  const notifiedNoMoveRef = useRef(false);

  useEffect(() => {
    getCurrentLocation();
    requestPermission();
    refresh();
  }, []);

  useEffect(() => {
    if (position && tracking) {
      setPath((prev) => [...prev, [position.latitude, position.longitude]]);
    }
  }, [position, tracking]);

  useEffect(() => {
    const batteryLevel = battery?.batteryLevel ?? 1;

    if (tracking && batteryLevel <= 0.15) {
      stopTracking();
      setTracking(false);
      sendNotification({
        title: "Tracking detenido",
        body: "La batería está baja, se detuvo el seguimiento.",
      });
    }
  }, [battery, tracking]);

  useEffect(() => {
    if (!isOnline) {
      sendNotification({
        title: "Sin conexión",
        body: "No hay internet. Se desactivan dirección y lugares cercanos.",
      });
    }
  }, [isOnline]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (tracking && !isMoving) {
      timer = setTimeout(() => {
        if (!notifiedNoMoveRef.current) {
          sendNotification({
            title: "Sin movimiento",
            body: "Llevas rato sin moverte.",
          });
          notifiedNoMoveRef.current = true;
        }
      }, 20000);
    } else {
      notifiedNoMoveRef.current = false;
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [tracking, isMoving]);

  const handleStart = async () => {
    await impact("medium");
    await startTracking();
    setTracking(true);
  };

  const handleStop = async () => {
    await stopTracking();
    setTracking(false);
  };

  const handleGetAddress = async () => {
    if (!isOnline || !position) return;

    try {
      const data = await getAddress(position.latitude, position.longitude);
      const formatted = data?.results?.[0]?.formatted || "Dirección no disponible";
      setAddress(formatted);
    } catch {
      setAddress("No se pudo obtener la dirección");
    }
  };

  const handleSaveRoute = async () => {
    if (path.length === 0) return;

    const currentHistory = (await readJson<SavedRoute[]>("routes-history.json")) || [];

    const newRoute: SavedRoute = {
      id: Math.floor(Math.random() * 1000000),
      createdAt: new Date().toISOString(),
      address,
      points: path,
    };

    const updatedHistory = [newRoute, ...currentHistory];
    await writeJson("routes-history.json", updatedHistory);

    sendNotification({
      title: "Ruta guardada",
      body: "Se guardó correctamente el historial del recorrido.",
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>
          <strong>Conexión:</strong> {isOnline ? `Sí - ${connectionType}` : "No"}
        </p>
        <p>
          <strong>Movimiento:</strong> {isMoving ? "Sí" : "No"}
        </p>
        <p>
          <strong>Batería:</strong> {battery ? `${Math.round((battery.batteryLevel ?? 0) * 100)}%` : "No disponible"}
        </p>
        <p>
          <strong>Dirección:</strong> {address}
        </p>

        <IonButton expand="block" onClick={getCurrentLocation}>
          Obtener ubicación actual
        </IonButton>

        <IonButton expand="block" onClick={handleStart}>
          Iniciar tracking
        </IonButton>

        <IonButton expand="block" color="medium" onClick={handleStop}>
          Detener tracking
        </IonButton>

        <IonButton expand="block" disabled={!isOnline} onClick={handleGetAddress}>
          Obtener dirección
        </IonButton>

        <IonButton expand="block" color="success" onClick={handleSaveRoute}>
          Guardar ruta en JSON
        </IonButton>

        <MapComponent position={position} path={path} />
      </IonContent>
    </IonPage>
  );
}