import { useState, useEffect, useRef } from 'react';
import client from '../api/client';

const SECCIONES = [
  { id: 'meta',        label: 'Sitio & SEO' },
  { id: 'hero',        label: 'Hero' },
  { id: 'filosofia',   label: 'Filosofía' },
  { id: 'servicios',   label: 'Servicios' },
  { id: 'espacio',     label: 'El Espacio' },
  { id: 'equipo',      label: 'El Equipo' },
  { id: 'vida',        label: 'Vida Cotidiana' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'diferencial', label: 'Diferencial' },
  { id: 'contacto',    label: 'Contacto' },
];

/* ── Entry point ── */
export default function Panel() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('sa_panel') === '1');

  if (!authed) {
    return (
      <PasswordGate
        onAuth={() => {
          sessionStorage.setItem('sa_panel', '1');
          setAuthed(true);
        }}
      />
    );
  }
  return <AdminLayout />;
}

/* ── Login screen ── */
function PasswordGate({ onAuth }) {
  const [pwd,      setPwd]      = useState('');
  const [err,      setErr]      = useState('');
  const [checking, setChecking] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setChecking(true);
    setErr('');
    try {
      await client.post('/content/auth', { password: pwd });
      onAuth();
    } catch (ex) {
      const msg = ex?.response?.data?.detail ?? 'Error al conectar con el servidor';
      setErr(msg);
      setPwd('');
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="adm-gate">
      <form className="adm-gate__box" onSubmit={submit}>
        <p className="adm-gate__brand">San Alfonso</p>
        <p className="adm-gate__label">Panel de administración</p>
        <input
          className={`adm-gate__input${err ? ' is-error' : ''}`}
          type="password"
          placeholder="Contraseña"
          value={pwd}
          onChange={e => { setPwd(e.target.value); setErr(''); }}
          autoFocus
          disabled={checking}
        />
        {err && <p className="adm-gate__error">{err}</p>}
        <button className="adm-gate__btn" type="submit" disabled={checking}>
          {checking ? 'Verificando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

/* ── Main admin layout ── */
function AdminLayout() {
  const [section,  setSection]  = useState('meta');
  const [draft,    setDraft]    = useState(null);
  const [loadErr,  setLoadErr]  = useState('');
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [mobile,   setMobile]   = useState(false);

  useEffect(() => {
    client.get('/content')
      .then(r => setDraft(r.data))
      .catch(err => {
        const msg = err?.response?.data?.detail
          || err?.message
          || 'Error desconocido';
        setLoadErr(msg);
      });
  }, []);

  async function save() {
    if (!draft) return;
    setSaving(true);
    try {
      await client.put('/content', draft);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  function logout() {
    sessionStorage.removeItem('sa_panel');
    window.location.reload();
  }

  if (loadErr) {
    return (
      <div className="adm-loading">
        <p style={{ color: 'var(--error)', marginBottom: 12 }}>Error al cargar: {loadErr}</p>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>
          URL del backend: <code>{import.meta.env.VITE_BACKEND_URL || '(proxy local /api)'}</code>
        </p>
        <button className="adm-gate__btn" style={{ maxWidth: 200 }} onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="adm-loading">
        <span>Cargando contenido…</span>
      </div>
    );
  }

  const activeLabel = SECCIONES.find(s => s.id === section)?.label ?? '';

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className={`adm-sidebar${mobile ? ' is-open' : ''}`}>
        <div className="adm-sidebar__top">
          <p className="adm-sidebar__brand">San Alfonso</p>
          <p className="adm-sidebar__sub">Panel de administración</p>
        </div>

        <nav className="adm-nav">
          {SECCIONES.map(s => (
            <button
              key={s.id}
              className={`adm-nav__item${section === s.id ? ' is-active' : ''}`}
              onClick={() => { setSection(s.id); setMobile(false); }}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <a href="/" target="_blank" rel="noreferrer" className="adm-sidebar__link">
            Ver sitio →
          </a>
          <button className="adm-sidebar__logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="adm-main">
        <header className="adm-header">
          <button className="adm-hamburger" onClick={() => setMobile(v => !v)} aria-label="Menú">
            <span /><span /><span />
          </button>
          <h1 className="adm-header__title">{activeLabel}</h1>
          <button
            className={`adm-save${saved ? ' is-saved' : ''}`}
            onClick={save}
            disabled={saving}
          >
            {saved ? '✓ Guardado' : saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </header>

        <div className="adm-content">
          {section === 'meta'        && <SeccionMeta        draft={draft} setDraft={setDraft} />}
          {section === 'hero'        && <SeccionHero        draft={draft} setDraft={setDraft} />}
          {section === 'filosofia'   && <SeccionFilosofia   draft={draft} setDraft={setDraft} />}
          {section === 'servicios'   && <SeccionServicios   draft={draft} setDraft={setDraft} />}
          {section === 'espacio'     && <SeccionEspacio     draft={draft} setDraft={setDraft} />}
          {section === 'equipo'      && <SeccionEquipo      draft={draft} setDraft={setDraft} />}
          {section === 'vida'        && <SeccionVida        draft={draft} setDraft={setDraft} />}
          {section === 'testimonios' && <SeccionTestimonios draft={draft} setDraft={setDraft} />}
          {section === 'diferencial' && <SeccionDiferencial draft={draft} setDraft={setDraft} />}
          {section === 'contacto'    && <SeccionContacto    draft={draft} setDraft={setDraft} />}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SHARED UI PRIMITIVES
══════════════════════════════════════════ */

function Card({ title, children }) {
  return (
    <div className="adm-card">
      {title && <h2 className="adm-card__title">{title}</h2>}
      {children}
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, small = false }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="adm-field">
      <label className="adm-field__label">{label}</label>
      <Tag
        className={`adm-field__input${small ? ' adm-field__input--small' : ''}`}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        rows={multiline ? 3 : undefined}
      />
    </div>
  );
}

function ImageUploader({ label, value, onChange, hint }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await client.post('/content/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.url);
    } catch {
      alert('Error al subir la imagen. Verificá el formato.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="adm-img-field">
      <label className="adm-field__label">{label}</label>
      {hint && <p className="adm-field__hint">{hint}</p>}

      {value && (
        <div className="adm-img-preview-wrap">
          <img
            src={value}
            alt="preview"
            className="adm-img-preview"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      <div className="adm-img-actions">
        <label className={`adm-upload-btn${uploading ? ' is-uploading' : ''}`}>
          {uploading ? 'Subiendo…' : value ? 'Cambiar imagen' : 'Subir imagen'}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.ico"
            onChange={handleFile}
            disabled={uploading}
            hidden
          />
        </label>
        {value && (
          <button className="adm-remove-btn" onClick={() => onChange('')}>
            Quitar
          </button>
        )}
      </div>

      {value && (
        <p className="adm-img-url">
          URL: <code>{value}</code>
        </p>
      )}
    </div>
  );
}

function ListCard({ title, onRemove, children }) {
  return (
    <div className="adm-list-card">
      <div className="adm-list-card__header">
        <span className="adm-list-card__title">{title}</span>
        {onRemove && (
          <button className="adm-list-card__remove" onClick={onRemove}>
            Eliminar
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function AddBtn({ label, onClick }) {
  return (
    <button className="adm-add-btn" onClick={onClick}>
      + {label}
    </button>
  );
}

/* ══════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════ */

function SeccionMeta({ draft, setDraft }) {
  const m = draft.meta;
  const set = (k, v) => setDraft(p => ({ ...p, meta: { ...p.meta, [k]: v } }));

  return (
    <div className="adm-section">
      <Card title="Título y descripción">
        <Field label="Título de la pestaña" value={m.titulo} onChange={v => set('titulo', v)} />
        <Field label="Descripción (SEO)" value={m.descripcion} onChange={v => set('descripcion', v)} multiline />
      </Card>
      <Card title="Favicon">
        <ImageUploader
          label="Icono del sitio"
          value={m.favicon}
          onChange={v => set('favicon', v)}
          hint="Recomendado: .ico o .png de 32×32px. Se ve en la pestaña del navegador."
        />
      </Card>
    </div>
  );
}

function SeccionHero({ draft, setDraft }) {
  const h = draft.hero;
  const set = (k, v) => setDraft(p => ({ ...p, hero: { ...p.hero, [k]: v } }));

  return (
    <div className="adm-section">
      <Card title="Textos">
        <Field label="Texto pequeño (eyebrow)" value={h.eyebrow} onChange={v => set('eyebrow', v)} />
        <Field label="Nombre del hogar"        value={h.brand}   onChange={v => set('brand', v)} />
        <Field label="Tagline principal"       value={h.tagline} onChange={v => set('tagline', v)} />
        <Field label="Subtítulo"               value={h.sub}     onChange={v => set('sub', v)} multiline />
      </Card>
      <Card title="Imagen de fondo">
        <ImageUploader
          label="Foto de fondo del hero"
          value={h.imagen}
          onChange={v => set('imagen', v)}
          hint="Recomendado: foto horizontal amplia, mínimo 1920×1080px."
        />
      </Card>
    </div>
  );
}

function SeccionFilosofia({ draft, setDraft }) {
  const f = draft.filosofia;
  const set = (k, v) => setDraft(p => ({ ...p, filosofia: { ...p.filosofia, [k]: v } }));

  return (
    <div className="adm-section">
      <Card title="Contenido">
        <Field
          label="Cita (podés usar ↵ Enter para salto de línea)"
          value={f.cita}
          onChange={v => set('cita', v)}
          multiline
        />
        <Field label="Párrafo" value={f.cuerpo} onChange={v => set('cuerpo', v)} multiline />
      </Card>
    </div>
  );
}

function SeccionServicios({ draft, setDraft }) {
  function updateItem(i, k, v) {
    setDraft(p => {
      const next = [...p.servicios];
      next[i] = { ...next[i], [k]: v };
      return { ...p, servicios: next };
    });
  }

  function addItem() {
    setDraft(p => ({
      ...p,
      servicios: [
        ...p.servicios,
        { id: String(p.servicios.length + 1).padStart(2, '0'), titulo: '', descripcion: '' },
      ],
    }));
  }

  function removeItem(i) {
    setDraft(p => ({ ...p, servicios: p.servicios.filter((_, idx) => idx !== i) }));
  }

  return (
    <div className="adm-section">
      {draft.servicios.map((s, i) => (
        <ListCard key={i} title={`Servicio ${s.id}`} onRemove={() => removeItem(i)}>
          <Field label="Número" value={s.id}          onChange={v => updateItem(i, 'id', v)} small />
          <Field label="Título" value={s.titulo}      onChange={v => updateItem(i, 'titulo', v)} />
          <Field label="Descripción" value={s.descripcion} onChange={v => updateItem(i, 'descripcion', v)} multiline />
        </ListCard>
      ))}
      <AddBtn label="Agregar servicio" onClick={addItem} />
    </div>
  );
}

function SeccionEspacio({ draft, setDraft }) {
  const e = draft.espacio;
  const setTitulo = v => setDraft(p => ({ ...p, espacio: { ...p.espacio, titulo: v } }));

  function updateFoto(i, k, v) {
    setDraft(p => {
      const fotos = [...p.espacio.fotos];
      fotos[i] = { ...fotos[i], [k]: v };
      return { ...p, espacio: { ...p.espacio, fotos } };
    });
  }

  function addFoto() {
    setDraft(p => ({
      ...p,
      espacio: { ...p.espacio, fotos: [...p.espacio.fotos, { label: '', src: '' }] },
    }));
  }

  function removeFoto(i) {
    setDraft(p => ({
      ...p,
      espacio: { ...p.espacio, fotos: p.espacio.fotos.filter((_, idx) => idx !== i) },
    }));
  }

  return (
    <div className="adm-section">
      <Card title="Título de la sección">
        <Field label="Título" value={e.titulo} onChange={setTitulo} />
      </Card>

      {e.fotos.map((f, i) => (
        <ListCard key={i} title={`Foto ${i + 1}${f.label ? ` — ${f.label}` : ''}`} onRemove={() => removeFoto(i)}>
          <Field label="Nombre del espacio" value={f.label} onChange={v => updateFoto(i, 'label', v)} />
          <ImageUploader
            label="Foto"
            value={f.src}
            onChange={v => updateFoto(i, 'src', v)}
          />
        </ListCard>
      ))}
      <AddBtn label="Agregar foto" onClick={addFoto} />
    </div>
  );
}

function SeccionEquipo({ draft, setDraft }) {
  const eq = draft.equipo;
  const setTitulo = v => setDraft(p => ({ ...p, equipo: { ...p.equipo, titulo: v } }));

  function updateMiembro(i, k, v) {
    setDraft(p => {
      const miembros = [...p.equipo.miembros];
      miembros[i] = { ...miembros[i], [k]: v };
      return { ...p, equipo: { ...p.equipo, miembros } };
    });
  }

  function addMiembro() {
    setDraft(p => ({
      ...p,
      equipo: { ...p.equipo, miembros: [...p.equipo.miembros, { nombre: '', rol: '', foto: '' }] },
    }));
  }

  function removeMiembro(i) {
    setDraft(p => ({
      ...p,
      equipo: { ...p.equipo, miembros: p.equipo.miembros.filter((_, idx) => idx !== i) },
    }));
  }

  return (
    <div className="adm-section">
      <Card title="Título de la sección">
        <Field label="Título" value={eq.titulo} onChange={setTitulo} />
      </Card>

      {eq.miembros.map((m, i) => (
        <ListCard key={i} title={m.nombre || `Miembro ${i + 1}`} onRemove={() => removeMiembro(i)}>
          <Field label="Nombre completo"  value={m.nombre} onChange={v => updateMiembro(i, 'nombre', v)} />
          <Field label="Rol / cargo"      value={m.rol}    onChange={v => updateMiembro(i, 'rol', v)} />
          <ImageUploader
            label="Foto de perfil"
            value={m.foto}
            onChange={v => updateMiembro(i, 'foto', v)}
            hint="Cuadrada o circular. Mínimo 300×300px."
          />
        </ListCard>
      ))}
      <AddBtn label="Agregar miembro" onClick={addMiembro} />
    </div>
  );
}

function SeccionVida({ draft, setDraft }) {
  const v = draft.vidaCotidiana;
  const set = (k, val) => setDraft(p => ({ ...p, vidaCotidiana: { ...p.vidaCotidiana, [k]: val } }));

  function updateAct(i, val) {
    setDraft(p => {
      const actividades = [...p.vidaCotidiana.actividades];
      actividades[i] = { label: val };
      return { ...p, vidaCotidiana: { ...p.vidaCotidiana, actividades } };
    });
  }

  return (
    <div className="adm-section">
      <Card title="Cita del residente">
        <Field label="Cita" value={v.cita}  onChange={val => set('cita', val)} multiline />
        <Field label="Atribución (ej: Residenta, 82 años)" value={v.autor} onChange={val => set('autor', val)} />
      </Card>
      <Card title="Actividades destacadas">
        {v.actividades.map((a, i) => (
          <Field key={i} label={`Actividad ${i + 1}`} value={a.label} onChange={val => updateAct(i, val)} />
        ))}
      </Card>
    </div>
  );
}

function SeccionTestimonios({ draft, setDraft }) {
  const t = draft.testimonios;
  const setTitulo = v => setDraft(p => ({ ...p, testimonios: { ...p.testimonios, titulo: v } }));

  function updateItem(i, k, v) {
    setDraft(p => {
      const items = [...p.testimonios.items];
      items[i] = { ...items[i], [k]: v };
      return { ...p, testimonios: { ...p.testimonios, items } };
    });
  }

  function addItem() {
    setDraft(p => ({
      ...p,
      testimonios: { ...p.testimonios, items: [...p.testimonios.items, { texto: '', autor: '' }] },
    }));
  }

  function removeItem(i) {
    setDraft(p => ({
      ...p,
      testimonios: { ...p.testimonios, items: p.testimonios.items.filter((_, idx) => idx !== i) },
    }));
  }

  return (
    <div className="adm-section">
      <Card title="Título de la sección">
        <Field label="Título" value={t.titulo} onChange={setTitulo} />
      </Card>

      {t.items.map((item, i) => (
        <ListCard key={i} title={item.autor || `Testimonio ${i + 1}`} onRemove={() => removeItem(i)}>
          <Field label="Testimonio" value={item.texto} onChange={v => updateItem(i, 'texto', v)} multiline />
          <Field label="Familia / nombre" value={item.autor} onChange={v => updateItem(i, 'autor', v)} />
        </ListCard>
      ))}
      <AddBtn label="Agregar testimonio" onClick={addItem} />
    </div>
  );
}

function SeccionDiferencial({ draft, setDraft }) {
  const d = draft.diferencial;
  const setField = (k, v) => setDraft(p => ({ ...p, diferencial: { ...p.diferencial, [k]: v } }));

  function updateItem(i, k, v) {
    setDraft(p => {
      const items = [...p.diferencial.items];
      items[i] = { ...items[i], [k]: v };
      return { ...p, diferencial: { ...p.diferencial, items } };
    });
  }

  return (
    <div className="adm-section">
      <Card title="Encabezado">
        <Field label="Título"    value={d.titulo}    onChange={v => setField('titulo', v)} />
        <Field label="Subtítulo" value={d.subtitulo} onChange={v => setField('subtitulo', v)} multiline />
      </Card>

      {d.items.map((item, i) => (
        <ListCard key={i} title={item.titulo || `Item ${i + 1}`}>
          <Field label="Título"      value={item.titulo} onChange={v => updateItem(i, 'titulo', v)} />
          <Field label="Descripción" value={item.desc}   onChange={v => updateItem(i, 'desc', v)} multiline />
        </ListCard>
      ))}
    </div>
  );
}

function SeccionContacto({ draft, setDraft }) {
  const c = draft.contacto;
  const set = (k, v) => setDraft(p => ({ ...p, contacto: { ...p.contacto, [k]: v } }));

  return (
    <div className="adm-section">
      <Card title="Textos de la sección">
        <Field label="Título"    value={c.titulo}    onChange={v => set('titulo', v)} />
        <Field label="Subtítulo" value={c.subtitulo} onChange={v => set('subtitulo', v)} multiline />
      </Card>
      <Card title="Datos de contacto">
        <Field label="Teléfono (visible)"      value={c.telefono}      onChange={v => set('telefono', v)} />
        <Field label="Teléfono (para el link, sin espacios)" value={c.telefonoLink} onChange={v => set('telefonoLink', v)} />
        <Field label="Email"                   value={c.email}         onChange={v => set('email', v)} />
        <Field label="Instagram (@ texto)"     value={c.instagram}     onChange={v => set('instagram', v)} />
        <Field label="Instagram (URL completa)" value={c.instagramLink} onChange={v => set('instagramLink', v)} />
      </Card>
    </div>
  );
}
