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
import usePushNotifications from "../hooks/usePushNotifications";

export default function PushNotificationsPage() {
  const { token, notification, error, requestPermission } =
    usePushNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={requestPermission}>
          Activar Push
        </IonButton>

        <p>Token:</p>
        <p style={{ wordBreak: "break-all" }}>{token || "Aún no registrado"}</p>

        {notification && (
          <>
            <p>Título: {notification.title}</p>
            <p>Body: {notification.body}</p>
          </>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}