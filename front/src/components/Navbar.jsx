import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="navbar__logo" onClick={close}>
          San Alfonso
        </Link>

        <div className="navbar__nav">
          <a href="#servicios"   className="navbar__link">Nuestros servicios</a>
          <a href="#espacio"     className="navbar__link">El espacio</a>
          <a href="#equipo"      className="navbar__link">El equipo</a>
          <a href="#visita"      className="navbar__link">Visita</a>
          <a href="#visita"      className="btn-ghost">Agendar visita</a>
        </div>

        <button
          className={`navbar__hamburger${open ? ' is-open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? ' is-open' : ''}`}>
        <a href="#servicios" onClick={close}>Nuestros servicios</a>
        <a href="#espacio"   onClick={close}>El espacio</a>
        <a href="#equipo"    onClick={close}>El equipo</a>
        <a href="#vida"      onClick={close}>Vida cotidiana</a>
        <a href="#visita"    onClick={close}>Agendar visita</a>
      </div>
    </>
  );
}
