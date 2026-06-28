import { useRef, useState, useEffect, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useContent } from '../context/ContentContext';

export default function NuestrosServicios() {
  const { servicios } = useContent();
  const trackRef = useRef(null);
  const autoRef  = useRef(null);
  const [current, setCurrent] = useState(0);
  const titleRef = useScrollAnimation();
  const total    = servicios.length;

  const scrollToCard = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.servicio-card');
    const card  = cards[index];
    if (!card) return;
    const left = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left, behavior: 'smooth' });
  }, []);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(prev => (prev >= total - 1 ? 0 : prev + 1));
    }, 3800);
  }, [total]);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto]);
  useEffect(() => { scrollToCard(current); }, [current, scrollToCard]);

  const go = useCallback((index) => { setCurrent(index); startAuto(); }, [startAuto]);

  return (
    <section className="section servicios" id="servicios">
      <div className="container">
        <header className="servicios__header fade-up" ref={titleRef}>
          <span className="label servicios__label">Lo que ofrecemos</span>
          <h2 className="h2 servicios__title">Nuestros servicios</h2>
        </header>

        <div className="servicios__track" ref={trackRef}>
          {servicios.map((s, i) => (
            <article key={i} className={`servicio-card${i === current ? ' is-active' : ''}`}>
              <span className="servicio-card__num" aria-hidden="true">{s.id}</span>
              <h3 className="servicio-card__title">{s.titulo}</h3>
              <p className="servicio-card__desc">{s.descripcion}</p>
            </article>
          ))}
        </div>

        <div className="servicios__controls">
          <button className="servicios__btn" onClick={() => go(Math.max(0, current - 1))} aria-label="Servicio anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="servicios__dots" role="tablist" aria-label="Servicios">
            {servicios.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={s.titulo}
                className={`servicios__dot${i === current ? ' is-active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>

          <button className="servicios__btn" onClick={() => go(Math.min(total - 1, current + 1))} aria-label="Servicio siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
