export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <p className="footer__brand-name">San Alfonso</p>
            <p className="footer__tagline">Donde la vida no se detiene</p>
          </div>

          <div>
            <p className="footer__col-heading">Navegación</p>
            <ul className="footer__links">
              <li><a href="#espacio">El espacio</a></li>
              <li><a href="#equipo">El equipo</a></li>
              <li><a href="#vida">Vida cotidiana</a></li>
              <li><a href="#visita">Agendar visita</a></li>
            </ul>
          </div>

          <div className="footer__contact">
            <p className="footer__col-heading">Contacto</p>
            <p>Villa Allende, Córdoba<br />Argentina</p>
            <p style={{ marginTop: '12px' }}>
              <a href="tel:+5493513000000" style={{ color: 'var(--accent)', opacity: 0.6 }}>
                +54 9 351 300-0000
              </a>
            </p>
            <p>
              <a href="https://instagram.com/sanalfonsovilla" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', opacity: 0.6 }}>
                @sanalfonsovilla
              </a>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {year} San Alfonso · Residencia para Adultos Mayores
          </p>
          <p className="footer__copyright">Villa Allende, Córdoba</p>
        </div>
      </div>
    </footer>
  );
}
