import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export default function useCamera() {
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });

    setPhoto(image.webPath ?? null);
  };

  return { photo, takePhoto };
}