const { useState, useEffect, useRef, useCallback } = React;

// ─── DATA ────────────────────────────────────────────────────────────────────

const equiposData = [
  { id: "EQ_001", nombre: "Micrófonos AKG C414", subcategoria: "audio", descripcion: "Micrófonos de condensador duales y multipatrón versátil, ideal para voces e instrumentos." },
  { id: "EQ_002", nombre: "Micrófono AKG C4500 B-BC", subcategoria: "audio", descripcion: "Condensador de gran diafragma con patrón polar cardioide para voces e instrumentos acústicos." },
  { id: "EQ_003", nombre: "Micrófono AKG C451 B dual", subcategoria: "audio", descripcion: "Condensador de pequeño diafragma, ideal para platillos, guitarras acústicas o violines." },
  { id: "EQ_004", nombre: "Cámara Sony F3", subcategoria: "video", descripcion: "Cámara de cine digital con sensor Super 35mm. Lentes 35-50-85mm de distancia focal fija." },
  { id: "EQ_005", nombre: "Cámara Canon EOS I T7 Rebel", subcategoria: "video", descripcion: "DSLR básica con sensor APS-C para fotografía y video." },
  { id: "EQ_006", nombre: "Cámara Sony F55", subcategoria: "video", descripcion: "Cámara 4K con sensor global shutter profesional para cine y broadcast." },
  { id: "EQ_007", nombre: "Luces Arrisun 12 Plus Head", subcategoria: "iluminacion", descripcion: "Focos LED de 12W, luz intensa y compacta para estudios o exteriores." },
  { id: "EQ_008", nombre: "Luces Kino Celeb 200", subcategoria: "iluminacion", descripcion: "Paneles LED bicolores (3200K-5600K) con difusión cinematográfica para sets profesionales." },
  { id: "EQ_009", nombre: "Luces ARRI Kit 150w-300w-650w", subcategoria: "iluminacion", descripcion: "Kits de luces fresnels para cubrir todas las necesidades de iluminación básica." },
  { id: "EQ_010", nombre: "Teclado Kronos 88 teclas", subcategoria: "instrumentos", descripcion: "Teclado musical profesional con acción martillada y motor de síntesis múltiple." },
  { id: "EQ_011", nombre: "Batería Gretsch Energy", subcategoria: "instrumentos", descripcion: "Batería acústica con hardware completo para creaciones musicales." },
  { id: "EQ_012", nombre: "Grabadora Zoom H6", subcategoria: "audio", descripcion: "Grabadora portátil de 6 entradas XLR con preamps de bajo ruido." },
  { id: "EQ_013", nombre: "Trípode Sachtler FSB 8", subcategoria: "soporte", descripcion: "Trípode con cabeza fluida profesional para cámaras medianas." },
  { id: "EQ_014", nombre: "SteadiCam Ultra", subcategoria: "soporte", descripcion: "Estabilizador profesional para tomas fluidas con cámaras medianas o grandes." },
  { id: "EQ_015", nombre: "Gafas Oculus Quest 2", subcategoria: "vr", descripcion: "Visores VR standalone con pantalla 4K para gaming y experiencias inmersivas." },
  { id: "EQ_016", nombre: "Cámara 360 Insta One", subcategoria: "vr", descripcion: "Cámara para grabar contenido 360° con estabilización FlowState, ideal para VR." },
  { id: "EQ_017", nombre: "Cámara Sony FX9", subcategoria: "video", descripcion: "Cámara de cine 6K Full-Frame con autofocus para cine y documentales." },
  { id: "EQ_018", nombre: "Cámara Canon EOS R6", subcategoria: "video", descripcion: "Mirrorless Full-Frame con 4K, IBIS y AF Dual Pixel CMOS II." },
  { id: "EQ_019", nombre: "Luces GVM 800D RGB", subcategoria: "iluminacion", descripcion: "Paneles LED RGB bicolor con control remoto para efectos creativos." },
  { id: "EQ_020", nombre: "Mesa Sound Devices MixPre 10", subcategoria: "audio", descripcion: "Grabador/mezclador de 10 canales con preamps de bajo ruido." },
];

