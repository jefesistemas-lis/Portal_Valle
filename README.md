# Portal Valle - Los Pilares de VPO

Portal web para la planta ABI del Valle, enfocado en la gestión operativa mediante los siete pilares de VPO.

## Estructura

- Backend: Node.js + Express (`backend/`)
- Frontend: Vite + React (`frontend/`)
- API: `/api/pillars` y `/api/pillars/:id`, con módulo de notas por pilar

## Instalación

Desde la raíz del proyecto:

```bash
npm run install-all
```

## Desarrollo

Desde la raíz:

```bash
npm run dev
```

Esto inicia el backend en `http://localhost:3000` y el frontend en `http://localhost:5173`.

## Producción

1. Genera la aplicación frontend:

```bash
npm --prefix frontend run build
```

2. Inicia el backend:

```bash
npm --prefix backend run start
```

El backend sirve la app estática creada en `frontend/dist`.

## Pilares incluidos

- Seguridad
- Medio Ambiente
- Calidad
- Mantenimiento
- Logística
- Gente / Organización
- Gestión / Mejora Continua

## Notas

El frontend usa `src/App.jsx` para la interfaz React y renderiza la barra lateral de pilares.
