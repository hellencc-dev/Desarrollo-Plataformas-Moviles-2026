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
import useHaptics from "../hooks/useHaptics";

export default function HapticsPage() {
  const { isAvailable, impact, notify, vibrate } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Haptics</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color={isAvailable ? "success" : "danger"}>
          <p>{isAvailable ? "Disponible" : "No disponible"}</p>
        </IonText>

        <IonButton expand="block" onClick={() => impact("light")}>
          Impacto suave
        </IonButton>

        <IonButton expand="block" onClick={() => impact("medium")}>
          Impacto medio
        </IonButton>

        <IonButton expand="block" onClick={() => impact("heavy")}>
          Impacto fuerte
        </IonButton>

        <IonButton expand="block" onClick={() => notify("success")}>
          Notificación éxito
        </IonButton>

        <IonButton expand="block" onClick={() => notify("error")}>
          Notificación error
        </IonButton>

        <IonButton expand="block" onClick={vibrate}>
          Vibrar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}