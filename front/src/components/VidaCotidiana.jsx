import { useScrollAnimation } from '../hooks/useScrollAnimation';

function IconArte() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="8.5"  cy="9"    r="1.5" />
      <circle cx="15.5" cy="9"    r="1.5" />
      <circle cx="12"   cy="15"   r="1.5" />
      <path d="M8 13s1 3 4 3 4-3 4-3" />
    </svg>
  );
}

function IconJardin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 12 8 9 8 5c0 0 4 1 4 7z" />
      <path d="M12 12C12 12 16 9 16 5c0 0-4 1-4 7z" />
      <path d="M5 22c0-4 3-7 7-7" />
    </svg>
  );
}

function IconMusica() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6"  cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

const activities = [
  { icon: <IconArte />,    label: 'Talleres de arte' },
  { icon: <IconJardin />,  label: 'Jardín y huerta' },
  { icon: <IconMusica />,  label: 'Música y memoria' },
];

export default function VidaCotidiana() {
  const quoteRef = useScrollAnimation();
  const actRef   = useScrollAnimation();

  return (
    <section className="section--dark" id="vida">
      <div className="vida">
        <div className="vida__inner">
          <div ref={quoteRef} className="vida__quote-wrap fade-up">
            <span className="vida__quote-mark">"</span>
            <p className="vida__quote">
              Acá encontré las tardes que creía que ya no volvían.
              El jardín, el mate, la charla sin apuro.
            </p>
            <p className="vida__author">— Residenta, 82 años</p>
          </div>

          <div ref={actRef} className="vida__activities fade-up delay-1">
            {activities.map((a, i) => (
              <div key={i} className="vida__activity">
                {a.icon}
                <span className="vida__activity-label">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
