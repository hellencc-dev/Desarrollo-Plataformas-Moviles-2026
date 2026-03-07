import { useState } from "react";
import type { Usuario } from "../types";

interface Props {
  user: Usuario;
  onSave: (u: Usuario) => void;
  onClose: () => void;
}

export default function PerfilUsuario({
  user,
  onSave,
  onClose,
}: Props) {
  const [preview, setPreview] = useState(user.avatarDataUrl ?? "");

  const handleFile = (file?: File) => {
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = {
        ...user,
        avatarDataUrl: String(reader.result),
      };
      onSave(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{border: "1px solid #ddd", padding: 12, marginTop: 12, background: "#fafafa",}}>
      <h4>PerfilUsuario</h4>

      {preview && (
        <img src={preview} alt="preview" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", display: "block", marginBottom: 8,}}/>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}