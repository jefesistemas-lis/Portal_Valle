import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '../frontend/dist');

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  process.env.APP_ORIGIN,
].filter(Boolean);

const pillars = [
  {
    id: 'seguridad',
    title: 'Seguridad',
    subtitle: 'Visuales de Monitoreo Integral de Riesgos y Hábitos Seguros',
    description: 'Monitorea riesgos, reporta incidentes y promueve una cultura de trabajo seguro en planta.',
    metrics: ['Días sin incidentes', 'Inspecciones completadas', 'Capacitaciones realizadas'],
    module: 'Seguridad operativa',
    formats: {
      title: 'FORMATOS DILIGENCIAMIENTO DE HERRAMIENTAS - PLANTA VALLE',
      items: [
        { label: 'PREOPERACIONAL - HERRAMIENTAS DE VERTIMIENTO', url: 'https://forms.gle/itN3NmHB8u2ky3ea6' },
        { label: 'PREOPERACIONAL - COMPRESOR', url: 'https://forms.gle/4tHZtysF79LMutzy6' },
        { label: 'LISTA DE CHEQUEO PRE-OPERACIONAL DE LA CARRETA MANUAL', url: 'https://forms.gle/3niiGTZ8B1d7gTbMA' },
        { label: 'CHEQUEO PRE-OPERACIONAL DE LA CIZALLA', url: 'https://forms.gle/vVP6roxiLcZB6DiG7' },
        { label: 'CHEQUEO PRE-OPERACIONAL DE LA ESCALERA', url: 'https://forms.gle/pBJgaWJWfA9vc5g2A' },
        { label: 'LISTA DE CHEQUEO PRE-OPERACIONAL RAMPA DE ACCESO A VEHÍCULO', url: 'https://forms.gle/4AYqGCLaBgUR2TZK8' },
        { label: 'LISTA DE CHEQUEO PRE-OPERACIONAL DEL TOPELLANTAS', url: 'https://forms.gle/74rjBfZAMRraF9Qi8' },
        { label: 'INSPECCIÓN DE ELEMENTOS DE PROTECCIÓN PERSONAL', url: 'https://forms.gle/wU4jvdzGMygkMVvd6' },
        { label: 'INSPECCION DE GNV', url: 'https://forms.gle/pwNq1MHW8gQ9iXrk7' },
        { label: 'VISITAS AL AREA DE ESTIBAS', url: 'https://forms.gle/gZHYUkXUvXiDcB2c8' },
        { label: 'LISTA DE CHEQUEO PISTOLA NEUMATICA', url: 'https://forms.gle/HjzqQvpuD9GKePmQA' },
        { label: 'INSPECCION DE EQUIPOS PARA ATENCION A EMERGENCIAS', url: 'https://forms.gle/m7JjvgNpdhNcmFtY7' },
        { label: 'INSPECCION GENERAL - SEGURIDAD Y SALUD EN EL TRABAJO', url: 'https://forms.gle/hena37bUBYAUFeDK6' },
        { label: 'LISTA DE CHEQUEO DE HERRAMIENTAS MANUALES FIXING', url: 'https://forms.gle/MkW1Sa1H49MUgDVx8' },
        { label: 'LISTA DE CHEQUEO PREOPERACIONAL DE LA HIDROLAVADORA', url: 'https://forms.gle/qRfLrx2TrBLyg7Sk7' },
        { label: 'LISTA DE CHEQUEO HERRAMIENTAS MANUALES', url: 'https://forms.gle/SCYPpU37V2aXVorQA' },
      ],
    },
    programs: {
      title: 'PROGRAMAS DE SEGURIDAD',
      items: [
        { label: 'DESARROLLO SEGUIMIENTO DTOS', url: 'https://script.google.com/a/macros/lis.com.co/s/AKfycbyk0xQzUtNmeeShTsX8Y_ZE2T5Lao9_0ks52sTzwh2AaGy4vrjjI1BAzLZEdLLu6rOd/exec' },
        { label: 'SEGUIMIENTO CAPACITACIONES', url: 'https://script.google.com/a/macros/lis.com.co/s/AKfycby09kLrazTj9RCk1knaiP-e8dkE1BMap85zvpFsUiAVd22isDQpe1x7gSVyH0fJBHST/exec' },
      ],
    },
    visuals: {
      title: 'VISUALES DE MONITOREO INTEGRAL DE RIESGOS Y HÁBITOS SEGUROS',
      items: [
        { label: 'MONITOREO INTEGRAL', url: 'https://app.powerbi.com/view?r=eyJrIjoiZDQwNDk0YWUtNDNhMy00YjFjLTk2YjQtNGM2YTZhZDEyNmM1IiwidCI6IjI0MWQ1MTkyLTA2ZGYtNGQ4OS05N2NiLTE0NTMxYmJjYWI3MSIsImMiOjR9' },
      ],
    },
    notes: [],
  },
  {
    id: 'medio-ambiente',
    title: 'Medio Ambiente',
    subtitle: 'Optimizar recursos y reducir impacto',
    description: 'Administra consumo de agua, energía, emisiones y gestión de residuos para operar con eficiencia ambiental.',
    metrics: ['Consumo de agua', 'Energía por tonelada', 'Tasa de reciclaje'],
    module: 'Sostenibilidad',
    notes: [],
  },
  {
    id: 'calidad',
    title: 'Calidad',
    subtitle: 'Procesos estandarizados y consistentes',
    description: 'Controla la elaboración y envasado para garantizar la calidad de cada producto y cada marca.',
    metrics: ['No conformidades', 'Auditorías internas', 'Tasas de retrabajo'],
    module: 'Control de calidad',
    notes: [],
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento',
    subtitle: 'Máxima eficiencia y menos paradas',
    description: 'Planifica el mantenimiento preventivo y reduce fallas para mantener la continuidad operativa.',
    metrics: ['Disponibilidad de equipos', 'Mantenimientos realizados', 'MTTR'],
    module: 'Gestión de activos',
    notes: [],
  },
  {
    id: 'logistica',
    title: 'Logística',
    subtitle: 'Eficiencia en manejo y distribución interna',
    description: 'Optimiza el almacenamiento, manejo de materiales y la distribución en planta para flujo productivo estable.',
    metrics: ['Rotación de inventario', 'Tiempo de desplazamiento', 'Exactitud de entregas'],
    module: 'Cadena interna',
    notes: [],
  },
  {
    id: 'gente-organizacion',
    title: 'Gente / Organización',
    subtitle: 'Capacitación y empoderamiento del personal',
    description: 'Fomenta el desarrollo continuo de operadores y la resolución directa de problemas desde el piso de planta.',
    metrics: ['Horas de capacitación', 'Satisfacción del equipo', 'Proyectos de mejora'],
    module: 'Talento humano',
    notes: [],
  },
  {
    id: 'gestion-mejora',
    title: 'Gestión / Mejora Continua',
    subtitle: 'KPIs y rutinas de control diario',
    description: 'Define indicadores, revisa rutinas diarias y alinea planes estratégicos a mediano plazo.',
    metrics: ['KPIs cumplidos', 'Revisiones diarias', 'Proyectos de mejora'],
    module: 'Planeación estratégica',
    notes: [],
  },
];

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes, inténtalo nuevamente en un momento.' },
});

