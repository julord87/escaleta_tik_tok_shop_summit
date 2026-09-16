import type { EscaletaDay, CrewPanel, OpenItem, Contact } from '../types/escaleta'

export const meta = {
  eyebrow: 'Producción técnica',
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
    num: 'DÍA 0',
    title: 'Ensayos previos',
    date: '16 SEPTIEMBRE',
    description:
      'Ensayo de preparación de GBS. Confirmar que los acuerdos de guion y transiciones se trasladan al ensayo onsite.',
    lanes: [
      {
        room: 'GBS · Oficina',
        floor: 'Ensayo previo',
        tasks: [
          { id: 'pr1', time: '09:00–11:00', what: 'Ensayo de oficina con el MC Pablo Meixe: guion, briefing y transiciones (confirmar asistencia y guion definitivo)', meta: 'GBS / CLIENTE · SW: JULIAN', variant: 'accent' },
          { id: 'pr2', time: 'TBC', what: 'Verificar las 3 llamadas previas de briefing y guion con Pablo requeridas por contrato', meta: 'MARTA + OSCAR · SW: JULIAN', variant: 'quiet' },
        ],
      },
      {
        room: 'Activación Smart+',
        floor: 'GBS · Coordinación externa — no es AV Express',
        tasks: [
          { id: 'sm1', time: 'PRE-EVENTO', what: 'Impresión de A5 Smart+ (150 unidades, doble cara)', meta: 'PROVEEDOR IMPRESIÓN · SW: JULIAN' },
          { id: 'sm2', time: 'PRE-EVENTO', what: 'Material de cortina extra para cubrir la zona Smart+', meta: 'CONSTRUCCIÓN · SW: JULIAN' },
        ],
      },
    ],
  },
  {
    num: 'DIA 1',
    title: 'Montaje & carga de contenidos',
    date: '21 SEPTIEMBRE',
    description:
      'Todo el montaje se hace este día — el 22 solo llegan productos y se hacen ajustes finales. Cierre de jornada: contenidos cargados y probados en imagen fija, por USB, en todas las pantallas.',
    lanes: [
      {
        room: 'Sala Plenaria',
        floor: 'Planta 0 · LED wall',
        tasks: [
          { id: 'sp1', time: 'TARDE', what: 'Marcar en el suelo posiciones de sillas, stands y mobiliario (coordinar con layout final)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sp2', time: 'TARDE', what: 'Validar LED wall 6x3,5m + control (montaje reutilizado del evento anterior — confirmado)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sp2b', time: 'TARDE', what: 'Chequear 5 diademas DPA + 2 mano Sennheiser (PO2 V11, cubre el pico de 5 personas en escena de TTS) + confirmar capacidad de splitter RF y posibles backups (1-2 diademas)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sp3', time: 'NOCHE', what: 'Cargar agenda, layouts GBS/TTS y 2 gobos por USB, imagen fija (contenido descargado)', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Symphony',
        floor: 'Planta 2 · Cubensis',
        tasks: [
          { id: 'sy1', time: '17:00', what: 'Montaje del juego: tótem táctil vertical, backdrop 250×250cm + linóleo 2,5×2,5m (coordinar acceso y descarga)', meta: 'CUBENSIS · SW: JULIAN' },
          { id: 'sy2', time: 'NOCHE', what: 'Test con AV: portátil de respaldo de Cubensis por HDMI al tótem (validar build final y contingencia)', meta: 'CUBENSIS + AV EXPRESS · SW: JULIAN' },
        ],
      },
      {
        room: 'Sala Escenario',
        floor: 'Planta 1 · Tier 1 / Starlight',
        tasks: [
          { id: 'se1', time: 'TARDE', what: 'Montaje de plasma 65", PC, altavoces, micrófono y moqueta morada 4×4m (activación Tier 1)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'se2', time: 'TBC', what: 'Horario de ensayo Starlight / Tier 1 — evitar choque con el ensayo onsite del keynote GBS (08:00–10:00)', meta: 'AV EXPRESS + GBS · SW: JULIAN', variant: 'quiet' },
        ],
      },
      {
        room: 'Sala de Cristal',
        floor: 'Planta 2',
        tasks: [
          { id: 'sc1', time: 'TARDE', what: 'Montaje 1× tótem vertical 50" (confirmado por Olenka, pendiente confirmación escrita de AV Express)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'sc2', time: 'NOCHE', what: 'Carga de contenido, imagen fija por USB (comprobar reproducción)', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Hall & Invernadero',
        floor: 'Planta 0 y 1 · accesos',
        tasks: [
          { id: 'hi1', time: 'TARDE', what: '2× tótem 98" en Hall Planta Baja + 1× tótem 50" en Invernadero (validar ubicación con producción)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'hi2', time: 'NOCHE', what: 'Carga de agenda y layout, imagen fija por USB', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
    ],
  },
  {
    num: 'DIA 2',
    title: 'Evento en vivo',
    date: '22 SEPTIEMBRE',
    description:
      'Dos eventos consecutivos en el mismo espacio, con accesos y salidas separados. La transición entre GBS y TTS incluye cambio de setup en Sala Plenaria.',
    lanes: [
      {
        room: 'Pre-apertura',
        floor: 'Todas las salas',
        tasks: [
          { id: 'pa1', time: '08:00–10:00', what: 'Llegada ponentes GBS (08:00/08:15) y ensayo onsite con MC Pablo Meixe; llegada y transiciones (priorizar transiciones si falta tiempo)', meta: 'GBS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'pa2', time: 'MAÑANA', what: 'Pruebas finales: Symphony, pantallas, playlists cargadas en las 3 plantas (verificar todo antes de apertura)', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN' },
        ],
      },
      {
        room: 'Tier One / Starlight',
        floor: 'Sala Escenario · técnico dedicado desde las 11:00',
        tasks: [
          { id: 'st1', time: '11:00–12:00', what: 'Tier One / Starlight: prueba de contenido y portátil; prueba de sonido breve', meta: 'TIER ONE + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'st2', time: 'TBC', what: 'Confirmar si hay ensayo adicional (fuera de la ventana 11:00–12:00) y evitar solape con GBS / Live Media', meta: 'LAURA + AGENCIA · SW: JULIAN', variant: 'quiet' },
        ],
      },
      {
        room: 'GBS',
        floor: 'Sala Plenaria / Venue completo',
        tasks: [
          { id: 'gb1', time: '12:15–12:45', what: 'Llegada asistentes GBS · sala, LED wall, audio e iluminación en modo show', meta: 'AV EXPRESS + GBS · SW: JULIAN', variant: 'accent' },
          { id: 'gb2', time: '12:50–12:54', what: 'Apertura GBS: host / creator Pablo Meixe · música de entrada, vídeo countdown, sizzle y voice-over', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb3', time: '12:54–13:02', what: 'GBS: Welcome & New Era · Speaker: Teba', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb3b', time: '13:02–13:13', what: 'GBS: Watch It, Love It · Speaker: Judith', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb3c', time: '13:13–13:18', what: 'GBS: Juego “Más o menos” con Pablo Meixe (host / creator)', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb3d', time: '13:18–13:27', what: 'GBS: Want It Success Stories · Speaker: Neus', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb4', time: '13:27–13:43', what: 'Client panel GBS: TikTok (Paloma), L’Oréal, Desigual y Scuffers (validar microfonía exacta con nombres definitivos)', meta: 'GBS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'gb5', time: '13:43–13:52', what: 'GBS: Full-funnel Measurement · Speaker: Marina', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb5b', time: '13:52–14:30', what: 'GBS: Winning Peak (Adrián) + cierre de Pablo Meixe (final de contenido a las 14:30)', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb6', time: '14:30–16:00', what: 'Networking GBS: bites y drinks; mantener ambiente y pantallas operativas hasta cambio de setup', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb7', time: '16:00', what: 'Salida GBS / Cambio de setup: quitar sillas y montar mesas altas', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'TikTok Shop',
        floor: 'Sala Plenaria / Venue completo',
        tasks: [
          { id: 'tt1', time: '16:00–16:20', what: 'Llegada TTS · Agency Hub, photocall, demo Starlight en Sala Escenario, Symphony activo', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN', variant: 'accent' },
          { id: 'tt2', time: '16:20–16:30', what: 'Seating TTS (operación de sala)', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'tt3', time: '16:30–16:45', what: 'Keynote de apertura · The Growth Engine', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt4', time: '16:45–17:15', what: 'Panel ACE Assortment: moderador + 4 marcas (Colgate, Moulinex, Aldous Bio, Ysabel Mora) — 5 personas con micro simultáneo, sin margen', meta: 'TTS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'tt5', time: '17:15–17:20', what: 'Entrega de premios ACE', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt6', time: '17:20–17:40', what: 'Panel ACE Content: creators y sellers — speakers por confirmar, riesgo de superar capacidad de micros', meta: 'TTS + AV EXPRESS · SW: JULIAN', variant: 'quiet' },
          { id: 'tt7', time: '17:40–17:45', what: 'Entrega de premios ACE', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt7b', time: '17:45–17:50', what: 'Break (mantener sala en show)', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt8', time: '17:50–18:05', what: 'Panel ACE Empowerment / GMV Max — speakers por confirmar, mismo riesgo de capacidad de micros', meta: 'TTS + AV EXPRESS · SW: JULIAN', variant: 'quiet' },
          { id: 'tt9', time: '18:05–18:25', what: 'Panel ACE Empowerment / Top Agencies Roundtable (1 TSP + 1 CAP + 1 TAP)', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt10', time: '18:25–18:30', what: 'Entrega de premios ACE', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt11', time: '18:30–18:45', what: 'Peak Season Overview', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt12', time: '18:45–19:45', what: 'Matchmaking, networking y food (mantener Symphony y pantallas operativas)', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'tt13', time: '19:45', what: 'Cierre TTS tras matchmaking, networking y food — salida de asistentes', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Activación Smart+',
        floor: 'GBS · Coordinación externa — no es AV Express',
        tasks: [
          { id: 'sm3', time: 'MAÑANA', what: 'Distribución de las Smart+ cards en los asientos (~38 unidades según diseño)', meta: 'PRODUCCIÓN · SW: JULIAN' },
          { id: 'sm4', time: 'TBC', what: 'Entrega de premios GBS/TTS: 1× LED mask GBS, 1× LED mask/proyector TTS (coordinar entrega y custodia)', meta: 'LOGÍSTICA · SW: JULIAN' },
        ],
      },
      {
        room: 'Desmontaje',
        floor: 'Todas las salas',
        tasks: [
          { id: 'dm1', time: 'POST', what: 'Strike de equipos AV y devolución al proveedor (confirmar orden de desmontaje)', meta: 'AV EXPRESS · SW: JULIAN', variant: 'quiet' },
        ],
      },
    ],
  },
]

export const crew: CrewPanel[] = [
  {
    room: 'Sala Plenaria',
    crew: '5 técnicos + rigging',
    items: ['Iluminación ×1', 'Sonido ×1', 'Vídeo ×2', 'LED ×1', 'Rigging (2 truss + elevadora) ×1'],
  },
  {
    room: 'Sala Escenario',
    crew: 'Demos Tier 1 / Starlight',
    items: ['Audiovisual ×1', 'Plasma 65" + PC + altavoces + mic (técnico dedicado desde las 11:00)'],
  },
  {
    room: 'Live Media (staff)',
    crew: { warn: 'Horario a confirmar' },
    items: ['Ensayo por la mañana, duración TBC', 'Laura hace seguimiento con la agencia; cruzar con técnico de Sala Escenario disponible desde 11:00'],
  },
  {
    room: 'Sala de Cristal',
    crew: { warn: 'A confirmar' },
    items: ['Audiovisual ×1 (o vídeo + sonido separado)'],
  },
]

export const openItems: OpenItem[] = [
  { id: 'o3', label: 'Sonido: cerrar hora exacta de llamada del técnico, orden de montaje y comida escalonada del crew (P0 - pendiente respuesta de AV Express)', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o4', label: 'Starlight / Tier One: técnico disponible desde 11:00 en Sala Escenario. Ventana 11:00–12:00 para contenido + portátil y prueba breve de sonido; confirmar si habrá ensayo adicional fuera de esa ventana y evitar choque con GBS / Live Media.', who: 'TIER ONE + AV EXPRESS · SW: JULIAN' },
  { id: 'o5', label: 'Gobo TTS: texto borrador acordado — “Watch it, love it, want it, buy it, share it.” Falta texto final del cliente (Laura / TTS) para cerrar el arte, deadline 21/sep. Confirmar pack de gobo con AV Express una vez cerrado.', who: 'LAURA / TTS + AV EXPRESS · SW: JULIAN' },
  { id: 'o7', label: 'Música ambiente: RESUELTO — Ellie confirmó por Lark que Spotify está bien (10/sep), se resuelve con las 3 playlists ya armadas. Pistas walk-on/walk-off, voces en off y cues: Lottie compartirá su selección (mencionó Bad Bunny y Zara Larsson).', who: 'GBS + TTS · SW: JULIAN' },
  { id: 'o8', label: 'Microfonía: el panel TTS Assortment (16:45–17:15) usa 5 voces simultáneas (5 diademas exactas, sin margen). Los paneles Content (17:20–17:40) y Empowerment/GMV Max (17:50–18:05) siguen sin speakers confirmados (riesgo de superar capacidad). Validar paneles GBS/TTS, confirmar diademas de backup y capacidad del splitter RF (6-7 canales) pedido a AV Express.', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o9', label: 'Agenda GBS: show 12:50–14:30 y networking hasta 16:00. Panel 13:27–13:43: TikTok (Paloma), L’Oréal, Desigual y Scuffers. Faltan nombres definitivos y necesidades exactas para cerrar microfonía.', who: 'GBS · SW: JULIAN' },
  { id: 'o10', label: 'Pantallas & Contenidos GBS: Lottie comparte hoy versión casi final. Contenido definitivo pantallas: draft 17/sep, versión final 20/sep (incluye notas de comfort monitor con deadline 16/sep). Faltan slides de creadores; vídeos se entregan por Google Drive.', who: 'GBS + TTS · SW: JULIAN' },
  { id: 'o16', label: 'Agenda TTS: 16:00–19:45 (keynote, 4 paneles ACE, premios, networking 18:45–19:45 y cierre a las 19:45). El panel Assortment llega a 5 voces simultáneas; Content y Empowerment/GMV Max siguen sin speakers cerrados.', who: 'TTS · SW: JULIAN' },
  { id: 'o11', label: 'Live Media: hora y duración aún sin cerrar. Laura hace seguimiento con la agencia; cruzar con técnico de Sala Escenario disponible desde las 11:00.', who: 'LAURA + LIVE MEDIA · SW: JULIAN' },
  { id: 'o17', label: 'TTS: no hay ensayo onsite ni prueba de micros confirmados. Cerrar si habrá soundcheck con presentador/a y panelistas antes del show.', who: 'TTS (LAURA) · SW: JULIAN' },
  { id: 'o18', label: 'Pablo Meixe: recibir email de Oscar y cerrar Hoja de Ruta. Confirmar que las 3 llamadas previas de briefing y guion requeridas por contrato están realizadas o agendadas.', who: 'GBS / SMARTWORKS · SW: JULIAN' },
  { id: 'o12', label: 'Hoja de Ruta GBS: Pablo llega a las 08:00 (ensayo 08:00–10:00). Oscar ya tiene briefing completo. Marta comparte su email; Julián queda como contacto principal in situ. Falta contacto directo de Oscar (ver o19).', who: 'GBS · SW: JULIAN' },
  { id: 'o19', label: 'Hoja de Ruta MC GBS (Pablo Meixe): falta contacto directo del manager Oscar (solo se tiene el email de Marta) — necesario para cerrar la coordinación del día del evento.', who: 'GBS · SW: JULIAN' },
  { id: 'o13', label: 'Confirmar con cliente TT Shop quién hace de presentador/a en su bloque (Olenka cree que no tienen creador famoso, lo hacen ellos mismos — verificar).', who: 'LAURA / TTS · SW: JULIAN' },
  { id: 'o14', label: 'Música walk-on/walk-off: Lottie compartirá su selección (Bad Bunny y Zara Larsson mencionados). Música, voces en off y cues se integrarán en el documento de agenda/guion; validar enlaces y derechos.', who: 'GBS + TTS · SW: JULIAN' },
  { id: 'o15', label: 'KV / pantalla idle GBS y TTS: pendiente respuesta del cliente. Comfort-monitor notes GBS previstas validar por bloque al recibirlas.', who: 'GBS + TTS · SW: JULIAN' },
]

export const contacts: Contact[] = [
  { initial: 'S', role: 'AV Express · Director', name: 'Salvador', lines: ['salvador@avexpress.tv', '620 95 63 67'] },
  { initial: 'L', role: 'AV Express · Producción', name: 'Laura', lines: ['ayudantedeproduccion4@avexpress.tv', '669 62 77 96'] },
  { initial: 'T', role: 'Cubensis · Symphony', name: 'Tomas Sequeiros', lines: ['tomas@cubensisproject.com', '654 447 548'] },
  { initial: 'J', role: 'Smartworks · Responsable AV', name: 'Julian Martinez', lines: ['Punto de contacto general'] },
]

export const footerNote = 'Actualizado: sincronizado totalmente con Excel Escaleta Proveedores (Smart+, desgloses de ponentes GBS/TTS, horario networking TTS 18:45-19:45 y cierre a las 19:45, prioridades P0/P1 de pendientes).'