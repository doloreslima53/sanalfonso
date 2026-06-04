export default function Home() {
  return (
    <div>
      <h1>Bienvenido al Geriátrico San Alfonso</h1>
      <p style={{ marginBottom: "1.5rem", color: "#555" }}>
        Sistema de gestión interna para residentes, personal y actividades.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <div className="card">
          <h2>Residentes</h2>
          <p>Gestión de los residentes del geriátrico.</p>
        </div>
        <div className="card">
          <h2>Personal</h2>
          <p>Gestión del equipo de trabajo.</p>
        </div>
        <div className="card">
          <h2>Actividades</h2>
          <p>Planificación y seguimiento de actividades.</p>
        </div>
      </div>
    </div>
  );
}
