import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useContent } from '../context/ContentContext';

export default function ElEquipo() {
  const { equipo } = useContent();
  const titleRef = useScrollAnimation();

  return (
    <section className="section--cream section equipo" id="equipo">
      <div className="container">
        <div className="equipo__header">
          <h2 ref={titleRef} className="h2 fade-up">{equipo.titulo}</h2>
        </div>

        <div className="equipo__grid">
          {equipo.miembros.map((m, i) => (
            <div key={i} className="equipo__card">
              <div className="equipo__photo">
                <div
                  className="equipo__photo-inner"
                  style={m.foto ? {
                    backgroundImage: `url('${m.foto}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'transparent',
                  } : undefined}
                >
                  {!m.foto && m.nombre[0]}
                </div>
              </div>
              <p className="equipo__name">{m.nombre}</p>
              <p className="equipo__role">{m.rol}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
