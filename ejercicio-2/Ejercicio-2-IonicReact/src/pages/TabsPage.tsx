import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import {
  calendarOutline,
  peopleOutline,
  personCircleOutline,
} from "ionicons/icons";

import VisitasPage from "./VisitasPage";
import DetalleVisitaPage from "./DetalleVisitaPage";
import MisPacientesPage from "./MisPacientesPage";
import PerfilMedicoPage from "./PerfilMedicoPage";

export default function TabsPage() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/visitas">
          <VisitasPage />
        </Route>

        <Route exact path="/tabs/visitas/:id">
          <DetalleVisitaPage />
        </Route>

        <Route exact path="/tabs/pacientes">
          <MisPacientesPage />
        </Route>

        <Route exact path="/tabs/perfil">
          <PerfilMedicoPage />
        </Route>

        <Route exact path="/tabs">
          <Redirect to="/tabs/visitas" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/tabs/visitas">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Visitas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="pacientes" href="/tabs/pacientes">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" href="/tabs/perfil">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}