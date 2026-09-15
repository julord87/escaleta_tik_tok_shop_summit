# Escaleta AV

App web de escaletas para produccion tecnica (Smartworks). Checklist en vivo por sala/dia, con notas por tarea, para TikTok Shop Summit & GBS 2026.

## Stack

- React + TypeScript + Vite (SPA)
- Tailwind CSS v4
- Supabase (Postgres + Realtime) para estado compartido entre el equipo; sin configurar, cae a localStorage
- Capacitor para empaquetar como app iOS/Android

## Desarrollo

```
npm install
npm run dev
```

Copiar `.env.example` a `.env` y completar `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` para habilitar persistencia compartida en tiempo real (tabla `task_state`: `id text primary key, checked boolean, note text`). Sin esas variables la app funciona igual, guardando en localStorage del navegador.

## Legacy

`legacy/escaleta-av.html` es la version anterior (artifact standalone, un solo archivo). Se mantiene como referencia.
