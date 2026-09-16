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
  { text: 'TTS', bold: '16:00–20:30 · 300 pax' },
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
          { id: 'pr1', time: '09:00–11:00', what: 'Ensayo de oficina con Pablo Meixe: guion, briefing y transiciones', meta: 'GBS · SW: JULIAN', variant: 'accent' },
          { id: 'pr2', time: 'TBC', what: 'Verificar las 3 llamadas previas de briefing y guion con Pablo requeridas por contrato', meta: 'MARTA + OSCAR · SW: JULIAN', variant: 'quiet' },
        ],
      },
    ],
  },
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
          { id: 'sy2', time: 'NOCHE', what: 'Test con AV: portátil de respaldo de Cubensis por HDMI al tótem', meta: 'CUBENSIS + AV EXPRESS · SW: JULIAN' },
        ],
      },
      {
        room: 'Sala Escenario',
        floor: 'Planta 1 · Tier 1 / Starlive',
        tasks: [
          { id: 'se1', time: 'TARDE', what: 'Montaje plasma 65", PC, altavoces y microfono · moqueta 4×4m morada', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'se2', time: 'TBC', what: 'Horario de ensayo Starlive (Tier 1) — evitar choque con el ensayo onsite del keynote GBS (8:00–10:00)', meta: 'AV EXPRESS + GBS · SW: JULIAN', variant: 'quiet' },
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
          { id: 'pa1', time: '08:00–10:00', what: 'Ensayo onsite con todos los speakers de GBS (incluye MC Pablo Meixe); llegada y transiciones', meta: 'GBS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'pa2', time: 'MANANA', what: 'Pruebas finales: Symphony, pantallas, playlists cargadas en las 3 plantas', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN' },
        ],
      },
      {
        room: 'Tier One / Starlive',
        floor: 'Sala Escenario · técnico dedicado desde las 11:00',
        tasks: [
          { id: 'st1', time: '11:00–12:00', what: 'Prueba de contenido y portátil de Tier One; prueba de sonido breve', meta: 'TIER ONE + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'st2', time: 'TBC', what: 'Confirmar si hay ensayo adicional y evitar solape con GBS / Live Media', meta: 'LAURA + AGENCIA · SW: JULIAN', variant: 'quiet' },
        ],
      },
      {
        room: 'GBS',
        floor: 'Sala Plenaria',
        tasks: [
          { id: 'gb1', time: '12:15–12:45', what: 'Llegada GBS · sala, LED wall, audio e iluminacion en show', meta: 'AV EXPRESS + GBS · SW: JULIAN', variant: 'accent' },
          { id: 'gb2', time: '12:50–12:54', what: 'Apertura: Pablo Meixe · música, countdown, sizzle y voice-over', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb3', time: '12:54–13:27', what: 'Welcome & New Era (Teba), Watch It Love It (Judith), juego de Pablo y Want It Success Stories (Neus)', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb4', time: '13:27–13:43', what: 'Client panel: TikTok (Paloma), L’Oréal, Desigual y Scuffers', meta: 'GBS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'gb5', time: '13:43–14:30', what: 'Full-funnel Measurement (Marina), Winning Peak (Adrián) y cierre de Pablo', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb6', time: '14:30–16:00', what: 'Networking GBS: bites y drinks; mantener ambiente y pantallas', meta: 'GBS + AV EXPRESS · SW: JULIAN' },
          { id: 'gb7', time: '16:00', what: 'Cambio de setup: quitar sillas y montar mesas altas', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'TikTok Shop',
        floor: 'Todo el venue',
        tasks: [
          { id: 'tt1', time: '16:00–16:20', what: 'Entrada TTS · Agency Hub, photocall, demo Starlive en Sala Escenario, Symphony activo', meta: 'AV EXPRESS + CUBENSIS · SW: JULIAN', variant: 'accent' },
          { id: 'tt2', time: '16:20–16:30', what: 'Seating TTS', meta: 'AV EXPRESS · SW: JULIAN' },
          { id: 'tt3', time: '16:30–16:45', what: 'Keynote de apertura · The Growth Engine', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt4', time: '16:45–17:15', what: 'ACE Panel Assortment · moderador + 4 marcas (Colgate, Moulinex, Aldous Bio, Ysabel Mora) — 5 voces simultaneas, el kit de 5 diademas cubre justo, sin margen', meta: 'TTS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'tt5', time: '17:15–17:20', what: 'Entrega de premios ACE', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt6', time: '17:20–17:40', what: 'ACE Panel Content · creators y sellers — speakers aun sin confirmar, riesgo de superar la capacidad de mics si suman mas gente', meta: 'TTS + AV EXPRESS · SW: JULIAN', variant: 'quiet' },
          { id: 'tt7', time: '17:40–17:45', what: 'Entrega de premios ACE', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt7b', time: '17:45–17:50', what: 'Break', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt8', time: '17:50–18:05', what: 'ACE Panel Empowerment / GMV Max · speakers aun sin confirmar, mismo riesgo de capacidad de mics', meta: 'TTS + AV EXPRESS · SW: JULIAN', variant: 'quiet' },
          { id: 'tt9', time: '18:05–18:25', what: 'Top Agencies Roundtable (1 TSP + 1 CAP + 1 TAP)', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt10', time: '18:25–18:30', what: 'Entrega de premios ACE', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt11', time: '18:30–18:45', what: 'Peak Season Overview', meta: 'TTS + AV EXPRESS · SW: JULIAN' },
          { id: 'tt12', time: '18:45–19:45', what: 'Matchmaking, networking y food', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
          { id: 'tt13', time: '20:30', what: 'Salida TTS — cierre de jornada', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Activación Smart+',
        floor: 'GBS · Coordinación externa — no es AV Express',
        tasks: [
          { id: 'sm3', time: 'MANANA', what: 'Distribución de las Smart+ cards en los asientos (~38 unidades, según diseño)', meta: 'PRODUCCIÓN · SW: JULIAN' },
          { id: 'sm4', time: 'TARDE', what: 'Entrega de premios GBS/TTS: 1× LED mask GBS, 1× LED mask/proyector TTS', meta: 'LOGÍSTICA · SW: JULIAN' },
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
    crew: 'Demos Tier 1 / Starlive',
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
  { id: 'o4', label: 'Starlive / Tier One: técnico disponible desde 11:00 en Sala Escenario. Ventana 11:00–12:00 para contenido + portátil y prueba breve de sonido; horario de ensayo aun sin definir, evitar choque con el ensayo onsite del keynote GBS (8:00–10:00); Laura confirma si habrá ensayo adicional.', who: 'TIER ONE + AV EXPRESS · SW: JULIAN' },
  { id: 'o5', label: 'Gobo TTS: texto borrador acordado — “Watch it, love it, want it, buy it, share it.” Falta texto final del cliente (Laura) para cerrar el arte, deadline 21/sep. Confirmar pack de gobo con AV Express una vez cerrado.', who: 'TTS + AV EXPRESS · SW: JULIAN' },
  { id: 'o7', label: 'Musica ambiente: RESUELTO — Ellie confirmo por Lark que Spotify esta bien (10/sep), se resuelve con las 3 playlists ya armadas. Falta cerrar musica de entrada/salida al escenario (walk-on/walk-off), ver o14', who: 'SW: JULIAN' },
  { id: 'o8', label: 'Microfonos: el panel TTS mas grande confirmado (Assortment, 16:45–17:15) usa las 5 diademas exactas, sin margen. Los paneles Content (17:20–17:40) y Empowerment/GMV Max (17:50–18:05) siguen sin speakers confirmados — riesgo de necesitar mas mics de los previstos. 1-2 diademas de backup + capacidad del splitter RF (6-7 canales) pedido por correo a AV Express (15/sep), pendiente respuesta.', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o9', label: 'Agenda GBS: RESUELTA — show 12:50–14:30 y networking hasta 16:00. Panel 13:27–13:43: TikTok, L’Oréal, Desigual y Scuffers. Faltan roster final y necesidades exactas para cerrar microfonía.', who: 'GBS · SW: JULIAN' },
  { id: 'o10', label: 'Pantallas GBS: Lottie comparte hoy una versión casi final. Contenido de pantallas: draft 17/sep, version final 20/sep (incluye notas de comfort monitor). Faltan slides de creadores; vídeos se entregan por Google Drive.', who: 'GBS · SW: JULIAN' },
  { id: 'o16', label: 'Agenda TTS: RESUELTA — 16:00–20:30: keynote, 4 paneles ACE, premios, networking y salida. El panel Assortment (16:45–17:15) llega a 5 voces simultáneas: las 5 diademas cubren justo, sin margen. Content y Empowerment/GMV Max siguen sin speakers cerrados.', who: 'TTS · SW: JULIAN' },
  { id: 'o11', label: 'Live Media: hora y duración aún sin cerrar. Laura hace seguimiento con la agencia; cruzar con técnico de Sala Escenario disponible desde 11:00.', who: 'LAURA + LIVE MEDIA · SW: JULIAN' },
  { id: 'o17', label: 'TTS: no hay ensayo onsite ni prueba de micros confirmados. Cerrar si habrá soundcheck con presentador/a y panelistas antes del show.', who: 'TTS (LAURA) · SW: JULIAN' },
  { id: 'o18', label: 'Pablo Meixe: confirmar con Marta/Oscar que las 3 llamadas previas de briefing y guion requeridas por contrato están realizadas o agendadas.', who: 'MARTA + OSCAR · SW: JULIAN' },
  { id: 'o12', label: 'Hoja de Ruta GBS: Pablo llega a las 08:00; ensayo onsite con todos los speakers de 08:00 a 10:00. Oscar ya tiene briefing completo. Marta comparte su email; Julián queda como contacto principal in situ. Falta contacto directo de Oscar, ver o19.', who: 'GBS · SW: JULIAN' },
  { id: 'o19', label: 'Hoja de Ruta MC GBS (Pablo Meixe): falta contacto directo del manager Oscar (solo se tiene el email de Marta) — necesario para cerrar la coordinación del día del evento.', who: 'GBS · SW: JULIAN' },
  { id: 'o13', label: 'Confirmar con cliente TT Shop quien hace de presentador/a en su parte (Olenka cree que no tienen creador famoso, lo hacen ellos mismos — verificar)', who: 'TTS · SW: JULIAN' },
  { id: 'o14', label: 'Música walk-on/walk-off: Lottie compartirá su selección (Bad Bunny y Zara Larsson mencionados). Música, voces en off y cues se integrarán en el documento de agenda/guion; validar enlaces y derechos.', who: 'GBS + TTS · SW: JULIAN' },
  { id: 'o15', label: 'KV / pantalla idle GBS y TTS: pendiente respuesta. Comfort-monitor notes GBS previstas viernes o lunes; validarlas por bloque al recibirlas.', who: 'GBS + TTS · SW: JULIAN' },
]

export const contacts: Contact[] = [
  { initial: 'S', role: 'AV Express · Director', name: 'Salvador', lines: ['salvador@avexpress.tv', '620 95 63 67'] },
  { initial: 'L', role: 'AV Express · Produccion', name: 'Laura', lines: ['ayudantedeproduccion4@avexpress.tv', '669 62 77 96'] },
  { initial: 'T', role: 'Cubensis · Symphony', name: 'Tomas Sequeiros', lines: ['tomas@cubensisproject.com', '654 447 548'] },
  { initial: 'J', role: 'Smartworks · Responsable AV', name: 'Julian Martinez', lines: ['Punto de contacto general'] },
]

export const footerNote = 'Actualizado: activación Smart+ agregada, agenda TTS detallada hasta la salida (20:30), mics TTS confirmados sin margen en Assortment, y fechas de gobo/pantallas cerradas'
