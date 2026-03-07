interface Props {
  texto: string;
  onCancelar: () => void;
  onConfirmar: () => void;
}

export default function ModalConfirm({
  texto,
  onCancelar,
  onConfirmar,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 16,
          width: 320,
          borderRadius: 8,
        }}
      >
        <p>{texto}</p>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onCancelar}>Cancelar</button>
          <button onClick={onConfirmar}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}