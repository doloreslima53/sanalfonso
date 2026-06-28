import { useContent } from '../context/ContentContext';

export default function Hero() {
  const { hero } = useContent();

  return (
    <section className="hero">
      <div className="hero__bg-photo" style={{ backgroundImage: `url('${hero.imagen}')` }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__brand">{hero.brand}</h1>
        <p className="hero__tagline">{hero.tagline}</p>
        <p className="hero__sub">{hero.sub}</p>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-label">Descubrí</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
