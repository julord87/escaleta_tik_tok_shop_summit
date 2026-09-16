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
  { text: 'GBS', bold: '12:15–16:00 · 220–250 pax' },
  { text: 'TTS', bold: '16:10–20:30 · 280–300 pax' },
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
          { id: 'sp3', time: 'NOCHE', what: 'Cargar agenda + layout GBS/TTS y gobos confirmados en USB, imagen fija', meta: 'AV EXPRESS · SW: JULIAN', variant: 'accent' },
        ],
      },
      {
        room: 'Symphony',
        floor: 'Planta 2 · Cubensis',
        tasks: [
          { id: 'sy1', time: '22:00', what: 'Montaje del juego · totem tactil vertical, backdrop 250×250cm + linoleo 2,5×2,5m', meta: 'CUBENSIS · SW: JULIAN' },
          { id: 'sy2', time: 'POST MONTAJE', what: 'Test con AV: portatil de respaldo (Cubensis) conectado por HDMI al totem', meta: 'CUBENSIS + AV EXPRESS · SW: JULIAN', variant: 'accent' },
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
          { id: 'sc1', time: 'TARDE', what: 'Montaje de 1× totem vertical 50" (decision de produccion; pendiente confirmacion escrita de AV)', meta: 'AV EXPRESS · SW: JULIAN', variant: 'quiet' },
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
          { id: 'tt-live', time: 'TBC', what: 'Directo TikTok Shop · cliente aporta equipo; confirmar señal, audio de programa, posicion y conectividad dedicada', meta: 'TIKTOK SHOP + AV EXPRESS · SW: JULIAN', variant: 'quiet' },
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
    room: 'Sala de Cristal',
    crew: { warn: 'A confirmar con AV Express' },
    items: ['Audiovisual + sonido', '1× totem vertical 50" segun produccion'],
  },
]

export const openItems: OpenItem[] = [
  { id: 'o1', label: 'Sala de Cristal: AV Express debe confirmar por escrito 1× totem 50" (la proforma aun discrepa)', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o2', label: 'Escaleta de montaje: recibir horarios y composicion de equipo AV/construccion por planta', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o3', label: 'Sonido: cerrar hora exacta de llamada del tecnico y validar 5 diademas + 2 micros de mano para TTS', who: 'AV EXPRESS · SW: JULIAN' },
  { id: 'o4', label: 'GBS: reclamar agenda final y definir horario de ensayo Starlight sin choque con keynote', who: 'GBS · SW: JULIAN' },
  { id: 'o5', label: 'Gobo TTS: pedir el texto final y confirmar si el Pack Gobo cubre las dos necesidades', who: 'TTS (LAURA) + AV EXPRESS · SW: JULIAN' },
  { id: 'o6', label: 'Directo TikTok Shop: cerrar formato, equipos, audio y conectividad; el venue solo ofrece Wi-Fi de invitados', who: 'TIKTOK SHOP · SW: JULIAN' },
  { id: 'o7', label: 'Musica: localizar la nota musical del cliente antes de armar las 3 playlists de Spotify', who: 'SW: JULIAN' },
]

export const contacts: Contact[] = [
  { initial: 'S', role: 'AV Express · Director', name: 'Salvador', lines: ['salvador@avexpress.tv', '620 95 63 67'] },
  { initial: 'L', role: 'AV Express · Produccion', name: 'Laura', lines: ['ayudantedeproduccion4@avexpress.tv', '669 62 77 96'] },
  { initial: 'T', role: 'Cubensis · Symphony', name: 'Tomas Sequeiros', lines: ['tomas@cubensisproject.com', '654 447 548'] },
]

export const footerNote = 'Version operativa 16 SEP — desbloquear P0 antes de la reunion de AV del jueves'
