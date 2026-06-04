import { useEffect, useState } from "react";
import api from "../api/client";

export default function Residentes() {
  const [residentes, setResidentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/residentes/")
      .then((res) => setResidentes(res.data))
      .catch(() => setError("Error al cargar los residentes"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Residentes</h1>
      {residentes.length === 0 ? (
        <p>No hay residentes registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Habitación</th>
              <th>Contacto familiar</th>
            </tr>
          </thead>
          <tbody>
            {residentes.map((r) => (
              <tr key={r.id}>
                <td>{r.nombre}</td>
                <td>{r.apellido}</td>
                <td>{r.dni}</td>
                <td>{r.habitacion ?? "—"}</td>
                <td>{r.contacto_familiar ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
