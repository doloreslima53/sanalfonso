export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg-photo" style={{ backgroundImage: "url('/photos/jardin.jpg')" }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">Villa Allende · Córdoba · Argentina</p>
        <h1 className="hero__brand">San Alfonso</h1>
        <p className="hero__tagline">Donde la vida no se detiene</p>
        <p className="hero__sub">
          Una residencia para adultos mayores pensada como hogar,<br />
          no como institución.
        </p>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-label">Descubrí</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
