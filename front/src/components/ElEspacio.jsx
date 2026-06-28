import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useContent } from '../context/ContentContext';

export default function ElEspacio() {
  const { espacio } = useContent();
  const titleRef = useScrollAnimation();

  return (
    <section className="section" id="espacio" style={{ padding: '0 0 var(--s12)' }}>
      <div className="container" style={{ marginBottom: 'var(--s8)' }}>
        <h2 ref={titleRef} className="h2 fade-up" style={{ color: 'var(--shadow)' }}>
          {espacio.titulo}
        </h2>
      </div>

      <div className="espacio__grid container">
        {espacio.fotos.map((p, i) => (
          <div key={i} className="espacio__photo">
            <div
              className="espacio__photo-inner"
              role="img"
              aria-label={p.label}
              style={p.src ? { backgroundImage: `url('${p.src}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
