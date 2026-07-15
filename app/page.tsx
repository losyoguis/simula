"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Category =
  | "Espacio"
  | "Tierra"
  | "Física"
  | "Tecnología"
  | "Biología"
  | "Matemáticas"
  | "Transporte"
  | "Emergencias"
  | "Finanzas"
  | "Sociedad";

type Simulator = {
  id: string;
  title: string;
  category: Category;
  description: string;
  href: string;
  tags: string[];
};

const categoryMeta: Record<Category, { glyph: string; description: string }> = {
  Espacio: { glyph: "◉", description: "Planetas, estrellas y misiones" },
  Tierra: { glyph: "⌁", description: "Clima, océanos y territorio" },
  Física: { glyph: "∿", description: "Fuerzas, fluidos y partículas" },
  Tecnología: { glyph: "⌘", description: "Circuitos, código e inteligencia artificial" },
  Biología: { glyph: "⌬", description: "Vida, moléculas y anatomía" },
  Matemáticas: { glyph: "∑", description: "Geometría, datos y algoritmos" },
  Transporte: { glyph: "↗", description: "Vuelo, tráfico y navegación" },
  Emergencias: { glyph: "△", description: "Riesgos, crisis y respuesta" },
  Finanzas: { glyph: "↟", description: "Mercados, inversión y planificación" },
  Sociedad: { glyph: "◎", description: "Decisiones, confianza y sistemas" },
};

declare global {
  interface Window {
    __SIMULA_ASSET_BASE__?: string;
  }
}

const imagePath = (filename: string) => {
  const base = typeof window === "undefined" ? "" : (window.__SIMULA_ASSET_BASE__ ?? "");
  return `${base}images/${filename}`;
};