const espaciosData = [
  { id: "ESP_001", nombre: "Centro Ático", subcategoria: "principal", descripcion: "Edificio de 7 niveles con 8000 m² que aloja laboratorios de cine, TV, video, radio, videojuegos, animación, arquitectura, música, sonido, diseño y creación digital." },
  { id: "ESP_002", nombre: "Lab. Diseño Digital y Arte Electrónico", subcategoria: "diseño", descripcion: "9 salas con workstations NVIDIA Quadro. Adobe Creative Cloud, Rhinoceros, SketchUp Pro y DaVinci Resolve." },
  { id: "ESP_003", nombre: "Lab. de Capacitación", subcategoria: "capacitacion", descripcion: "Espacios para capacitación en software especializado y proyectos de edición." },
  { id: "ESP_004", nombre: "Lab. Foley", subcategoria: "audio", descripcion: "Especializado en captura de foleys, diseño sonoro y sonido para cine con aislamiento acústico y monitoreo surround." },
  { id: "ESP_005", nombre: "Lab. Film Mixing", subcategoria: "audio", descripcion: "Estudio de mezcla con sistema surround MEYER SOUND 5.1, 3 Pro Tools Ultimate HD, AVID DCONTROL con 64 faders." },
  { id: "ESP_006", nombre: "Labs. de Edición de Audio", subcategoria: "audio", descripcion: "Salas individuales con AVID, Pro Tools, Logic Pro X, Ableton y Pure Data." },
  { id: "ESP_007", nombre: "Lab. 421 — Radio", subcategoria: "radio", descripcion: "Laboratorio de radio con consola Sonifex S2, 6 micrófonos ElectroVoice RE27 y cámara Logitech Brio 4K." },
  { id: "ESP_008", nombre: "Lab. 317 — Audio Multiusuario", subcategoria: "audio", descripcion: "Sistema Genelec 5.1, interfaz AUDIENT EVO 16, 6 micrófonos RE27. Optimizado para radio, voces y mezcla surround." },
  { id: "ESP_009", nombre: "Labs. 419 y 426", subcategoria: "audio", descripcion: "15 computadores con live room para ingeniería de sonido y música." },
  { id: "ESP_010", nombre: "Labs. D1 y D2", subcategoria: "audio", descripcion: "Live room para máximo 3 personas. Especializados en grabación de voces e instrumentos." },
  { id: "ESP_011", nombre: "Estudio A", subcategoria: "estudio", descripcion: "Estudio de grabación profesional con 48 canales, D-Command, 6 clósets. Capacidad para 35 músicos." },
  { id: "ESP_012", nombre: "Estudio B", subcategoria: "estudio", descripcion: "Consola SSL Duality y 3 cabinas de grabación. Live room para múltiples músicos." },
  { id: "ESP_013", nombre: "Estudio de TV con Croma", subcategoria: "television", descripcion: "134 m² con Croma Key, ciclorama blanco, parrilla caminable y 3 cámaras Sony HD + 1 robótica." },
  { id: "ESP_014", nombre: "Estudio de TV", subcategoria: "television", descripcion: "185 m² para magazines y dramatizados. 4 cámaras Sony HD + 1 robótica integradas a control master." },
  { id: "ESP_015", nombre: "Lab. Hipermedial", subcategoria: "television", descripcion: "18 computadores con Adobe Premiere y software Inception para automatización de noticias." },
  { id: "ESP_016", nombre: "Sala de Corrección de Color", subcategoria: "postproduccion", descripcion: "Monitor 4K, panel de control de color. Procesos en HD, 2K, 4K y HDR." },
  { id: "ESP_017", nombre: "Lab. Mocap", subcategoria: "tecnologia", descripcion: "Motion Capture Vicon con 8 cámaras, electromiografía y placas de fuerza. Software Shogun Post y Live." },
  { id: "ESP_018", nombre: "Lab. de Digitalización", subcategoria: "archivo", descripcion: "Digitalización de archivos electromagnéticos en formatos Betacam, VHS, cassettes y otros formatos analógicos." },
];