function sanitizeText(input) {
  return String(input || '')
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, '')
    .trim();
}

const getPillarById = (id) => pillars.find((item) => item.id === id);

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: http:;"
  );
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// Rutas de API
app.get('/api/pillars', (req, res) => {
  res.json(pillars.map(({ notes, ...rest }) => rest));
});

app.get('/api/pillars/:id', (req, res) => {
  const pillar = getPillarById(req.params.id);
  if (!pillar) {
    return res.status(404).json({ error: 'Pilar no encontrado' });
  }
  res.json(pillar);
});

app.post('/api/pillars/:id/notes', (req, res) => {
  const pillar = getPillarById(req.params.id);
  if (!pillar) {
    return res.status(404).json({ error: 'Pilar no encontrado' });
  }

  if (!req.body || typeof req.body.note !== 'string') {
    return res.status(400).json({ error: 'Nota inválida' });
  }

  const noteText = sanitizeText(req.body.note);
  if (!noteText) {
    return res.status(400).json({ error: 'Nota inválida' });
  }

  const note = { text: noteText, createdAt: new Date().toISOString() };
  pillar.notes.unshift(note);

  res.status(201).json({ message: 'Nota agregada', note });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Servir estáticos en producción y fallback para React (SPA)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicDir, { maxAge: '1d', immutable: true }));
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

// Iniciar servidor escuchando en 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portal Valle backend escuchando en el puerto ${PORT}`);
});