const simulators: Simulator[] = [
  { id: "nasa-solar", title: "NASA Eyes Solar System", category: "Espacio", description: "Explora el sistema solar y las misiones de NASA en un entorno 3D.", href: "https://eyes.nasa.gov/apps/solar-system/", tags: ["3D", "NASA"] },
  { id: "nasa-exo", title: "NASA Eyes Exoplanets", category: "Espacio", description: "Viaja por miles de mundos descubiertos fuera del sistema solar.", href: "https://eyes.nasa.gov/apps/exo/", tags: ["Datos reales", "3D"] },
  { id: "nasa-asteroids", title: "NASA Eyes Asteroids", category: "Espacio", description: "Observa órbitas y aproximaciones de asteroides cercanos.", href: "https://eyes.nasa.gov/apps/asteroids/", tags: ["Órbitas", "Tiempo real"] },
  { id: "curiosity", title: "Experience Curiosity", category: "Espacio", description: "Conduce el rover Curiosity y manipula sus instrumentos en Marte.", href: "https://eyes.nasa.gov/apps/curiosity/", tags: ["Rover", "3D"] },
  { id: "stellarium", title: "Stellarium Web", category: "Espacio", description: "Planetario completo que reproduce el cielo desde cualquier lugar.", href: "https://stellarium-web.org/", tags: ["Planetario", "En vivo"] },
  { id: "solar-scope", title: "Solar System Scope", category: "Espacio", description: "Modelo orbital navegable con escalas, tiempo y constelaciones.", href: "https://www.solarsystemscope.com/", tags: ["Órbitas", "Interactivo"] },
  { id: "stars", title: "100,000 Stars", category: "Espacio", description: "Un viaje WebGL desde el Sol hasta la estructura de la Vía Láctea.", href: "https://stars.chromeexperiments.com/", tags: ["WebGL", "Inmersivo"] },
  { id: "asterank", title: "Asterank 3D", category: "Espacio", description: "Miles de asteroides representados en una escena orbital 3D.", href: "https://www.asterank.com/3d/", tags: ["Datos", "WebGL"] },

  { id: "earth-null", title: "earth.nullschool", category: "Tierra", description: "Vientos, océanos, temperatura y contaminantes sobre un globo vivo.", href: "https://earth.nullschool.net/", tags: ["Datos en vivo", "Globo"] },
  { id: "zoom-earth", title: "Zoom Earth", category: "Tierra", description: "Sigue nubes, huracanes, incendios y precipitaciones casi en directo.", href: "https://zoom.earth/", tags: ["Satélite", "En vivo"] },
  { id: "worldview", title: "NASA Worldview", category: "Tierra", description: "Compara capas satelitales y fenómenos ambientales globales.", href: "https://worldview.earthdata.nasa.gov/", tags: ["NASA", "Satélite"] },
  { id: "windy", title: "Windy", category: "Tierra", description: "Visualiza y compara modelos meteorológicos de todo el planeta.", href: "https://www.windy.com/", tags: ["Clima", "Pronóstico"] },
  { id: "enroads", title: "En-ROADS", category: "Tierra", description: "Cambia políticas y observa sus efectos climáticos hasta 2100.", href: "https://www.climateinteractive.org/en-roads/", tags: ["Política", "Escenarios"] },
  { id: "croads", title: "C-ROADS", category: "Tierra", description: "Prueba compromisos de emisiones por regiones y países.", href: "https://www.climateinteractive.org/c-roads", tags: ["Clima", "Sistemas"] },
  { id: "usgs", title: "USGS Earthquake Map", category: "Tierra", description: "Terremotos mundiales representados por magnitud y profundidad.", href: "https://earthquake.usgs.gov/earthquakes/map/", tags: ["Sismos", "En vivo"] },
  { id: "forest-watch", title: "Global Forest Watch", category: "Tierra", description: "Observa deforestación, incendios y cambios de cobertura forestal.", href: "https://www.globalforestwatch.org/map/", tags: ["Bosques", "Satélite"] },

  { id: "falstad", title: "Falstad Circuit Simulator", category: "Física", description: "Construye circuitos y observa la corriente moverse en tiempo real.", href: "https://www.falstad.com/circuit/circuitjs.html", tags: ["Electricidad", "Laboratorio"] },
  { id: "fluid", title: "WebGL Fluid Simulation", category: "Física", description: "Crea fluidos digitales que reaccionan a cada movimiento.", href: "https://paveldogreat.github.io/WebGL-Fluid-Simulation/", tags: ["Fluidos", "WebGL"] },
  { id: "sandspiel", title: "Sandspiel", category: "Física", description: "Combina arena, agua, fuego, hielo y vida en un mundo emergente.", href: "https://sandspiel.club/", tags: ["Partículas", "Creativo"] },
  { id: "pendulum", title: "Double Pendulum", category: "Física", description: "Experimenta con caos, energía y sensibilidad a las condiciones iniciales.", href: "https://www.myphysicslab.com/pendulum/double-pendulum-en.html", tags: ["Caos", "Movimiento"] },
  { id: "collisions", title: "Rigid-Body Collisions", category: "Física", description: "Manipula gravedad, fricción y colisiones de cuerpos rígidos.", href: "https://www.myphysicslab.com/engine2D/collision-en.html", tags: ["Mecánica", "2D"] },

  { id: "wokwi", title: "Wokwi", category: "Tecnología", description: "Programa Arduino, ESP32, sensores y pantallas sin hardware físico.", href: "https://wokwi.com/", tags: ["Arduino", "Código"] },
  { id: "circuitverse", title: "CircuitVerse", category: "Tecnología", description: "Diseña sistemas lógicos digitales y observa su comportamiento.", href: "https://circuitverse.org/simulator", tags: ["Lógica", "Circuitos"] },
  { id: "tensorflow", title: "TensorFlow Playground", category: "Tecnología", description: "Entrena una red neuronal y mira cómo construye sus fronteras.", href: "https://playground.tensorflow.org/", tags: ["IA", "Machine learning"] },
  { id: "teachable", title: "Teachable Machine", category: "Tecnología", description: "Crea un modelo de IA con imágenes, sonidos o movimientos.", href: "https://teachablemachine.withgoogle.com/", tags: ["IA", "Cámara"] },
  { id: "algorithm", title: "Algorithm Visualizer", category: "Tecnología", description: "Sigue la ejecución animada de algoritmos y estructuras de datos.", href: "https://algorithm-visualizer.org/", tags: ["Algoritmos", "Código"] },

  { id: "molview", title: "MolView", category: "Biología", description: "Construye moléculas y examina su geometría tridimensional.", href: "https://molview.org/", tags: ["Moléculas", "3D"] },
  { id: "rcsb", title: "RCSB Mol* Viewer", category: "Biología", description: "Explora proteínas, ADN y estructuras experimentales complejas.", href: "https://www.rcsb.org/3d-view", tags: ["Proteínas", "Ciencia"] },
  { id: "biodigital", title: "BioDigital Human", category: "Biología", description: "Recorre anatomía, enfermedades y tratamientos en un cuerpo 3D.", href: "https://human.biodigital.com/", tags: ["Anatomía", "3D"] },
  { id: "earthviewer", title: "HHMI EarthViewer", category: "Biología", description: "Viaja por 4.500 millones de años de evolución planetaria.", href: "https://media.hhmi.org/biointeractive/earthviewer_web/", tags: ["Evolución", "Tiempo"] },
  { id: "virus", title: "Virus Explorer", category: "Biología", description: "Compara estructuras, genomas y mecanismos de diferentes virus.", href: "https://media.hhmi.org/biointeractive/embed/virus-explorer-embed/index.html", tags: ["Virus", "3D"] },
  { id: "disease", title: "Modeling Disease Spread", category: "Biología", description: "Experimenta con contagio, inmunidad y propagación epidémica.", href: "https://media.hhmi.org/biointeractive/click/modeling-disease-spread/index.html", tags: ["Epidemias", "Modelo"] },
  { id: "eterna", title: "Eterna", category: "Biología", description: "Resuelve plegamientos de ARN y participa en ciencia ciudadana.", href: "https://eternagame.org/", tags: ["ARN", "Juego"] },

  { id: "geogebra", title: "GeoGebra 3D", category: "Matemáticas", description: "Construye superficies, sólidos, vectores y geometría espacial.", href: "https://www.geogebra.org/3d?lang=es", tags: ["Geometría", "3D"] },
  { id: "desmos", title: "Desmos 3D", category: "Matemáticas", description: "Grafica ecuaciones tridimensionales y anímalas con parámetros.", href: "https://www.desmos.com/3d", tags: ["Gráficas", "3D"] },
  { id: "theory", title: "Seeing Theory", category: "Matemáticas", description: "Comprende probabilidad y estadística mediante experimentos visuales.", href: "https://seeing-theory.brown.edu/", tags: ["Estadística", "Visual"] },
  { id: "visualgo", title: "VisuAlgo", category: "Matemáticas", description: "Explora grafos, árboles, recorridos y métodos de ordenamiento.", href: "https://visualgo.net/en", tags: ["Algoritmos", "Animación"] },

  { id: "geofs", title: "GeoFS", category: "Transporte", description: "Vuela por el mundo con terreno satelital, clima y cabinas.", href: "https://www.geo-fs.com/geofs.php", tags: ["Vuelo", "Mundo abierto"] },
  { id: "earth-flight", title: "Google Earth Flight Simulator", category: "Transporte", description: "Pilota sobre paisajes y ciudades fotorealistas en Google Earth.", href: "https://earth.google.com/web/", tags: ["Vuelo", "Fotorealista"] },
  { id: "atc", title: "ATC-SIM", category: "Transporte", description: "Gestiona aproximaciones y despegues desde una torre de control.", href: "https://atc-sim.com/", tags: ["Aviación", "Control"] },
  { id: "slowroads", title: "Slow Roads", category: "Transporte", description: "Conduce por carreteras procedurales con clima y paisajes infinitos.", href: "https://slowroads.io/", tags: ["Conducción", "Procedural"] },
  { id: "shipmap", title: "Shipmap", category: "Transporte", description: "Observa el movimiento del comercio marítimo mundial.", href: "https://www.shipmap.org/", tags: ["Barcos", "Datos"] },

  { id: "stop-disasters", title: "Stop Disasters!", category: "Emergencias", description: "Diseña comunidades resistentes a tsunamis, incendios y terremotos.", href: "https://www.stopdisastersgame.org/", tags: ["Desastres", "Estrategia"] },
  { id: "asteroid-launcher", title: "Asteroid Launcher", category: "Emergencias", description: "Simula impactos, cráteres, ondas y daños sobre ciudades reales.", href: "https://neal.fun/asteroid-launcher/", tags: ["Impacto", "Mapa"] },
  { id: "covid", title: "COVID-19 Simulator", category: "Emergencias", description: "Prueba cómo las interacciones y la prevención alteran un contagio.", href: "https://ncase.me/covid-19/", tags: ["Salud", "Sistemas"] },

  { id: "stax", title: "Build Your Stax", category: "Finanzas", description: "Comprime 20 años de decisiones de inversión en 20 minutos.", href: "https://buildyourstax.com/", tags: ["Inversión", "Juego"] },
  { id: "projectionlab", title: "ProjectionLab", category: "Finanzas", description: "Modela patrimonio, metas, jubilación y futuros financieros.", href: "https://projectionlab.com/", tags: ["Planificación", "Escenarios"] },
  { id: "ficalc", title: "FI Calc", category: "Finanzas", description: "Prueba estrategias de jubilación contra más de un siglo de datos.", href: "https://ficalc.app/", tags: ["Retiro", "Histórico"] },
  { id: "investopedia", title: "Investopedia Simulator", category: "Finanzas", description: "Practica compraventa de acciones con dinero virtual.", href: "https://www.investopedia.com/simulator/", tags: ["Bolsa", "Trading"] },
  { id: "optionstrat", title: "OptionStrat", category: "Finanzas", description: "Visualiza riesgo, beneficio y tiempo en estrategias con opciones.", href: "https://optionstrat.com/", tags: ["Opciones", "Riesgo"] },
  { id: "payback", title: "Payback", category: "Finanzas", description: "Equilibra universidad, trabajo, bienestar y deuda estudiantil.", href: "https://www.timeforpayback.com/", tags: ["Deuda", "Narrativo"] },
  { id: "cme", title: "CME Trading Simulator", category: "Finanzas", description: "Practica futuros y estrategias con datos de mercado reales.", href: "https://www.cmegroup.com/education/practice/about-the-trading-simulator", tags: ["Futuros", "Mercado"] },

  { id: "trust", title: "The Evolution of Trust", category: "Sociedad", description: "Descubre cómo nacen la cooperación, el engaño y la confianza.", href: "https://ncase.me/trust/", tags: ["Decisiones", "Juego"] },
  { id: "polygons", title: "Parable of the Polygons", category: "Sociedad", description: "Observa cómo pequeñas preferencias producen segregación.", href: "https://ncase.me/polygons/", tags: ["Sociedad", "Modelo"] },
  { id: "crowds", title: "Wisdom and Madness of Crowds", category: "Sociedad", description: "Experimenta con redes, conexiones y difusión de ideas.", href: "https://ncase.me/crowds/", tags: ["Redes", "Ideas"] },
  { id: "loopy", title: "LOOPY", category: "Sociedad", description: "Construye modelos causales y observa ciclos de retroalimentación.", href: "https://ncase.me/loopy/", tags: ["Sistemas", "Causalidad"] },
  { id: "journey", title: "Journey 2050", category: "Sociedad", description: "Gestiona agricultura, agua, economía y seguridad alimentaria.", href: "https://www.journey2050.com/2050-games/", tags: ["Agricultura", "Futuro"] },
];

