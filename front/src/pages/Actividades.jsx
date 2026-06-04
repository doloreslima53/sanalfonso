import { useEffect, useState } from "react";
import api from "../api/client";

export default function Actividades() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/actividades/")
      .then((res) => setActividades(res.data))
      .catch(() => setError("Error al cargar las actividades"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Actividades</h1>
      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha y hora</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((a) => (
              <tr key={a.id}>
                <td>{a.titulo}</td>
                <td>{a.descripcion ?? "—"}</td>
                <td>{new Date(a.fecha_hora).toLocaleString("es-AR")}</td>
                <td>{a.responsable ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
