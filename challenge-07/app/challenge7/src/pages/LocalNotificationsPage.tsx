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
import useLocalNotifications from "../hooks/useLocalNotifications";

export default function LocalNotificationsPage() {
  const {
    permission,
    error,
    requestPermission,
    sendNotification,
    scheduleNotification,
  } = useLocalNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Local Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>Permiso: {permission || "sin revisar"}</p>

        <IonButton expand="block" onClick={requestPermission}>
          Pedir permiso
        </IonButton>

        <IonButton expand="block" onClick={sendNotification}>
          Enviar ahora
        </IonButton>

        <IonButton expand="block" onClick={scheduleNotification}>
          Programar en 5 segundos
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}