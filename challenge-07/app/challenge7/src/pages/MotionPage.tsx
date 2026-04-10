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
import useAccelerometer from "../hooks/useAccelerometer";

export default function MotionPage() {
  const { x, y, z, magnitude, isMoving, error, start, stop } =
    useAccelerometer();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Motion</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={start}>
          Iniciar
        </IonButton>

        <IonButton expand="block" color="medium" onClick={stop}>
          Detener
        </IonButton>

        <p>X: {x.toFixed(2)}</p>
        <p>Y: {y.toFixed(2)}</p>
        <p>Z: {z.toFixed(2)}</p>
        <p>Magnitud: {magnitude.toFixed(2)}</p>
        <p>Movimiento: {isMoving ? "Sí" : "No"}</p>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}