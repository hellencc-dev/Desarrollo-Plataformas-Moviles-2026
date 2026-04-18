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
import { Motion } from "@capacitor/motion";
import { Haptics } from "@capacitor/haptics";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useGameProgress } from "../hooks/useGameProgress";

export default function MissionStill() {
  const history = useHistory();
  const { user } = useAuthContext();
  const { missions, completeMission } = useGameProgress(user?.uid);

  const [secondsLeft, setSecondsLeft] = useState(10);
  const [message, setMessage] = useState("");
  const [running, setRunning] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mission3 = missions.find((m) => m.id === 3);

  const resetTimer = () => {
    setSecondsLeft(10);
  };

  const stopMission = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRunning(false);
  };

  const startMission = async () => {
    if (mission3 && !mission3.unlocked) {
      setMessage("Primero debes completar la misión 2.");
      return;
    }

    setMessage("No te muevas 10 segundos.");
    setSecondsLeft(10);
    setRunning(true);
  };

  useEffect(() => {
    let listener: any = null;

    Motion.addListener("accel", (event) => {
      if (!running) return;

      const x = event.acceleration?.x ?? 0;
      const y = event.acceleration?.y ?? 0;
      const z = event.acceleration?.z ?? 0;

      const total = Math.abs(x) + Math.abs(y) + Math.abs(z);

      if (total > 2) {
        resetTimer();
        setMessage("Te moviste. El conteo se reinició.");
      }
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
  }, [running]);

  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [running]);

  useEffect(() => {
    if (!running) return;

    if (secondsLeft <= 0) {
      stopMission();

      Haptics.vibrate();

      if (!mission3?.completed) {
        completeMission(3);
        setMessage("Misión completada. Ganaste 200 puntos.");
      } else {
        setMessage("La misión ya estaba completada.");
      }
    }
  }, [secondsLeft, running, mission3, completeMission]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Misión 3</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Permanencia activa</h2>
        <p>No debes moverte durante 10 segundos.</p>

        <IonButton expand="block" onClick={startMission}>
          Iniciar misión
        </IonButton>

        <IonButton expand="block" color="medium" onClick={stopMission}>
          Detener misión
        </IonButton>

        <p style={{ marginTop: "16px" }}>Tiempo restante: {secondsLeft} s</p>

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