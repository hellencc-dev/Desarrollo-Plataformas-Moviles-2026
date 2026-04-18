import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Login() {
    const history = useHistory();
    const { login } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setError("");
            await login(email, password);
            history.push("/home");
        } catch {
            setError("No se pudo iniciar sesión");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonInput
                    label="Correo"
                    labelPlacement="stacked"
                    type="email"
                    value={email}
                    onIonInput={(e) => setEmail(e.detail.value!)}
                />

                <IonInput
                    label="Contraseña"
                    labelPlacement="stacked"
                    type="password"
                    value={password}
                    onIonInput={(e) => setPassword(e.detail.value!)}
                />

                {error && (
                    <IonText color="danger">
                        <p>{error}</p>
                    </IonText>
                )}

                <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
                    Iniciar sesión
                </IonButton>

                <IonButton expand="block" fill="clear" routerLink="/register">
                    Ir a registro
                </IonButton>
            </IonContent>
        </IonPage>
    );
}