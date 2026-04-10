import { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useFilesystem from "../hooks/useFilesystem";

export default function FilesystemPage() {
  const [path, setPath] = useState("mi-archivo.txt");
  const [content, setContent] = useState("Hola desde Challenge 07");
  const [output, setOutput] = useState("");

  const { loading, error, writeFile, readFile, deleteFile, listFiles } =
    useFilesystem();

  const onWrite = async () => {
    const ok = await writeFile(path, content);
    if (ok) setOutput("Archivo escrito");
  };

  const onRead = async () => {
    const data = await readFile(path);
    setOutput(data);
  };

  const onDelete = async () => {
    const ok = await deleteFile(path);
    if (ok) setOutput("Archivo eliminado");
  };

  const onList = async () => {
    const files = await listFiles();
    setOutput(files.join(", "));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Filesystem</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonInput
          label="Nombre del archivo"
          labelPlacement="stacked"
          value={path}
          onIonInput={(e) => setPath(String(e.detail.value ?? ""))}
        />

        <IonInput
          label="Contenido"
          labelPlacement="stacked"
          value={content}
          onIonInput={(e) => setContent(String(e.detail.value ?? ""))}
        />

        <IonButton expand="block" onClick={onWrite}>
          Escribir
        </IonButton>

        <IonButton expand="block" onClick={onRead}>
          Leer
        </IonButton>

        <IonButton expand="block" onClick={onList}>
          Listar archivos
        </IonButton>

        <IonButton expand="block" color="danger" onClick={onDelete}>
          Eliminar
        </IonButton>

        {loading && <p>Procesando...</p>}

        {output && <p>{output}</p>}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}