import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useFilesystem } from "../hooks/useFilesystem";

interface SavedRoute {
  id: number;
  createdAt: string;
  address: string;
  points: [number, number][];
}

export default function HistoryPage() {
  const { readJson } = useFilesystem();
  const [routes, setRoutes] = useState<SavedRoute[]>([]);

  useEffect(() => {
    const loadRoutes = async () => {
      const data = await readJson<SavedRoute[]>("routes-history.json");
      setRoutes(data || []);
    };

    loadRoutes();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Historial</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {routes.length === 0 ? (
          <p>No hay rutas guardadas.</p>
        ) : (
          <IonList>
            {routes.map((route) => (
              <IonItem key={route.id}>
                <IonLabel>
                  <h2>{route.address || "Ruta sin dirección"}</h2>
                  <p>{new Date(route.createdAt).toLocaleString()}</p>
                  <p>Puntos guardados: {route.points.length}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}