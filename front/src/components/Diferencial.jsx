import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useContent } from '../context/ContentContext';

function IconReloj() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconCorazon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconCasa() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

const ICONS = [<IconReloj key="reloj" />, <IconCorazon key="corazon" />, <IconCasa key="casa" />];

export default function Diferencial() {
  const { diferencial } = useContent();
  const headerRef = useScrollAnimation();

  return (
    <section className="section diferencial">
      <div className="container">
        <div ref={headerRef} className="diferencial__header fade-up">
          <h2 className="h2">{diferencial.titulo}</h2>
          <p>{diferencial.subtitulo}</p>
        </div>

        <div className="diferencial__grid">
          {diferencial.items.map((item, i) => (
            <DifItem key={i} item={item} delay={i} icon={ICONS[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DifItem({ item, delay, icon }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={`diferencial__item fade-up delay-${delay}`}>
      {icon}
      <h3 className="h3 diferencial__item__title">{item.titulo}</h3>
      <p>{item.desc}</p>
    </div>
  );
}