const proyectosData = [
  { id: "PROY_001", nombre: "Laboratorios de Creación Digital con Regiones", categoria: "produccion", subcategoria: "formacion", descripcion: "Talleres itinerantes de creación audiovisual y digital dirigidos a comunidades y estudiantes fuera del campus.", tags: ["audiovisual", "comunidades", "formación", "cultura"], espacios: ["ESP_013", "ESP_003", "ESP_011"], equipos: ["EQ_017", "EQ_018", "EQ_008", "EQ_012", "EQ_013"] },
  { id: "PROY_002", nombre: "Convocatoria de Digitalización y Archivo", categoria: "archivo", subcategoria: "digitalizacion", descripcion: "Preservación y digitalización de material analógico para construir un repositorio de memoria audiovisual.", tags: ["archivo", "digitalización", "memoria", "patrimonio"], espacios: ["ESP_018", "ESP_016", "ESP_010"], equipos: ["EQ_004", "EQ_012", "EQ_020"] },
  { id: "PROY_003", nombre: "Fábrica de Cortos — Ficción Propia", categoria: "produccion", subcategoria: "ficcion", descripcion: "Producción de cortometrajes de ficción propios para participación en festivales nacionales e internacionales.", tags: ["cine", "ficción", "festivales", "cortometraje"], espacios: ["ESP_013", "ESP_014", "ESP_016", "ESP_005"], equipos: ["EQ_006", "EQ_017", "EQ_009", "EQ_007", "EQ_014", "EQ_013"] },
  { id: "PROY_004", nombre: "Experiencias Inmersivas y Videomapping", categoria: "desarrollo", subcategoria: "inmersivo", descripcion: "Instalaciones de videomapping y realidad extendida para museos, festivales y espacios culturales.", tags: ["inmersivo", "VR", "videomapping", "arte", "tecnología"], espacios: ["ESP_001", "ESP_013"], equipos: ["EQ_015", "EQ_016", "EQ_019"] },
  { id: "PROY_005", nombre: "Live Sessions — Grabación Musical de Gran Formato", categoria: "produccion", subcategoria: "musica", descripcion: "Sesiones de grabación en vivo para artistas emergentes con producción audiovisual completa.", tags: ["música", "grabación", "live", "artistas"], espacios: ["ESP_011", "ESP_012", "ESP_016"], equipos: ["EQ_001", "EQ_002", "EQ_010", "EQ_011", "EQ_018"] },
  { id: "PROY_006", nombre: "Virtualización Inteligente de Programas Académicos", categoria: "ambientes_virtuales", subcategoria: "virtualizacion", descripcion: "Diseño de cursos virtuales con recursos audiovisuales y experiencias interactivas para la Javeriana.", tags: ["educación", "virtual", "IA", "contenidos"], espacios: ["ESP_013", "ESP_015", "ESP_003"], equipos: ["EQ_018", "EQ_008", "EQ_020"] },
  { id: "PROY_007", nombre: "Laboratorio de IA Aplicada a Medios y Producción", categoria: "desarrollo", subcategoria: "inteligencia_artificial", descripcion: "Investigación y producción de contenidos con herramientas de inteligencia artificial generativa.", tags: ["IA", "innovación", "medios", "tecnología"], espacios: ["ESP_002", "ESP_003"], equipos: ["EQ_017", "EQ_020"] },
  { id: "PROY_008", nombre: "Desde Ático — Contenidos Documentales y Divulgativos", categoria: "contenidos", subcategoria: "documental", descripcion: "Serie de documentales y contenidos divulgativos sobre temas universitarios y culturales.", tags: ["documental", "contenidos", "divulgación", "universidad"], espacios: ["ESP_013", "ESP_016", "ESP_005"], equipos: ["EQ_017", "EQ_006", "EQ_008", "EQ_012"] },
  { id: "PROY_009", nombre: "Producción de Animación y Motion Capture", categoria: "desarrollo", subcategoria: "animacion", descripcion: "Proyectos de animación 3D y captura de movimiento para videojuegos, cine y arte digital.", tags: ["animación", "mocap", "3D", "videojuegos"], espacios: ["ESP_017", "ESP_002"], equipos: ["EQ_015", "EQ_016"] },
  { id: "PROY_010", nombre: "Ecosistema de Radio y Podcast del Centro Ático", categoria: "contenidos", subcategoria: "radio", descripcion: "Producción de programas de radio y podcasts especializados con distribución en plataformas digitales.", tags: ["radio", "podcast", "audio", "digital"], espacios: ["ESP_007", "ESP_008"], equipos: ["EQ_001", "EQ_002", "EQ_020"] },
  { id: "PROY_011", nombre: "Transmisión Multicámara de Eventos Institucionales", categoria: "produccion", subcategoria: "transmision", descripcion: "Cobertura en vivo de eventos académicos y culturales con producción multicámara profesional.", tags: ["transmisión", "live", "eventos", "multicámara"], espacios: ["ESP_014", "ESP_015"], equipos: ["EQ_018", "EQ_006", "EQ_019", "EQ_013"] },
  { id: "PROY_012", nombre: "Especiales Web y Plataformas Digitales Propias", categoria: "desarrollo", subcategoria: "web", descripcion: "Desarrollo de plataformas digitales, webdocs y experiencias interactivas para comunicación institucional.", tags: ["web", "digital", "plataforma", "interactivo"], espacios: ["ESP_002", "ESP_003"], equipos: ["EQ_018", "EQ_016"] },
  { id: "PROY_013", nombre: "Plan de Formación Docente en Tecnología y Producción", categoria: "formacion", subcategoria: "docente", descripcion: "Capacitaciones técnicas y creativas para docentes en herramientas de producción y medios digitales.", tags: ["formación", "docente", "tecnología", "capacitación"], espacios: ["ESP_003", "ESP_015"], equipos: ["EQ_018", "EQ_020"] },
  { id: "PROY_014", nombre: "Observatorio de Datos y Cultura Digital Universitaria", categoria: "inteligencia_negocio", subcategoria: "datos", descripcion: "Análisis de datos y tendencias sobre consumo cultural y digital en la comunidad universitaria.", tags: ["datos", "cultura", "observatorio", "análisis"], espacios: ["ESP_002", "ESP_015"], equipos: ["EQ_018"] },
  { id: "PROY_015", nombre: "Producción Sonora para Cine — Foley y Diseño de Sonido", categoria: "produccion", subcategoria: "sonido", descripcion: "Diseño sonoro profesional y grabación de foleys para producciones cinematográficas propias y externas.", tags: ["sonido", "foley", "cine", "diseño sonido"], espacios: ["ESP_004", "ESP_005"], equipos: ["EQ_001", "EQ_002", "EQ_003", "EQ_020"] },
  { id: "PROY_016", nombre: "Semillero de Fotografía para Cine", categoria: "formacion", subcategoria: "fotografia", descripcion: "Programa formativo en fotografía cinematográfica para estudiantes y realizadores emergentes.", tags: ["fotografía", "cine", "formación", "cámara"], espacios: ["ESP_013", "ESP_016"], equipos: ["EQ_004", "EQ_006", "EQ_009", "EQ_013"] },
  { id: "PROY_017", nombre: "Sistema de Identidad Visual para Proyectos Ático", categoria: "contenidos", subcategoria: "diseno_grafico", descripcion: "Diseño de sistemas de identidad visual, branding y materiales gráficos para proyectos del Centro.", tags: ["diseño", "branding", "identidad", "gráfico"], espacios: ["ESP_002"], equipos: ["EQ_019"] },
  { id: "PROY_018", nombre: "Motion Graphics y Animación para Contenidos Educativos", categoria: "produccion", subcategoria: "animacion_2d", descripcion: "Producción de motion graphics y animación 2D para contenidos educativos y de divulgación.", tags: ["motion", "animación", "educación", "gráfico"], espacios: ["ESP_002", "ESP_003"], equipos: ["EQ_018", "EQ_019"] },
  { id: "PROY_019", nombre: "Convocatoria de Producción Musical Universitaria", categoria: "produccion", subcategoria: "musica", descripcion: "Convocatoria abierta para producir y grabar proyectos musicales de artistas de la comunidad universitaria.", tags: ["música", "convocatoria", "producción", "artistas"], espacios: ["ESP_011", "ESP_012"], equipos: ["EQ_010", "EQ_011", "EQ_001", "EQ_002"] },
  { id: "PROY_020", nombre: "Producción de Videoclips y Contenido Musical Visual", categoria: "produccion", subcategoria: "videoclip", descripcion: "Producción de videoclips y contenido audiovisual para artistas y sellos discográficos.", tags: ["videoclip", "música", "visual", "artistas"], espacios: ["ESP_013", "ESP_014", "ESP_016"], equipos: ["EQ_017", "EQ_018", "EQ_008", "EQ_014"] },
];