const featuredSimulators = [
  { title: "Sistema Solar 3D", category: "Espacio", description: "Recorre planetas, lunas y misiones con datos reales de NASA.", href: "https://eyes.nasa.gov/apps/solar-system/", image: imagePath("card-solar.png") },
  { title: "Clima en tiempo real", category: "Tierra", description: "Observa viento, temperatura y corrientes sobre un planeta vivo.", href: "https://earth.nullschool.net/", image: imagePath("card-climate.png") },
  { title: "Laboratorio molecular", category: "Biología", description: "Construye moléculas y comprende su estructura en tres dimensiones.", href: "https://molview.org/", image: imagePath("card-molecular.png") },
];

const categories = Object.keys(categoryMeta) as Category[];

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Home() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "Todos">("Todos");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("simula-favorites") ?? "[]") as string[];
        setFavorites(new Set(saved));
      } catch {
        setFavorites(new Set());
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredSimulators = useMemo(() => {
    const term = normalize(query.trim());
    return simulators.filter((simulator) => {
      const matchesCategory = activeCategory === "Todos" || simulator.category === activeCategory;
      const matchesFavorite = !favoritesOnly || favorites.has(simulator.id);
      const haystack = normalize(`${simulator.title} ${simulator.category} ${simulator.description} ${simulator.tags.join(" ")}`);
      return matchesCategory && matchesFavorite && (!term || haystack.includes(term));
    });
  }, [activeCategory, favorites, favoritesOnly, query]);

  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseCategory = (category: Category | "Todos") => {
    setActiveCategory(category);
    setFavoritesOnly(false);
    requestAnimationFrame(scrollToCatalog);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem("simula-favorites", JSON.stringify([...next]));
      } catch {
        // Some browsers restrict storage for file:// pages; favorites still
        // remain available for the current session through React state.
      }
      return next;
    });
  };

  const showFavorites = () => {
    setFavoritesOnly(true);
    setActiveCategory("Todos");
    requestAnimationFrame(scrollToCatalog);
  };

  const surpriseMe = () => {
    const pool = filteredSimulators.length ? filteredSimulators : simulators;
    const simulator = pool[Math.floor(Math.random() * pool.length)];
    window.open(simulator.href, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <header className="site-header" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Simula, inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /><b /></span>
          <span>Simula</span>
        </a>
        <nav className="main-nav" aria-label="Secciones">
          <a className="active" href="#catalogo">Explorar</a>
          <a href="#categorias">Categorías</a>
          <button type="button" onClick={showFavorites}>Favoritos</button>
        </nav>
        <button className="profile-button" type="button" onClick={showFavorites} aria-label={`${favorites.size} simuladores favoritos`}>
          <span aria-hidden="true">☆</span>
          <span className="favorite-count">{favorites.size}</span>
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">La enciclopedia de la simulación</p>
          <h1>Explora.<br />Experimenta.<br />Comprende.</h1>
          <p className="hero-description">Simuladores y simulacros gratuitos para descubrir cómo funciona el mundo.</p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToCatalog}>Explorar simuladores <span aria-hidden="true">↗</span></button>
            <span className="hero-proof"><strong>{simulators.length}</strong> experiencias seleccionadas</span>
          </div>
          <label className="universal-search" role="search">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Buscar simuladores</span>
            <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFavoritesOnly(false)} placeholder="¿Qué quieres simular hoy?" />
            <kbd>⌘ K</kbd>
          </label>
        </div>
        <div className="hero-visual" aria-label="Globo holográfico que conecta áreas de conocimiento">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <img src={imagePath("hero-globe.png")} alt="Planeta holográfico rodeado de datos, moléculas y órbitas" />
          <span className="data-pill pill-one">10 áreas conectadas</span>
          <span className="data-pill pill-two">Acceso gratuito</span>
        </div>
      </section>

      <section className="featured-section" id="destacados" aria-labelledby="featured-title">
        <div className="section-heading compact">
          <div><p className="eyebrow">Empieza por aquí</p><h2 id="featured-title">Simuladores destacados</h2></div>
          <a href="#catalogo">Ver enciclopedia <span aria-hidden="true">→</span></a>
        </div>
        <div className="featured-grid">
          {featuredSimulators.map((simulator) => (
            <a className="featured-card" href={simulator.href} target="_blank" rel="noreferrer" key={simulator.title}>
              <div className="featured-image"><img src={simulator.image} alt="" /><span className="free-badge">Gratis</span></div>
              <div className="featured-card-body"><span className="category-tag">{simulator.category}</span><span className="card-arrow" aria-hidden="true">→</span><h3>{simulator.title}</h3><p>{simulator.description}</p></div>
            </a>
          ))}
        </div>
      </section>

      <section className="category-section" id="categorias" aria-labelledby="categories-title">
        <div className="section-heading">
          <div><p className="eyebrow">Todo tiene un modelo</p><h2 id="categories-title">Explora por categoría</h2></div>
          <p className="heading-copy">Desde órbitas planetarias hasta decisiones financieras y simulacros de emergencia.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const meta = categoryMeta[category];
            const count = simulators.filter((item) => item.category === category).length;
            return (
              <button type="button" className="category-card" data-category={category} onClick={() => chooseCategory(category)} key={category}>
                <span className="category-glyph" aria-hidden="true">{meta.glyph}</span>
                <span><strong>{category}</strong><small>{meta.description}</small></span>
                <b>{count}</b>
              </button>
            );
          })}
        </div>
      </section>

      <section className="catalog-section" id="catalogo" aria-labelledby="catalog-title">
        <div className="catalog-head">
          <div><p className="eyebrow">Catálogo abierto</p><h2 id="catalog-title">Enciclopedia de simuladores</h2></div>
          <button className="secondary-button" type="button" onClick={surpriseMe}>Sorpréndeme <span aria-hidden="true">✦</span></button>
        </div>
        <div className="filter-row" aria-label="Filtrar por categoría">
          <button type="button" className={!favoritesOnly && activeCategory === "Todos" ? "selected" : ""} onClick={() => chooseCategory("Todos")}>Todos</button>
          {categories.map((category) => <button type="button" className={!favoritesOnly && activeCategory === category ? "selected" : ""} onClick={() => chooseCategory(category)} key={category}>{category}</button>)}
          <button type="button" className={favoritesOnly ? "selected favorite-filter" : "favorite-filter"} onClick={showFavorites}>☆ Favoritos</button>
        </div>
        <div className="results-line" aria-live="polite">
          <span>{filteredSimulators.length} {filteredSimulators.length === 1 ? "resultado" : "resultados"}</span>
          {(query || activeCategory !== "Todos" || favoritesOnly) && <button type="button" onClick={() => { setQuery(""); setActiveCategory("Todos"); setFavoritesOnly(false); }}>Limpiar filtros</button>}
        </div>

        {filteredSimulators.length > 0 ? (
          <div className="simulator-grid">
            {filteredSimulators.map((simulator) => {
              const meta = categoryMeta[simulator.category];
              const isFavorite = favorites.has(simulator.id);
              return (
                <article className="simulator-card" data-category={simulator.category} key={simulator.id}>
                  <div className="simulator-visual"><span aria-hidden="true">{meta.glyph}</span><small>{simulator.category}</small></div>
                  <div className="simulator-content">
                    <div className="simulator-topline"><span className="free-label">Gratis</span><button type="button" className={isFavorite ? "favorite-button active" : "favorite-button"} aria-label={isFavorite ? `Quitar ${simulator.title} de favoritos` : `Guardar ${simulator.title} en favoritos`} aria-pressed={isFavorite} onClick={() => toggleFavorite(simulator.id)}>{isFavorite ? "★" : "☆"}</button></div>
                    <h3>{simulator.title}</h3><p>{simulator.description}</p>
                    <div className="tag-list">{simulator.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <a href={simulator.href} target="_blank" rel="noreferrer" aria-label={`Abrir ${simulator.title} en una nueva pestaña`}>Abrir simulador <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state"><span aria-hidden="true">⌕</span><h3>No encontramos ese simulador</h3><p>Prueba otra palabra, categoría o limpia los filtros.</p><button type="button" className="secondary-button" onClick={() => { setQuery(""); setActiveCategory("Todos"); setFavoritesOnly(false); }}>Ver todos</button></div>
        )}
      </section>

      <section className="emergency-feature" aria-labelledby="emergency-title">
        <div><p className="eyebrow">Simulacro recomendado</p><h2 id="emergency-title">¿Puedes diseñar una ciudad preparada para el desastre?</h2><p>Planifica infraestructuras, protege a la población y observa las consecuencias de cada decisión.</p><a className="primary-button link-button" href="https://www.stopdisastersgame.org/" target="_blank" rel="noreferrer">Iniciar simulacro <span aria-hidden="true">↗</span></a></div>
        <div className="radar-graphic" aria-hidden="true"><i /><i /><i /><span>△</span></div>
      </section>

      <section className="principles-section" aria-labelledby="principles-title">
        <div><p className="eyebrow">Criterio Simula</p><h2 id="principles-title">Solo experiencias que vale la pena explorar</h2></div>
        <div className="principles-grid"><article><span>01</span><h3>Interactividad real</h3><p>Cada recurso permite decidir, manipular variables o navegar libremente.</p></article><article><span>02</span><h3>Acceso gratuito</h3><p>Todos pueden probarse sin realizar un pago obligatorio.</p></article><article><span>03</span><h3>Calidad visual</h3><p>Priorizamos 3D, datos vivos, mundos navegables y modelos claros.</p></article></div>
      </section>

      <footer><a className="brand footer-brand" href="#inicio"><span className="brand-mark" aria-hidden="true"><i /><i /><b /></span><span>Simula</span></a><p>Una enciclopedia para aprender haciendo.</p><a href="#inicio">Volver arriba ↑</a></footer>
    </main>
  );
}
