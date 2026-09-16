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
  { text: 'TTS', bold: '16:10–20:30 · 300 pax' },
  { text: 'Hoy MAR 15 → Reunion AV JUE 17 → Montaje 21 → Evento 22', solid: true },
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
          { id: 'pa2', time: 'MANANA', what: 'Pruebas finales: Symphony, pantallas, playlists cargadas en las 3 plantas', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN' },
        ],
      },
      {
        room: 'GBS',
        floor: 'Sala Plenaria',
        tasks: [
          { id: 'gb1', time: '12:15', what: 'Entrada GBS · LED wall, audio e iluminacion en show', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'gb2', time: '16:00', what: 'Salida GBS · cambio de setup: quitar sillas, montar mesas altas', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'TikTok Shop',
        floor: 'Todo el venue',
        tasks: [
          { id: 'tt1', time: '16:10', what: 'Entrada TTS · Agency Hub, demo Starlight en Sala Escenario, Symphony activo', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN', variant: 'accent' },
          { id: 'tt2', time: '20:30', what: 'Salida TTS · cierre de jornada de show', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
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
  { id: 'o9', label: 'Agenda GBS: RESUELTO — doc de Lark "ES Commerce on TikTok | Scripts" revisado. Panel mas grande (Client panel, 13:27-13:43) es de 4 personas (Paloma/TikTok, L\'Oreal, Desigual, Scuffers/Pablo) — el kit de 5+2 mics cubre de sobra', who: 'SW: JULIAN' },
  { id: 'o10', label: 'Contenido de pantallas (principal + pantallas pequenas): draft 17/sep, version final sin cambios 20/sep — viajamos a Madrid el 21/sep', who: 'TTS + GBS · SW: JULIAN' },
  { id: 'o16', label: 'Agenda TTS: RESUELTA — sheet de Lark (16/sep). 16:00-19:45h: keynote + 4 paneles ACE + premios + networking. Panel mas grande confirmado (Assortment, 17:15h) = 5 personas en mic simultaneo, el kit de 5 diademas lo cubre justo sin margen. Paneles "Content" y "Empowerment/GMV Max" aun sin speakers confirmados — riesgo de sumar mas gente de la prevista, revisar antes de cerrar o8', who: 'TTS · SW: JULIAN' },
  { id: 'o11', label: 'Ensayo agencia Live Media (staff): por la manana, falta duracion y hora exacta — Wing ya lo esta gestionando, falta cruzarlo con AV Express', who: 'SW: JULIAN' },
  { id: 'o12', label: 'Hoja de Ruta para MC/presentador de TikTok GBS: venue, hora de llegada, ensayo, contacto de Julian — enviar al manager cuando Marta/Olenka pasen sus datos (Julian es el punto de contacto)', who: 'GBS · SW: JULIAN' },
  { id: 'o13', label: 'Confirmar con cliente TT Shop quien hace de presentador/a en su parte (Olenka cree que no tienen creador famoso, lo hacen ellos mismos — verificar)', who: 'TTS · SW: JULIAN' },
  { id: 'o14', label: 'Musica de entrada/salida al escenario (walk-on/walk-off), GBS y TTS: preguntado por Lark el 15/sep (a Ellie/Lottie en ingles y a Laura Garcia en español) — si tienen pistas especificas o las propone Smartworks. Sin respuesta aun', who: 'GBS + TTS · SW: JULIAN' },
  { id: 'o15', label: 'KV del evento / que se muestra en pantalla cuando no hay contenido activo, GBS y TTS: preguntado por Lark el 15/sep. Sin respuesta aun. (Confidence monitors ya resuelto: notas del speaker van debajo de cada slide, confirmado 15/sep)', who: 'GBS + TTS · SW: JULIAN' },
]

export const contacts: Contact[] = [
  { initial: 'S', role: 'AV Express · Director', name: 'Salvador', lines: ['salvador@avexpress.tv', '620 95 63 67'] },
  { initial: 'L', role: 'AV Express · Produccion', name: 'Laura', lines: ['ayudantedeproduccion4@avexpress.tv', '669 62 77 96'] },
  { initial: 'T', role: 'Cubensis · Symphony', name: 'Tomas Sequeiros', lines: ['tomas@cubensisproject.com', '654 447 548'] },
]

export const footerNote = 'Borrador de trabajo — confirmar horas exactas en la reunion de AV del jueves'