import type { EscaletaDay, CrewPanel, OpenItem, Contact } from '../types/escaleta'

export const meta = {
  eyebrow: 'Produccion tecnica',
  title: 'Escaleta AV',
  event: 'TikTok Shop Summit & GBS 2026',
  venue: 'Green Patio · C. de Salamanca 23, Madrid',
  dates: 'Montaje 21.SEP · Evento 22.SEP',
}

export const metaStrip = [
  { text: 'Responsable AV', bold: 'Julian Martinez' },
  { text: 'GBS', bold: '12:15–16:00 · 250 pax' },
  { text: 'TTS', bold: '16:00–19:45 · 300 pax' },
  { text: 'Hoy MIE 16 → Reunion AV JUE 17 → Montaje 21 → Evento 22', solid: true },
]

export const days: EscaletaDay[] = [
  {
    num: 'DIA 1',
    title: 'Montaje & carga de contenidos',
    date: '21 SEPTIEMBRE',
    description:
      'Todo el montaje se hace este dia — el 22 solo llegan productos y se hacen ajustes finales. Cierre de jornada: contenidos cargados y probados en imagen fija, por USB, en todas las pantallas.',
    lanes: [
      {
        room: 'Sala Plenaria',
        floor: 'Planta 0 · LED wall',
        tasks: [
          { id: 'sp1', time: 'TARDE', what: 'Marcar en el suelo posiciones de sillas, stands y mobiliario', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sp2', time: 'TARDE', what: 'Validar LED wall 6x3,5m + control (montaje reutilizado del evento anterior — confirmado)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sp2b', time: 'TARDE', what: 'Chequear 5 diademas DPA + 2 mano Sennheiser (PO2 V11, cubre el pico de 5 personas en escena de TTS) + instalar 1-2 diademas de backup si AV Express confirma capacidad del splitter', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sp3', time: 'NOCHE', what: 'Cargar agenda + layout GBS/TTS y 2 gobos en USB, imagen fija', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Symphony',
        floor: 'Planta 2 · Cubensis',
        tasks: [
          { id: 'sy1', time: '17:00', what: 'Montaje del juego · totem tactil vertical, backdrop 250×250cm + linoleo 2,5×2,5m', meta: 'CUBENSIS · SW: JULIAN' },
          { id: 'sy2', time: 'NOCHE', what: 'Test con AV: portatil de respaldo (Cubensis) conectado por HDMI al totem', meta: 'CUBENSIS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Sala Escenario',
        floor: 'Planta 1 · Tier 1 / Starlight',
        tasks: [
          { id: 'se1', time: 'TARDE', what: 'Montaje plasma 65", PC, altavoces y microfono · moqueta 4×4m morada', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'se2', time: 'TBC', what: 'Horario de ensayo Starlight (evitar choque con ensayo del keynote)', meta: 'GBS · SW: JULIAN', variant: 'quiet' },
        ],
      },
      {
        room: 'Sala de Cristal',
        floor: 'Planta 2',
        tasks: [
          { id: 'sc1', time: 'TARDE', what: 'Montaje 1× totem 50" (confirmado por Olenka)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sc2', time: 'NOCHE', what: 'Carga de contenido, imagen fija por USB', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Hall & Invernadero',
        floor: 'Planta 0 y 1 · accesos',
        tasks: [
          { id: 'hi1', time: 'TARDE', what: '2× totem 98" en Hall Planta Baja + 1× totem 50" en Invernadero', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'hi2', time: 'NOCHE', what: 'Carga de agenda/layout, imagen fija', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
    ],
  },
  {
    num: 'DIA 2',
    title: 'Evento en vivo',
    date: '22 SEPTIEMBRE',
    description:
      'Dos eventos consecutivos en el mismo espacio, con accesos y salidas separados. La transicion entre GBS y TTS incluye cambio de setup en Sala Plenaria.',
    lanes: [
      {
        room: 'Pre-apertura',
        floor: 'Todas las salas',
        tasks: [
          { id: 'pa1', time: '08:00–10:00', what: 'Ensayo onsite GBS con speakers y host Pablo Meixe', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'pa2', time: 'MANANA', what: 'Pruebas finales: Symphony, pantallas, playlists cargadas en las 3 plantas', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN' },
        ],
      },
      {
        room: 'GBS',
        floor: 'Sala Plenaria',
        tasks: [
          { id: 'gb1', time: '12:15–12:45', what: 'Llegada GBS · sala, LED wall, audio e iluminacion en show', meta: 'AV EXPRESS + GBS · SW: JULIAN', variant: 'accent' },
          { id: 'gb2', time: '12:50–12:54', what: 'Apertura: Pablo Meixe · música, countdown, sizzle y voice-over', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb3', time: '12:54–13:27', what: 'Welcome & New Era (Teba), Watch It Love It (Judith), juego de Pablo y Want It Success Stories (Neus)', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb4', time: '13:27–13:43', what: 'Client panel: TikTok, L’Oréal, Desigual y Scuffers', meta: 'GBS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'gb5', time: '13:43–14:30', what: 'Full-funnel Measurement (Marina), Winning Peak (Adrián) y cierre de Pablo', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb6', time: '14:30–16:00', what: 'Networking GBS: bites y drinks; mantener ambiente y pantallas', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb7', time: '16:00', what: 'Cambio de setup: quitar sillas y montar mesas altas', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'TikTok Shop',
        floor: 'Todo el venue',
        tasks: [
          { id: 'tt1', time: '16:00–16:20', what: 'Entrada TTS · Agency Hub, demo Starlight en Sala Escenario, Symphony activo', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN', variant: 'accent' },
          { id: 'tt2', time: '18:45–19:45', what: 'Matchmaking, networking, food y cierre TTS', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Desmontaje',
        floor: 'Todas las salas',
        tasks: [
          { id: 'dm1', time: 'POST', what: 'Strike de equipos AV y devolucion al proveedor', meta: 'AV EXPRESS · SW: JULIAN', variant: 'quiet' },
        ],
      },
    ],
  },
]

export const crew: CrewPanel[] = [
  {
    room: 'Sala Plenaria',
    crew: '5 tecnicos + rigging',
    items: ['Iluminacion ×1', 'Sonido ×1', 'Video ×2', 'LED ×1', 'Rigging (2 truss + elevadora) ×1'],
  },
  {
    room: 'Sala Escenario',
    crew: 'Demos Tier 1 / Starlight',
    items: ['Audiovisual ×1', 'Plasma 65" + PC + altavoces + mic'],
  },
  {
    room: 'Live Media (staff)',
    crew: { warn: 'Horario a confirmar' },
    items: ['Ensayo por la manana, duracion TBC', 'Wing gestionando el horario exacto, falta cruzar con AV Express'],
  },
  {
    room: 'Sala de Cristal',
    crew: { warn: 'A confirmar' },
    items: ['Audiovisual ×1 (o video + sonido separado)'],
  },
]

export const openItems: OpenItem[] = [
  { id: 'o3', label: 'Sonido: cerrar hora exacta de llamada del tecnico + orden de montaje + comida escalonada del crew (mensaje enviado 15/sep, pendiente respuesta)', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o4', label: 'Ensayos: definir horario de Starlight para que no choque con el ensayo del keynote', who: 'GBS · SW: JULIAN' },
  { id: 'o5', label: 'Gobo TTS: pedir el texto final a Laura para preparar el arte (deadline 21/sep — preparar template mientras se espera)', who: 'TTS (LAURA) · SW: JULIAN' },
  { id: 'o7', label: 'Musica ambiente: RESUELTO — Ellie confirmo por Lark que Spotify esta bien (10/sep), se resuelve con las 3 playlists ya armadas. Falta cerrar musica de entrada/salida al escenario (walk-on/walk-off), ver o14', who: 'SW: JULIAN' },
  { id: 'o8', label: 'Microfonos: 1-2 diademas de backup + capacidad del splitter RF (6-7 canales) pedido por correo a AV Express (15/sep), pendiente respuesta', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o9', label: 'Agenda GBS: RESUELTA — show 12:50–14:30 y networking hasta 16:00. Panel 13:27–13:43: TikTok, L’Oréal, Desigual y Scuffers. Faltan roster final y necesidades exactas para cerrar microfonía.', who: 'GBS · SW: JULIAN' },
  { id: 'o10', label: 'Contenido de pantallas (principal + pantallas pequenas): draft 17/sep, version final sin cambios 20/sep — viajamos a Madrid el 21/sep', who: 'TTS + GBS · SW: JULIAN' },
  { id: 'o16', label: 'Agenda TTS: RESUELTA — 16:00–19:45: keynote, 4 paneles ACE, premios y networking. El panel Assortment (16:45–17:15) llega a 5 voces simultáneas: las 5 diademas cubren justo, sin margen. Content y Empowerment/GMV Max siguen sin speakers cerrados.', who: 'TTS · SW: JULIAN' },
  { id: 'o11', label: 'Ensayo agencia Live Media (staff): por la manana, falta duracion y hora exacta — Wing ya lo esta gestionando, falta cruzarlo con AV Express', who: 'SW: JULIAN' },
  { id: 'o12', label: 'Hoja de Ruta GBS: Pablo Meixe confirmado como host. Incluye ensayo onsite 08:00–10:00, llegada, cues de apertura y contacto de Julián. Falta el contacto directo de su manager para enviarla.', who: 'GBS · SW: JULIAN' },
  { id: 'o13', label: 'Confirmar con cliente TT Shop quien hace de presentador/a en su parte (Olenka cree que no tienen creador famoso, lo hacen ellos mismos — verificar)', who: 'TTS · SW: JULIAN' },
  { id: 'o14', label: 'Musica de entrada/salida al escenario (walk-on/walk-off), GBS y TTS: preguntado por Lark el 15/sep (a Ellie/Lottie en ingles y a Laura Garcia en español) — si tienen pistas especificas o las propone Smartworks. Sin respuesta aun', who: 'GBS + TTS · SW: JULIAN' },
  { id: 'o15', label: 'KV / pantalla idle GBS y TTS: pendiente respuesta. Confidence monitor GBS es P0 hoy 16/sep: recibir y validar las notas por bloque antes de cerrar el guion técnico.', who: 'GBS + TTS · SW: JULIAN' },
]

export const contacts: Contact[] = [
  { initial: 'S', role: 'AV Express · Director', name: 'Salvador', lines: ['salvador@avexpress.tv', '620 95 63 67'] },
  { initial: 'L', role: 'AV Express · Produccion', name: 'Laura', lines: ['ayudantedeproduccion4@avexpress.tv', '669 62 77 96'] },
  { initial: 'T', role: 'Cubensis · Symphony', name: 'Tomas Sequeiros', lines: ['tomas@cubensisproject.com', '654 447 548'] },
]

export const footerNote = 'Actualizado 16.SEP — confirmar únicamente los puntos marcados como pendientes en la reunión de AV del jueves'