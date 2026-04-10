import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useCamera from "../hooks/useCamera";

export default function CameraPage() {
  const { photo, takePhoto } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={takePhoto}>
          Tomar / escoger foto
        </IonButton>

        {photo && <IonImg src={photo} />}
      </IonContent>
    </IonPage>
  );
}