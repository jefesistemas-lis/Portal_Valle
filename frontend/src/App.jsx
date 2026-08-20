import { useCallback, useEffect, useMemo, useState } from 'react';
import portalLogo from '../img/logo.png';
import lisFooterLogo from '../img/logo-lis-footer.png';
import lisLogo from '../img/lis_black.jpg';

const pillars = [
  { id: 'seguridad', label: 'Seguridad', emoji: '🛡️', color: '#9c1414', textColor: '#ffffff' },
  { id: 'gente-organizacion', label: 'Gente', emoji: '👥', color: '#204f9c', textColor: '#ffffff' },
  { id: 'gestion-mejora', label: 'Gestión', emoji: '📈', color: '#b12c6f', textColor: '#ffffff' },
  { id: 'calidad', label: 'Calidad', emoji: '✅', color: '#f8fafc', textColor: '#ffffff' },
  { id: 'mantenimiento', label: 'Mantenimiento', emoji: '🔧', color: '#4f525a', textColor: '#ffffff' },
  { id: 'medio-ambiente', label: 'Medio Ambiente', emoji: '🌿', color: '#188841', textColor: '#ffffff' },
  { id: 'logistica', label: 'Logística', emoji: '📦', color: '#783a13', textColor: '#ffffff' },
];

const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const pillarVisualAssets = {
  seguridad: [
    {
      title: 'Infografía de cuidado de herramientas',
      description: 'Prácticas clave para mantener herramientas limpias, calibradas y seguras en cada turno.',
      graphic: (
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Infografía de cuidado de herramientas">
          <defs>
            <linearGradient id="toolGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <rect x="8" y="30" width="104" height="70" rx="18" fill="rgba(15,23,42,0.85)" stroke="rgba(56,189,248,0.18)" strokeWidth="2"/>
          <path d="M40 42 L52 62 L34 72 L24 54 Z" fill="url(#toolGrad)" />
          <path d="M82 44 L92 64 L74 74 L66 56 Z" fill="url(#toolGrad)" />
          <path d="M55 42 Q62 24 79 36 Q92 46 85 64 Q70 76 57 68 Q46 60 55 42 Z" fill="url(#shieldGrad)" opacity="0.95" />
          <circle cx="48" cy="52" r="3.5" fill="#e0f2fe" />
          <circle cx="72" cy="54" r="3.5" fill="#f8fafc" />
          <path d="M25 36 L28 30 L32 34" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          <path d="M96 30 L98 36 L102 32" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Monitoreo integral en tiempo real',
      description: 'Actualiza tu vista con métricas clave y control de riesgos para una planta más segura y conectada.',
      graphic: (
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Monitoreo integral">
          <defs>
            <linearGradient id="monitorGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect x="10" y="26" width="100" height="72" rx="20" fill="rgba(8,18,38,0.9)" stroke="rgba(34,197,94,0.18)" strokeWidth="2" />
          <rect x="22" y="36" width="76" height="40" rx="10" fill="rgba(15,23,42,0.9)" />
          <path d="M24 58 L40 46 L52 68 L66 50 L82 62 L96 42" fill="none" stroke="url(#pulseGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="40" cy="88" r="6" fill="#38bdf8" />
          <circle cx="60" cy="86" r="6" fill="#34d399" />
          <circle cx="80" cy="88" r="6" fill="#7c3aed" />
          <path d="M32 48 L45 48" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <path d="M60 42 L82 42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        </svg>
      ),
    },
  ],
};

function App() {
  const [activePillar, setActivePillar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const visualAssets = useMemo(
    () => (activePillar ? pillarVisualAssets[activePillar.id] || [] : []),
    [activePillar]
  );

  const accentStyle = useMemo(
    () =>
      activePillar
        ? {
            '--active-color': activePillar.color,
            '--active-color-soft': `${activePillar.color}33`,
            '--active-text-color': activePillar.textColor,
          }
        : {},
    [activePillar]
  );

  const loadPillar = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/api/pillars/${encodeURIComponent(id)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo cargar el pilar');
      setActivePillar(data);
    } catch (err) {
      setError(err.message);
      setActivePillar(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPillar('seguridad');
  }, [loadPillar]);

  return (
    <div className="app-shell">
<aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`} aria-label="Navegación de pilares">
        <div className="sidebar-header">
          <div className="brand">
            <div className="brand-mark">
              <img src={portalLogo} alt="Logo Portal Valle" />
            </div>
            <div>
              <h1>Planta Valle</h1>
              <p>Portal VPO</p>
            </div>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label="Mostrar u ocultar menú de pilares"
            type="button"
          >
            {menuOpen ? 'Cerrar' : 'Pilares'}
          </button>
        </div>

        <nav>
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              className={pillar.id === activePillar?.id ? 'active' : ''}
              style={{ '--pillar-color': pillar.color, '--pillar-text-color': pillar.textColor }}
              onClick={() => {
                loadPillar(pillar.id);
                setMenuOpen(false);
              }}
              aria-pressed={pillar.id === activePillar?.id}
              type="button"
            >
              <span className="pill-icon">{pillar.emoji}</span>
              <span>{pillar.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        <header className="hero-panel" style={accentStyle}>
          <div>
            <p className="eyebrow">Gestión estratégica</p>
            <div className="hero-title-row">
              <span className="hero-dot" style={accentStyle} />
              <h2>
                {activePillar?.title || 'Selecciona un pilar'}
              </h2>
            </div>
            <p>{activePillar?.subtitle || 'Explora cada pilar para revisar indicadores y acciones operativas.'}</p>
          </div>
          <div className="hero-badge" style={accentStyle}>
            {activePillar ? activePillar.label : 'ABI VALLE'}
          </div>
          <img className="hero-brand-image" src={lisFooterLogo} alt="Logística inteligente" />
        </header>

        {loading && <div className="status">Cargando información del pilar...</div>}
        {error && <div className="status error">{error}</div>}

        {activePillar && !loading && (
          <section className="panel-grid">
            <article className="panel-card fade-in">
              <div className="panel-label" style={accentStyle}>Descripción</div>
              <p>{activePillar.description}</p>
              <p className="module-label">Módulo: {activePillar.module}</p>
            </article>

            <article className="panel-card fade-in delay-1">
              <div className="panel-label" style={accentStyle}>Métricas clave</div>
              <ul>
                {activePillar.metrics.map((metric) => (
                  <li key={metric}>{metric}</li>
                ))}
              </ul>
            </article>

            {activePillar.formats && (
              <article className="panel-card fade-in delay-2">
                <div className="panel-label" style={accentStyle}>Formatos</div>
                <p className="panel-subtitle">{activePillar.formats.title}</p>
                <ul className="format-links">
                  {activePillar.formats.items.map((item) => (
                    <li key={item.url}>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {activePillar.programs && (
              <article className="panel-card program-card fade-in delay-3">
                <div className="panel-label" style={accentStyle}>Programas</div>
                <p className="panel-subtitle">{activePillar.programs.title}</p>
                <ul className="program-links">
                  {activePillar.programs.items.map((item) => (
                    <li key={item.url}>
                      <a className="program-link" href={item.url} target="_blank" rel="noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {activePillar.visuals && (
              <article className="panel-card visual-card fade-in delay-4">
                <div className="panel-label" style={accentStyle}>Visuales</div>
                <p className="panel-subtitle">{activePillar.visuals.title}</p>
                <ul className="visual-links">
                  {activePillar.visuals.items.map((item) => (
                    <li key={item.url}>
                      <a className="visual-link" href={item.url} target="_blank" rel="noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {visualAssets.length > 0 && (
              <article className="panel-card visual-gallery fade-in delay-4">
                <div className="panel-label" style={accentStyle}>Imágenes destacadas</div>
                <div className="visual-gallery-grid">
                  {visualAssets.map((asset) => (
                    <div key={asset.title} className="illustration-card">
                      <div className="illustration-graphic">{asset.graphic}</div>
                      <div className="illustration-content">
                        <h3 className="illustration-title">{asset.title}</h3>
                        <p className="illustration-description">{asset.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

          </section>
        )}

        <footer className="site-footer">
          <img src={lisLogo} alt="LIS" className="footer-logo" />
          <span>Portal VPO · Planta Valle</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