const talentoSample = (window.talentoData || []).map(item => ({
  id: item.id_atico || item.id || item.numero,
  ...item,
}));

// ─── COLOR MAP ────────────────────────────────────────────────────────────────
const COLORS = {
  proyecto: "#00FF94",
  espacio: "#FF6B35",
  equipo: "#00C2FF",
  talento: "#FF3CAC",
  audio: "#A78BFA",
  video: "#60A5FA",
  iluminacion: "#FCD34D",
  instrumentos: "#34D399",
  soporte: "#F87171",
  vr: "#818CF8",
};

const CAT_COLORS = {
  produccion: "#00FF94",
  archivo: "#FF6B35",
  desarrollo: "#00C2FF",
  contenidos: "#FF3CAC",
  formacion: "#FCD34D",
  ambientes_virtuales: "#A78BFA",
  inteligencia_negocio: "#34D399",
};

const TALENTO_BY_CATEGORY = {
  produccion: ["ID_ATICO_PRO_001", "ID_ATICO_PRO_003", "ID_ATICO_PRO_005"],
  archivo: ["ID_ATICO_PRO_002", "ID_ATICO_PRO_003"],
  desarrollo: ["ID_ATICO_AV_001", "ID_ATICO_PRO_001", "ID_ATICO_CONT_002"],
  contenidos: ["ID_ATICO_CONT_001", "ID_ATICO_CONT_002", "ID_ATICO_CONT_003"],
  formacion: ["ID_ATICO_PRO_002", "ID_ATICO_CONT_003", "ID_ATICO_AV_001"],
  ambientes_virtuales: ["ID_ATICO_AV_001", "ID_ATICO_PRO_001"],
  inteligencia_negocio: ["ID_ATICO_CONT_001", "ID_ATICO_AV_001"],
};

function resolveProjectTalent(item) {
  const ids = item.talento || TALENTO_BY_CATEGORY[item.categoria] || [];
  return ids.map(id => talentoSample.find(t => t.id === id)).filter(Boolean);
}

