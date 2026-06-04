import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function AgendarVisita() {
  const introRef = useScrollAnimation();
  const formRef  = useScrollAnimation();

  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', mensaje: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // Conectar con endpoint /api/visitas cuando esté disponible
    alert('¡Gracias! Nos ponemos en contacto a la brevedad.');
    setForm({ nombre: '', telefono: '', email: '', mensaje: '' });
  };

  return (
    <section className="section visita" id="visita">
      <div className="container">
        <div className="visita__inner">
          <div ref={introRef} className="visita__intro fade-up">
            <h2 className="h2">Coordiná una visita</h2>
            <p>
              La mejor manera de conocer San Alfonso es venir a verlo.
              Recorremos el espacio juntos, sin compromiso, y respondemos
              todas tus preguntas.
            </p>

            <div className="visita__contact">
              <a href="tel:+5493513000000">
                <IconTel />
                +54 9 351 300-0000
              </a>
              <a href="mailto:contacto@sanalfonso.com.ar">
                <IconMail />
                contacto@sanalfonso.com.ar
              </a>
              <a href="https://instagram.com/sanalfonsovilla" target="_blank" rel="noreferrer">
                <IconInsta />
                @sanalfonsovilla
              </a>
            </div>
          </div>

          <div ref={formRef} className="fade-up delay-1">
            <form className="form" onSubmit={handleSubmit} noValidate>
              <Field label="Nombre y apellido" name="nombre"   value={form.nombre}   onChange={handleChange} />
              <Field label="Teléfono"          name="telefono" value={form.telefono} onChange={handleChange} type="tel" />
              <Field label="Email"             name="email"    value={form.email}    onChange={handleChange} type="email" />
              <Field label="Mensaje (opcional)" name="mensaje" value={form.mensaje}  onChange={handleChange} multiline />

              <div className="form-submit">
                <button type="submit" className="btn-primary">
                  Coordinar una visita sin compromiso
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = 'text', multiline = false }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="form-field">
      <Tag
        className="form-input"
        name={name}
        id={name}
        type={!multiline ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows={multiline ? 3 : undefined}
      />
      <label className="form-label" htmlFor={name}>{label}</label>
    </div>
  );
}

function IconTel() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconInsta() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
