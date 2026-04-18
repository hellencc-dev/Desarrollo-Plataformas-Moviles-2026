import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useGameProgress } from "../hooks/useGameProgress";

export default function MissionPhoto() {
  const history = useHistory();
  const { user } = useAuthContext();
  const { missions, completeMission } = useGameProgress(user?.uid);

  const [photo, setPhoto] = useState<string>("");
  const [message, setMessage] = useState("");

  const mission1 = missions.find((m) => m.id === 1);

  const handleTakePhoto = async () => {
    try {
      setMessage("");

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      const photoPath = image.webPath || "";
      setPhoto(photoPath);

      if (user?.uid) {
        localStorage.setItem(`parcial2_photo_${user.uid}`, photoPath);
      }

      if (!mission1?.completed) {
        completeMission(1);
        setMessage("Misión completada. Ganaste 100 puntos.");
      } else {
        setMessage("La misión ya estaba completada.");
      }
    } catch {
      setMessage("No se pudo tomar o seleccionar la foto.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Misión 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Evidencia</h2>
        <p>Toma una foto para completar la misión.</p>

        <IonButton expand="block" onClick={handleTakePhoto}>
          Tomar foto
        </IonButton>

        {photo && (
          <IonImg
            src={photo}
            style={{ marginTop: "16px", borderRadius: "12px", overflow: "hidden" }}
          />
        )}

        {message && (
          <IonText color="primary">
            <p style={{ marginTop: "16px" }}>{message}</p>
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