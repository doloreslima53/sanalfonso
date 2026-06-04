import { useScrollAnimation } from '../hooks/useScrollAnimation';

const equipo = [
  { nombre: 'Dra. María Fernández', rol: 'Directora médica',         inicial: 'M' },
  { nombre: 'Lic. Carlos Gutiérrez', rol: 'Coord. de actividades',   inicial: 'C' },
  { nombre: 'Enf. Laura Rodríguez',  rol: 'Jefa de enfermería',      inicial: 'L' },
  { nombre: 'Lic. Ana Martínez',     rol: 'Psicóloga',               inicial: 'A' },
];

export default function ElEquipo() {
  const titleRef = useScrollAnimation();

  return (
    <section className="section--cream section equipo" id="equipo">
      <div className="container">
        <div className="equipo__header">
          <h2 ref={titleRef} className="h2 fade-up">El equipo</h2>
        </div>

        <div className="equipo__grid">
          {equipo.map((p, i) => (
            <div key={i} className="equipo__card">
              <div className="equipo__photo">
                {/* Reemplazar con: style={{ backgroundImage: "url('/photos/equipo-N.jpg')" }} */}
                <div className="equipo__photo-inner">{p.inicial}</div>
              </div>
              <p className="equipo__name">{p.nombre}</p>
              <p className="equipo__role">{p.rol}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
