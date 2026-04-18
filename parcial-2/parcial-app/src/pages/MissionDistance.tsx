import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useGameProgress } from "../hooks/useGameProgress";

export default function MissionDistance() {
  const history = useHistory();
  const { user } = useAuthContext();
  const { missions, completeMission } = useGameProgress(user?.uid);

  const [startPosition, setStartPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [currentDistance, setCurrentDistance] = useState(0);
  const [message, setMessage] = useState("");

  const mission2 = missions.find((m) => m.id === 2);

  const getDistanceInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371000;
    const toRad = (value: number) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleStartMission = async () => {
    try {
      setMessage("");

      await Geolocation.requestPermissions();

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setStartPosition({ latitude, longitude });
      setCurrentDistance(0);
      setMessage("Punto inicial guardado. Ahora muévete.");
    } catch {
      setMessage("No se pudo obtener la ubicación inicial.");
    }
  };

  const handleCheckDistance = async () => {
    if (!startPosition) {
      setMessage("Primero debes guardar tu posición inicial.");
      return;
    }

    try {
      await Geolocation.requestPermissions();

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const distance = getDistanceInMeters(
        startPosition.latitude,
        startPosition.longitude,
        latitude,
        longitude
      );

      setCurrentDistance(distance);

      if (distance > 30) {
        if (!mission2?.completed) {
          completeMission(2);
          setMessage("Misión completada. Ganaste 150 puntos.");
        } else {
          setMessage("La misión ya estaba completada.");
        }
      } else {
        setMessage("Aún no superas los 30 metros.");
      }
    } catch {
      setMessage("No se pudo comprobar la distancia.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Misión 2</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Movimiento real</h2>
        <p>Debes moverte más de 30 metros desde tu posición inicial.</p>

        <IonButton expand="block" onClick={handleStartMission}>
          Guardar posición inicial
        </IonButton>

        <IonButton expand="block" onClick={handleCheckDistance}>
          Verificar distancia
        </IonButton>

        <p style={{ marginTop: "16px" }}>
          Distancia actual: {currentDistance.toFixed(2)} metros
        </p>

        {message && (
          <IonText color="primary">
            <p>{message}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          color="medium"
          style={{ marginTop: "16px" }}
          onClick={() => history.push("/home")}
        >
          Regresar al home
        </IonButton>
      </IonContent>
    </IonPage>
  );
}