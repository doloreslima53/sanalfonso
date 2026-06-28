import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useContent } from '../context/ContentContext';
import BotanicSep from './BotanicSep';

export default function Filosofia() {
  const { filosofia } = useContent();
  const quoteRef = useScrollAnimation();
  const bodyRef  = useScrollAnimation();

  return (
    <section className="section filosofia">
      <div className="container">
        <p ref={quoteRef} className="filosofia__quote fade-up" style={{ whiteSpace: 'pre-line' }}>
          "{filosofia.cita}"
        </p>
        <BotanicSep />
        <p ref={bodyRef} className="filosofia__body fade-up delay-1">
          {filosofia.cuerpo}
        </p>
      </div>
    </section>
  );
}
