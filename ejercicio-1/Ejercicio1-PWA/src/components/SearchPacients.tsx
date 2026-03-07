interface Props {
  value: string;
  onChange: (texto: string) => void;
}

export default function BuscadorPacientes({ value, onChange }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o DNI"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
    </div>
  );
}