// ─── COMPONENT: INTRO ANIMATION ──────────────────────────────────────────────
function IntroAnimation({ onFinish }) {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 120; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 2 + 0.5,
        color: [COLORS.proyecto, COLORS.equipo, COLORS.espacio, COLORS.talento][Math.floor(Math.random() * 4)],
        opacity: Math.random(),
      });
    }

    let t = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2, cy = canvas.height / 2;
      const nodes = [
        { x: cx, y: cy, r: 18, c: COLORS.proyecto },
        { x: cx + 180 * Math.cos(t * 0.3), y: cy + 100 * Math.sin(t * 0.3), r: 10, c: COLORS.equipo },
        { x: cx - 180 * Math.cos(t * 0.2), y: cy - 80 * Math.sin(t * 0.4), r: 12, c: COLORS.espacio },
        { x: cx + 120 * Math.cos(t * 0.5 + 2), y: cy + 140 * Math.sin(t * 0.25 + 1), r: 8, c: COLORS.talento },
        { x: cx - 100 * Math.cos(t * 0.35 + 1), y: cy + 160 * Math.sin(t * 0.3 + 2), r: 9, c: COLORS.proyecto },
        { x: cx + 200 * Math.cos(t * 0.22 + 3), y: cy - 120 * Math.sin(t * 0.4 + 1), r: 7, c: COLORS.equipo },
      ];

      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (i === j) return;
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist < 280) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dist / 280)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      nodes.forEach(n => {
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
        grd.addColorStop(0, n.c + "FF");
        grd.addColorStop(1, n.c + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.c;
        ctx.fill();
      });

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 80).toString(16).padStart(2, "0");
        ctx.fill();
      });

      t += 0.012;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    setTimeout(() => setPhase(1), 400);
    setTimeout(() => setPhase(2), 1600);
    setTimeout(() => setPhase(3), 2800);
    setTimeout(() => { cancelAnimationFrame(animRef.current); onFinish(); }, 4200);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
      <div style={{ position: "relative", textAlign: "center", pointerEvents: "none" }}>
        <div style={{
          fontSize: "clamp(48px, 8vw, 96px)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, #00FF94, #00C2FF, #FF3CAC)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>ÁTICO</div>
        <div style={{
          fontSize: "clamp(14px, 2vw, 20px)",
          fontFamily: "'DM Mono', monospace",
          color: "#ffffff99",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginTop: 8,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}>Centro de Convergencia Creativa</div>
      </div>
    </div>
  );
}

// ─── COMPONENT: 3D GRAPH ─────────────────────────────────────────────────────
function Graph3D({ activeSection, searchQuery, zoom, onZoomChange, onNodeClick }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ rotX: 0.3, rotY: 0.4, dragging: false, moved: false, lastX: 0, lastY: 0, autoRot: true, zoom: zoom || 1 });
  const animRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const projectedRef = useRef([]);

  useEffect(() => {
    const sampleEspacios = espaciosData.slice(0, 8);
    const sampleEquipos = equiposData.slice(0, 10);
    const sampleTalento = talentoSample.slice(0, 8);
    const sampleProyectos = proyectosData.slice(0, 12);

    const nodes = [];
    const spread = 320;

    sampleProyectos.forEach((p, i) => {
      const angle = (i / sampleProyectos.length) * Math.PI * 2;
      const r = 100 + Math.random() * 60;
      nodes.push({ id: p.id, label: p.nombre.substring(0, 22) + "…", type: "proyecto", color: CAT_COLORS[p.categoria] || COLORS.proyecto, x: Math.cos(angle) * r, y: (Math.random() - 0.5) * 80, z: Math.sin(angle) * r, data: p, size: 16 });
    });

    sampleEspacios.forEach((e, i) => {
      const angle = (i / sampleEspacios.length) * Math.PI * 2 + 0.3;
      const r = 200 + Math.random() * 80;
      nodes.push({ id: e.id, label: e.nombre.substring(0, 20), type: "espacio", color: COLORS.espacio, x: Math.cos(angle) * r, y: (Math.random() - 0.5) * 120, z: Math.sin(angle) * r, data: e, size: 10 });
    });

    sampleEquipos.forEach((e, i) => {
      const angle = (i / sampleEquipos.length) * Math.PI * 2 + 0.8;
      const r = 280 + Math.random() * 60;
      nodes.push({ id: e.id, label: e.nombre.substring(0, 18), type: "equipo", color: COLORS.equipo, x: Math.cos(angle) * r, y: (Math.random() - 0.5) * 100, z: Math.sin(angle) * r, data: e, size: 10 });
    });

    sampleTalento.forEach((t, i) => {
      const angle = (i / sampleTalento.length) * Math.PI * 2 + 1.2;
      const r = 230 + Math.random() * 70;
      nodes.push({ id: t.id, label: t.area, type: "talento", color: COLORS.talento, x: Math.cos(angle) * r, y: (Math.random() - 0.5) * 90, z: Math.sin(angle) * r, data: t, size: 9 });
    });

    const edges = [];
    sampleProyectos.forEach(p => {
      (p.espacios || []).slice(0, 3).forEach(eid => {
        if (nodes.find(n => n.id === eid)) edges.push({ from: p.id, to: eid, color: COLORS.espacio + "55" });
      });
      (p.equipos || []).slice(0, 3).forEach(eid => {
        if (nodes.find(n => n.id === eid)) edges.push({ from: p.id, to: eid, color: COLORS.equipo + "55" });
      });
    });

    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const project = (x, y, z) => {
      const { rotX, rotY, zoom } = stateRef.current;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const x2 = x * cosY + z * sinY;
      const z2 = -x * sinY + z * cosY;
      const y2 = y * cosX - z2 * sinX;
      const z3 = y * sinX + z2 * cosX;
      const fov = 600;
      const scale = (fov / (fov + z3 + 200)) * zoom;
      return { px: canvas.width / 2 + x2 * scale, py: canvas.height / 2 + y2 * scale, scale, z: z3 };
    };

    const draw = () => {
      if (!stateRef.current.dragging && stateRef.current.autoRot) {
        stateRef.current.rotY += 0.003;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const q = searchQuery?.toLowerCase() || "";
      const projected = nodesRef.current.map(n => ({ ...n, ...project(n.x, n.y, n.z) }));
      projected.sort((a, b) => a.z - b.z);
      projectedRef.current = projected;

      edgesRef.current.forEach(e => {
        const fn = projected.find(n => n.id === e.from);
        const tn = projected.find(n => n.id === e.to);
        if (!fn || !tn) return;
        ctx.beginPath();
        ctx.moveTo(fn.px, fn.py);
        ctx.lineTo(tn.px, tn.py);
        ctx.strokeStyle = e.color;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      });

      projected.forEach(n => {
        const isActive = activeSection === "all" || activeSection === n.type + "s" || !activeSection;
        const isMatch = !q || n.label.toLowerCase().includes(q) || n.data?.descripcion?.toLowerCase().includes(q);
        const alpha = (!isMatch && q) ? 0.12 : (isActive ? 1 : 0.25);
        const r = n.size * n.scale * (isMatch && q ? 1.6 : 1);

        const grd = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, r * 3);
        grd.addColorStop(0, n.color + Math.round(alpha * 220).toString(16).padStart(2, "0"));
        grd.addColorStop(1, n.color + "00");
        ctx.beginPath();
        ctx.arc(n.px, n.py, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        if ((n.type === "proyecto" || n.scale > 0.8) && isActive) {
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.85})`;
          const fontSize = n.type === "proyecto" ? Math.max(11, 12 * n.scale) : Math.max(9, 9 * n.scale);
          ctx.font = `${fontSize}px 'DM Mono', monospace`;
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.px, n.py + r + fontSize * 1.1);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    const handleDown = e => {
      const touch = e.touches?.[0];
      stateRef.current.dragging = true;
      stateRef.current.moved = false;
      stateRef.current.autoRot = false;
      stateRef.current.lastX = e.clientX || touch?.clientX;
      stateRef.current.lastY = e.clientY || touch?.clientY;
    };

    const handleUp = e => {
      if (!stateRef.current.dragging) return;
      stateRef.current.dragging = false;
      if (stateRef.current.moved) return;
      const touch = e.touches?.[0] || e.changedTouches?.[0];
      const x = (e.clientX || touch?.clientX) - canvas.getBoundingClientRect().left;
      const y = (e.clientY || touch?.clientY) - canvas.getBoundingClientRect().top;
      const node = projectedRef.current.slice().reverse().find(n => {
        const r = n.size * n.scale;
        return Math.hypot(n.px - x, n.py - y) <= Math.max(16, r + 6);
      });
      if (node && onNodeClick) {
        onNodeClick(node.data, node.type);
      }
    };

    const handleMove = e => {
      if (!stateRef.current.dragging) return;
      const touch = e.touches?.[0];
      const cx = e.clientX || touch?.clientX;
      const cy = e.clientY || touch?.clientY;
      const dx = cx - stateRef.current.lastX;
      const dy = cy - stateRef.current.lastY;
      if (Math.hypot(dx, dy) > 2) stateRef.current.moved = true;
      stateRef.current.rotY += dx * 0.007;
      stateRef.current.rotX += dy * 0.007;
      stateRef.current.lastX = cx;
      stateRef.current.lastY = cy;
    };

    const handleWheel = e => {
      const nextZoom = Math.max(0.4, Math.min(3, stateRef.current.zoom - e.deltaY * 0.001));
      stateRef.current.zoom = nextZoom;
      if (onZoomChange) onZoomChange(nextZoom);
    };

    draw();

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("touchstart", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("touchstart", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [activeSection, searchQuery, onNodeClick, onZoomChange]);

  useEffect(() => {
    if (typeof zoom === "number") {
      stateRef.current.zoom = zoom;
    }
  }, [zoom]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "grab" }} />;
}

// ─── COMPONENT: DETAIL PANEL ─────────────────────────────────────────────────
function DetailPanel({ item, type, onClose }) {
  if (!item) return null;
  const color = type === "proyecto" ? (CAT_COLORS[item.categoria] || COLORS.proyecto) : type === "espacio" ? COLORS.espacio : type === "equipo" ? COLORS.equipo : COLORS.talento;
  const relatedSpaces = item.espacios?.map(id => espaciosData.find(s => s.id === id)).filter(Boolean) || [];
  const relatedEquipos = item.equipos?.map(id => equiposData.find(e => e.id === id)).filter(Boolean) || [];
  const relatedTalento = type === "proyecto" ? resolveProjectTalent(item) : [];

  return (
    <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "min(420px, 100vw)", background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", borderLeft: `1px solid ${color}33`, zIndex: 50, overflowY: "auto", padding: 32 }}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#fff6", fontSize: 24, cursor: "pointer" }}>✕</button>
      <div style={{ width: 40, height: 3, background: color, marginBottom: 24, borderRadius: 2 }} />
      <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>{type}</div>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 16 }}>{item.nombre || item.perfil || item.area}</h2>
      {item.descripcion && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ffffff99", lineHeight: 1.7, marginBottom: 24 }}>{item.descripcion}</p>}
      {item.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {item.tags.map(t => <span key={t} style={{ padding: "4px 12px", borderRadius: 20, border: `1px solid ${color}55`, color: color, fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{t}</span>)}
        </div>
      )}
      {item.subcategoria && <div style={{ color: "#ffffff44", fontSize: 12, fontFamily: "'DM Mono', monospace", marginBottom: 24 }}>CATEGORÍA: {item.subcategoria.toUpperCase()}</div>}

      {type === "talento" && (
        <div style={{ marginBottom: 24, display: "grid", gap: 14 }}>
          {[
            ["ID Ático", item.id_atico || item.id],
            ["Número", item.numero],
            ["Área", item.area],
            ["Rol principal", item.rol_principal],
            ["Tiempo en Ático", item.tiempo_en_atico],
            ["Actividades frecuentes", item.actividades_frecuentes],
            ["Proyectos frecuentes", item.proyectos_frecuentes],
            ["Proyectos positivos", item.proyectos_positivos],
            ["Equipos utilizados", item.equipos_utilizados],
            ["Software / tecnologías", item.software_tecnologias],
            ["Espacios de trabajo", item.espacios_trabajo],
            ["Proyectos preferidos", item.proyectos_preferidos],
            ["Áreas a explorar", item.areas_explorar],
            ["Otras habilidades", item.otras_habilidades],
            ["Proyectos de mayor aporte", item.proyectos_mayor_aporte],
            ["Nuevos proyectos", item.nuevos_proyectos],
            ["Característica destacada", item.caracteristica_destacada],
            ["Perfil en 3 palabras", item.perfil_tres_palabras],
          ].filter(([_, value]) => value).map(([label, value]) => (
            <div key={label}>
              <div style={{ fontSize: 11, color: "#ffffff44", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 14, color: "#ffffffcc", lineHeight: 1.7 }}>{value}</div>
            </div>
          ))}
        </div>
      )}

      {type === "proyecto" && (
        <>
          {relatedSpaces.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#ffffff66", fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Espacios necesarios</div>
              <div style={{ display: "grid", gap: 10 }}>
                {relatedSpaces.map(space => (
                  <div key={space.id} style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.espacio}22`, color: "#fff" }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{space.nombre}</div>
                    <div style={{ fontSize: 12, color: "#ffffff88", marginTop: 4 }}>{space.descripcion}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedEquipos.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: "#ffffff66", fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Equipos necesarios</div>
              <div style={{ display: "grid", gap: 10 }}>
                {relatedEquipos.map(eq => (
                  <div key={eq.id} style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.equipo}22`, color: "#fff" }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{eq.nombre}</div>
                    <div style={{ fontSize: 12, color: "#ffffff88", marginTop: 4 }}>{eq.descripcion}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedTalento.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: "#ffffff66", fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>Talento humano necesario</div>
              <div style={{ display: "grid", gap: 10 }}>
                {relatedTalento.map(t => (
                  <div key={t.id} style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.talento}22`, color: "#fff" }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{t.area}</div>
                    <div style={{ fontSize: 12, color: "#ffffff88", marginTop: 4 }}>{t.perfil}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => window.open(`mailto:atico@javeriana.edu?subject=${encodeURIComponent("Iniciar proyecto con Ático: " + item.nombre)}&body=${encodeURIComponent("Estoy interesado en iniciar este proyecto con el Centro Ático. Por favor contáctenme para avanzar.")}`)}
            style={{ width: "100%", padding: "16px 18px", borderRadius: 16, background: COLORS.proyecto, border: "none", color: "#08171f", fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>
            Iniciar proyecto con Ático
          </button>
          <div style={{ fontSize: 12, color: "#ffffff66", fontFamily: "'DM Mono', monospace", lineHeight: 1.5 }}>
            Haz clic para escribir a Ático y comenzar el proceso de conexión del proyecto.
          </div>
        </>
      )}

      {item.palabras && <div style={{ marginTop: 16, padding: 16, background: color + "11", borderRadius: 12, border: `1px solid ${color}22`, color: "#ffffffbb", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>&quot;{item.palabras}&quot;</div>}
    </div>
  );
}

// ─── COMPONENT: CARDS GRID ───────────────────────────────────────────────────
function CardsGrid({ data, type, color, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16, padding: "0 0 32px" }}>
      {data.map(item => {
        const getRolDescription = () => {
          if (type === "talento") {
            const rol = item.rol_principal;
            let short = rol;
            
            // Si el rol es muy corto o genérico, usar actividades frecuentes
            if (!rol || rol.length < 15 || rol === "Facilitador" || rol === "Técnico") {
              short = item.actividades_frecuentes || item.area;
            }
            
            // Toma solo la primera línea (hasta el primer punto)
            if (short && short.includes('.')) {
              short = short.split('.')[0];
            }
            
            // Limita a 75 caracteres máximo
            if (short && short.length > 75) {
              short = short.substring(0, 72).trim() + '...';
            }
            
            return short || item.area || 'Profesional';
          }
          return item.rol_principal || item.descripcion || "";
        };
        const getDescription = () => {
          if (type === "talento") {
            return item.caracteristica_destacada || item.actividades_frecuentes?.substring(0, 60) || "";
          }
          return item.descripcion || "";
        };
        const getSecondaryInfo = () => {
          if (type === "talento") {
            const espacios = item.espacios_trabajo?.split(';')[0]?.trim();
            return `${item.area}${espacios ? ' • ' + espacios : ''}`;
          }
          return item.area || "";
        };
        return (
          <div key={item.id} onClick={() => onSelect(item, type)}
            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}33`, borderRadius: 16, padding: 20, cursor: "pointer", transition: "all 0.2s ease", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => { e.currentTarget.style.background = color + "15"; e.currentTarget.style.borderColor = color + "88"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = color + "33"; }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, marginBottom: 12 }} />
            {type === "talento" ? (
              <>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: color + "99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>{item.area}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", lineHeight: 1.3, marginBottom: 10 }}>{getRolDescription()}</div>
                <div style={{ fontSize: 10, color: "#ffffff66", fontFamily: "'DM Mono', monospace", lineHeight: 1.4, marginBottom: 10 }}>{getSecondaryInfo()}</div>
                <div style={{ fontSize: 12, color: "#ffffff88", lineHeight: 1.5 }}>{getDescription()}</div>
              </>
            ) : (
              <>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", lineHeight: 1.4, marginBottom: 8 }}>{item.perfil || item.nombre || item.area}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ffffff66", lineHeight: 1.6 }}>{(item.rol_principal || item.descripcion || item.palabras || item.proyectos_frecuentes || item.actividades_frecuentes || "").substring(0, 90)}…</div>
                {item.area && item.perfil && <div style={{ marginTop: 12, fontSize: 10, fontFamily: "'DM Mono', monospace", color: color + "99", letterSpacing: "0.15em" }}>{item.area.toUpperCase()}</div>}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function AticoPlatform() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [graphZoom, setGraphZoom] = useState(1);

  const navItems = [
    { key: "espacios", label: "Espacios", color: COLORS.espacio, count: espaciosData.length },
    { key: "equipos", label: "Equipos", color: COLORS.equipo, count: equiposData.length },
    { key: "talento", label: "Talento Humano", color: COLORS.talento, count: talentoSample.length },
    { key: "proyectos", label: "Posibles Proyectos", color: COLORS.proyecto, count: proyectosData.length },
  ];

  const handleZoom = (direction) => {
    setGraphZoom(prev => {
      const newZoom = direction === "in" ? Math.min(3, prev + 0.3) : Math.max(0.4, prev - 0.3);
      return newZoom;
    });
  };

  const handleNodeClick = useCallback((item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", fontFamily: "'DM Sans', sans-serif", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}

      {/* HEADER */}
      <div style={{ padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={() => setActiveSection(null)} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #00FF94, #00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ÁTICO</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#ffffff44", letterSpacing: "0.2em" }}>JAVERIANA</div>
        </button>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {navItems.map(n => (
            <button key={n.key} onClick={() => setActiveSection(prev => prev === n.key ? null : n.key)}
              style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${activeSection === n.key ? n.color : n.color + "44"}`, background: activeSection === n.key ? n.color + "22" : "transparent", color: activeSection === n.key ? n.color : "#ffffff66", fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.2s" }}>
              {n.label} <span style={{ opacity: 0.6 }}>{n.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {!activeSection ? (
          <>
            {/* HERO SECTION */}
            <div style={{ padding: "20px 32px", background: "linear-gradient(180deg, rgba(0,255,148,0.05) 0%, transparent 100%)", borderBottom: "1px solid rgba(0,255,148,0.1)" }}>
              <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 14px)", fontFamily: "'DM Mono', monospace", color: "#ffffff44", letterSpacing: "0.3em", marginBottom: 12, textTransform: "uppercase" }}>
                  Centro de Convergencia Creativa · Universidad Javeriana
                </div>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>
                  Visualiza los espacios, equipos y proyectos
                </h1>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ffffff66", marginBottom: 0, lineHeight: 1.6 }}>
                  Arrastra para rotar • Scroll para zoom • Usa botones + y − para controlar
                </p>
              </div>
            </div>

            {/* GRAPH CONTAINER */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <Graph3D activeSection={activeSection} searchQuery={searchQuery} zoom={graphZoom} onZoomChange={setGraphZoom} onNodeClick={handleNodeClick} />
              
              {/* ZOOM CONTROLS */}
              <div style={{ position: "absolute", bottom: 24, right: 32, display: "flex", flexDirection: "column", gap: 8, zIndex: 20 }}>
                <button onClick={() => handleZoom("in")} style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.proyecto + "22", border: `2px solid ${COLORS.proyecto}66`, color: COLORS.proyecto, fontSize: 20, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={e => { e.target.style.background = COLORS.proyecto + "44"; e.target.style.borderColor = COLORS.proyecto; }} onMouseLeave={e => { e.target.style.background = COLORS.proyecto + "22"; e.target.style.borderColor = COLORS.proyecto + "66"; }}>+</button>
                <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#ffffff66", textAlign: "center", width: 44 }}>{graphZoom.toFixed(1)}x</div>
                <button onClick={() => handleZoom("out")} style={{ width: 44, height: 44, borderRadius: 12, background: COLORS.proyecto + "22", border: `2px solid ${COLORS.proyecto}66`, color: COLORS.proyecto, fontSize: 20, fontWeight: "bold", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={e => { e.target.style.background = COLORS.proyecto + "44"; e.target.style.borderColor = COLORS.proyecto; }} onMouseLeave={e => { e.target.style.background = COLORS.proyecto + "22"; e.target.style.borderColor = COLORS.proyecto + "66"; }}>−</button>
              </div>

              {/* LEGEND */}
              <div style={{ position: "absolute", bottom: 24, left: 32, display: "flex", gap: 16, alignItems: "center", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", padding: "12px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", zIndex: 20 }}>
                {[["Proyectos", COLORS.proyecto], ["Espacios", COLORS.espacio], ["Equipos", COLORS.equipo], ["Talento", COLORS.talento]].map(([l, c]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, color: "#ffffff66", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
                    {l.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* SECTION VIEW */
          <div style={{ flex: 1, overflowY: "auto", paddingLeft: 32, paddingRight: selectedItem ? "460px" : 32, paddingTop: 32, paddingBottom: 32 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              {/* Section Header */}
              <div style={{ marginBottom: 32 }}>
                {(() => {
                  const nav = navItems.find(n => n.key === activeSection);
                  return (<>
                    <div style={{ width: 40, height: 3, background: nav.color, borderRadius: 2, marginBottom: 16 }} />
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", letterSpacing: "-0.02em" }}>{nav.label}</h2>
                    <div style={{ color: "#ffffff44", fontFamily: "'DM Mono', monospace", fontSize: 12, marginTop: 8 }}>{nav.count} disponibles · Haz clic para ver detalles</div>
                  </>);
                })()}
              </div>

              {activeSection === "espacios" && <CardsGrid data={espaciosData} type="espacio" color={COLORS.espacio} onSelect={(item, type) => { setSelectedItem(item); setSelectedType(type); }} />}
              {activeSection === "equipos" && <CardsGrid data={equiposData} type="equipo" color={COLORS.equipo} onSelect={(item, type) => { setSelectedItem(item); setSelectedType(type); }} />}
              {activeSection === "talento" && <CardsGrid data={talentoSample} type="talento" color={COLORS.talento} onSelect={(item, type) => { setSelectedItem(item); setSelectedType(type); }} />}
              {activeSection === "proyectos" && (
                <>
                  <div style={{ marginBottom: 20, padding: "14px 20px", background: COLORS.proyecto + "11", borderRadius: 12, border: `1px solid ${COLORS.proyecto}33`, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#ffffff88" }}>
                    Estos son proyectos posibles que conectan los espacios, equipos y talento del Centro Ático.
                  </div>
                  <CardsGrid data={proyectosData} type="proyecto" color={COLORS.proyecto} onSelect={(item, type) => { setSelectedItem(item); setSelectedType(type); }} />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DETAIL PANEL */}
      {selectedItem && <DetailPanel item={selectedItem} type={selectedType} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AticoPlatform />);
