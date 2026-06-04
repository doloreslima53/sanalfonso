import { useEffect, useState } from "react";
import api from "../api/client";

export default function Personal() {
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/personal/")
      .then((res) => setPersonal(res.data))
      .catch(() => setError("Error al cargar el personal"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Personal</h1>
      {personal.length === 0 ? (
        <p>No hay personal registrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol</th>
              <th>Turno</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {personal.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.rol}</td>
                <td>{p.turno ?? "—"}</td>
                <td>{p.telefono ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
