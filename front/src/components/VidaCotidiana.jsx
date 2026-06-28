import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useContent } from '../context/ContentContext';

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

const ICONS = [<IconArte key="arte" />, <IconJardin key="jardin" />, <IconMusica key="musica" />];

export default function VidaCotidiana() {
  const { vidaCotidiana } = useContent();
  const quoteRef = useScrollAnimation();
  const actRef   = useScrollAnimation();

  return (
    <section className="section--dark" id="vida">
      <div className="vida">
        <div className="vida__inner">
          <div ref={quoteRef} className="vida__quote-wrap fade-up">
            <span className="vida__quote-mark">"</span>
            <p className="vida__quote">{vidaCotidiana.cita}</p>
            <p className="vida__author">— {vidaCotidiana.autor}</p>
          </div>

          <div ref={actRef} className="vida__activities fade-up delay-1">
            {vidaCotidiana.actividades.map((a, i) => (
              <div key={i} className="vida__activity">
                {ICONS[i]}
                <span className="vida__activity-label">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
