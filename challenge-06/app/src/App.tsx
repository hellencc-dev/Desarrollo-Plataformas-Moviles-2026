import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import Fruits from "./pages/Fruits";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthContext } from "./context/AuthContext";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();
export default function App() {
  const { user, loading } = useAuthContext();

  if (loading) return null;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            {user ? <Redirect to="/home" /> : <Login />}
          </Route>

          <Route exact path="/register">
            {user ? <Redirect to="/home" /> : <Register />}
          </Route>

          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>

          <PrivateRoute exact path="/contacts">
            <Contacts />
          </PrivateRoute>

          <PrivateRoute exact path="/tasks">
            <Tasks />
          </PrivateRoute>

          <PrivateRoute exact path="/fruits">
            <Fruits />
          </PrivateRoute>

          <Route exact path="/">
            <Redirect to={user ? "/home" : "/login"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}