import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const visitas = [
  { id: 1, paciente: "Laura Correa", hora: "08:00 AM" },
  { id: 2, paciente: "Daniel Pérez", hora: "09:30 AM" },
  { id: 3, paciente: "Marta Lopéz", hora: "11:00 AM" },
];

export default function VisitasPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas del día</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {visitas.map((visita) => (
            <IonItem key={visita.id} routerLink={`/tabs/visitas/${visita.id}`}>
              <IonLabel>
                <h2>{visita.paciente}</h2>
                <p>{visita.hora}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}