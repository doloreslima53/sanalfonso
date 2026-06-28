import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useContent } from '../context/ContentContext';

export default function Testimonios() {
  const { testimonios } = useContent();
  const titleRef = useScrollAnimation();

  return (
    <section className="section--cream section testimonios">
      <div className="container">
        <div className="testimonios__header">
          <h2 ref={titleRef} className="h2 fade-up">{testimonios.titulo}</h2>
        </div>

        <div className="testimonios__grid">
          {testimonios.items.map((t, i) => (
            <TestimonioCard key={i} t={t} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonioCard({ t, delay }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={`testimonio fade-up delay-${delay}`}>
      <div className="testimonio__mark">"</div>
      <p className="testimonio__text">{t.texto}</p>
      <p className="testimonio__author">{t.autor}</p>
    </div>
  );
}
