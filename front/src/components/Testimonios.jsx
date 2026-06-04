import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonios = [
  {
    texto: 'Desde que mamá llegó a San Alfonso encontró la paz que merecía. El equipo la trata como en casa.',
    autor:  'Familia González',
  },
  {
    texto: 'Lo que más nos tranquilizó fue ver el jardín. Papá pasa horas ahí. Nunca lo habíamos visto tan sereno.',
    autor:  'Familia Moreno',
  },
  {
    texto: 'Buscábamos un lugar que se sintiera como hogar. San Alfonso es exactamente eso.',
    autor:  'Familia Acosta',
  },
];

export default function Testimonios() {
  const titleRef = useScrollAnimation();

  return (
    <section className="section--cream section testimonios">
      <div className="container">
        <div className="testimonios__header">
          <h2 ref={titleRef} className="h2 fade-up">Lo que dicen las familias</h2>
        </div>

        <div className="testimonios__grid">
          {testimonios.map((t, i) => (
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
