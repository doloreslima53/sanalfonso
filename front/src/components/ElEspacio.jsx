import { useScrollAnimation } from '../hooks/useScrollAnimation';

const photos = [
  { label: 'Jardín principal' },
  { label: 'Comedor' },
  { label: 'Habitación' },
  { label: 'Sala de estar' },
  { label: 'Terraza' },
];

export default function ElEspacio() {
  const titleRef = useScrollAnimation();

  return (
    <section className="section" id="espacio" style={{ padding: '0 0 var(--s12)' }}>
      <div className="container" style={{ marginBottom: 'var(--s8)' }}>
        <h2 ref={titleRef} className="h2 fade-up" style={{ color: 'var(--shadow)' }}>
          El espacio
        </h2>
      </div>

      <div className="espacio__grid container">
        {photos.map((p, i) => (
          <div key={i} className="espacio__photo">
            {/* Reemplazar con: style={{ backgroundImage: "url('/photos/espacio-N.jpg')" }} */}
            <div className="espacio__photo-inner" role="img" aria-label={p.label} />
          </div>
        ))}
      </div>
    </section>
  );
}
