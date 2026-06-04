import { useScrollAnimation } from '../hooks/useScrollAnimation';
import BotanicSep from './BotanicSep';

export default function Filosofia() {
  const quoteRef = useScrollAnimation();
  const bodyRef  = useScrollAnimation();

  return (
    <section className="section filosofia">
      <div className="container">
        <p ref={quoteRef} className="filosofia__quote fade-up">
          "Lo que crece hacia arriba tiene raíces profundas.<br />
          El cuidado es invisible, pero sustenta todo."
        </p>
        <BotanicSep />
        <p ref={bodyRef} className="filosofia__body fade-up delay-1">
          En San Alfonso creemos que envejecer con dignidad es un derecho.
          Diseñamos cada espacio, cada rutina y cada vínculo para que nuestros
          residentes se sientan en casa —porque lo están.
        </p>
      </div>
    </section>
  );
}
