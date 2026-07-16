"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  accessMeta,
  categories,
  categoryMeta,
  simulators,
  type Access,
  type Category,
  type Simulator,
} from "./catalog";

declare global {
  interface Window {
    __SIMULA_ASSET_BASE__?: string;
  }
}

const imagePath = (filename: string) => {
  const base = typeof window === "undefined" ? "" : (window.__SIMULA_ASSET_BASE__ ?? "");
  return `${base}images/${filename}`;
};

const featured = [
  {
    title: "Sistema Solar 3D",
    category: "Espacio",
    description: "Recorre planetas, lunas y misiones con datos científicos de NASA.",
    href: "https://eyes.nasa.gov/apps/solar-system/",
    image: imagePath("card-solar.png"),
  },
  {
    title: "Clima en tiempo real",
    category: "Tierra y clima",
    description: "Observa viento, temperatura y corrientes sobre un planeta vivo.",
    href: "https://earth.nullschool.net/",
    image: imagePath("card-climate.png"),
  },
  {
    title: "Laboratorio molecular",
    category: "Biología y salud",
    description: "Construye moléculas y comprende su estructura tridimensional.",
    href: "https://molview.org/",
    image: imagePath("card-molecular.png"),
  },
];

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const PAGE_SIZE = 48;

const ignoredWords = new Set([
  "para", "quiero", "necesito", "algo", "sobre", "como", "con", "que", "una", "uno",
  "unos", "unas", "del", "las", "los", "por", "sin", "sea", "usar", "busco", "juego",
  "simulador", "simulacro", "gratis", "gratuito", "web", "linea", "cuenta", "registro",
  "login", "estudiante", "estudiantes", "bachillerato", "secundaria",
]);

const categoryClues: Record<Category, string[]> = {
  Espacio: ["espacio", "astronomia", "planeta", "luna", "marte", "estrella", "universo", "orbita"],
  "Tierra y clima": ["clima", "tierra", "terremoto", "volcan", "oceano", "ambiente", "bosque", "meteorologia"],
  "Física y química": ["fisica", "quimica", "fuerza", "energia", "materia", "atomo", "molecula", "laboratorio"],
  "Biología y salud": ["biologia", "salud", "anatomia", "cuerpo", "celula", "genetica", "medicina", "virus"],
  Ingeniería: ["ingenieria", "circuito", "electronica", "arduino", "mecanismo", "electricidad"],
  "Programación y robótica": ["programacion", "codigo", "robot", "robotica", "javascript", "scratch", "ciberseguridad"],
  "Matemáticas y lógica": ["matematica", "matematicas", "fraccion", "geometria", "calculo", "algebra", "logica", "estadistica"],
  "Simulacros y exámenes": ["examen", "prueba", "simulacro", "saber", "icfes", "sat", "ielts", "conduccion"],
  Idiomas: ["idioma", "ingles", "espanol", "frances", "aleman", "vocabulario", "gramatica", "pronunciacion"],
  Finanzas: ["finanzas", "dinero", "ahorro", "inversion", "presupuesto", "economia", "banco"],
  "Geografía e historia": ["geografia", "historia", "mapa", "pais", "bandera", "cultura", "guerra"],
  "Sociedad y ciudadanía": ["sociedad", "ciudadania", "gobierno", "democracia", "politica", "elecciones", "derechos"],
  "Arte y música": ["arte", "musica", "dibujo", "pintura", "sonido", "animacion", "creatividad"],
  "Educativos infantiles": ["nino", "ninos", "infantil", "primaria", "preescolar", "familia", "pequeno"],
  Transporte: ["transporte", "vuelo", "avion", "conducir", "carro", "barco", "trafico"],
  Emergencias: ["emergencia", "desastre", "incendio", "tsunami", "epidemia", "asteroide", "riesgo"],
  "Juegos recreativos": ["jugar", "juegos", "diversion", "ajedrez", "cartas", "puzle", "rompecabezas", "aventura"],
};

type Recommendation = { simulator: Simulator; score: number; reasons: string[] };

const recommendResources = (request: string): Recommendation[] => {
  const normalizedRequest = normalize(request);
  const words = [...new Set(normalizedRequest.split(/[^a-z0-9]+/).filter((word) => word.length > 2 && !ignoredWords.has(word)))];
  const wantsDirect = /sin (cuenta|registro|login)|no (cuenta|registro)|acceso directo/.test(normalizedRequest);

  return simulators
    .map((simulator) => {
      const searchable = normalize(`${simulator.title} ${simulator.category} ${simulator.description} ${simulator.tags.join(" ")}`);
      const matchedWords = words.filter((word) => searchable.includes(word));
      const clueMatches = categoryClues[simulator.category].filter((clue) => normalizedRequest.includes(clue));
      let score = matchedWords.length * 5 + clueMatches.length * 7;
      if (normalizedRequest.includes(normalize(simulator.title))) score += 18;
      if (score > 0 && wantsDirect && simulator.access === "directo") score += 5;
      if (score > 0 && wantsDirect && simulator.access !== "directo") score -= 7;
      const reasons = [...new Set([...matchedWords, ...clueMatches])].slice(0, 3);
      return { simulator, score, reasons };
    })
    .filter((item) => item.score > 0 && (!wantsDirect || item.simulator.access === "directo"))
    .sort((a, b) => b.score - a.score || (a.simulator.access === "directo" ? -1 : 1))
    .slice(0, 6);
};

export default function Home() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "Todos">("Todos");
  const [accessFilter, setAccessFilter] = useState<Access | "todos">("todos");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);
  const [assistantQuery, setAssistantQuery] = useState("");
  const [assistantRequest, setAssistantRequest] = useState("");

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
      const matchesAccess = accessFilter === "todos" || simulator.access === accessFilter;
      const matchesFavorite = !favoritesOnly || favorites.has(simulator.id);
      const haystack = normalize(
        `${simulator.title} ${simulator.category} ${simulator.description} ${simulator.tags.join(" ")}`,
      );
      return matchesCategory && matchesAccess && matchesFavorite && (!term || haystack.includes(term));
    });
  }, [accessFilter, activeCategory, favorites, favoritesOnly, query]);

  const visibleSimulators = filteredSimulators.slice(0, visibleLimit);
  const directCount = simulators.filter((item) => item.access === "directo").length;
  const recommendations = useMemo(() => recommendResources(assistantRequest), [assistantRequest]);

  const askAssistant = (request = assistantQuery) => {
    const cleanRequest = request.trim();
    if (!cleanRequest) return;
    setAssistantQuery(cleanRequest);
    setAssistantRequest(cleanRequest);
  };

  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseCategory = (category: Category | "Todos") => {
    setActiveCategory(category);
    setFavoritesOnly(false);
    setVisibleLimit(PAGE_SIZE);
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
        // Los favoritos siguen disponibles durante la sesión si el navegador
        // restringe el almacenamiento local.
      }
      return next;
    });
  };

  const showFavorites = () => {
    setFavoritesOnly(true);
    setActiveCategory("Todos");
    setVisibleLimit(PAGE_SIZE);
    requestAnimationFrame(scrollToCatalog);
  };

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("Todos");
    setAccessFilter("todos");
    setFavoritesOnly(false);
    setVisibleLimit(PAGE_SIZE);
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
        <button
          className="profile-button"
          type="button"
          onClick={showFavorites}
          aria-label={`${favorites.size} recursos favoritos`}
        >
          <span aria-hidden="true">☆</span>
          <span className="favorite-count">{favorites.size}</span>
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">La biblioteca para aprender haciendo</p>
          <h1>Explora.<br />Practica.<br />Descubre.</h1>
          <p className="hero-description">
            Simuladores, simulacros, herramientas y juegos gratuitos organizados en un solo lugar.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={scrollToCatalog}>
              Explorar el catálogo <span aria-hidden="true">↗</span>
            </button>
            <span className="hero-proof"><strong>{simulators.length}</strong> recursos investigados</span>
          </div>
          <label className="universal-search" role="search">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Buscar recursos</span>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => { setQuery(event.target.value); setVisibleLimit(PAGE_SIZE); }}
              onFocus={() => setFavoritesOnly(false)}
              placeholder="Busca física, inglés, ajedrez, anatomía…"
            />
            <kbd>⌘ K</kbd>
          </label>
          <div className="hero-stats" aria-label="Resumen del catálogo">
            <span><strong>{categories.length}</strong> categorías</span>
            <span><strong>{directCount}</strong> sin cuenta</span>
            <span><strong>100%</strong> con opción gratuita</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <img src={imagePath("hero-globe.png")} alt="" />
          <span className="data-pill pill-one">17 áreas de conocimiento</span>
          <span className="data-pill pill-two">Acceso web seleccionado</span>
        </div>
      </section>

      <section className="assistant-section" id="asistente" aria-labelledby="assistant-title">
        <div className="assistant-intro">
          <p className="eyebrow">Asistente de recomendaciones</p>
          <h2 id="assistant-title">Cuéntame qué quieres aprender o practicar</h2>
          <p>
            Describe el tema, la edad, el tipo de actividad o si prefieres acceso sin registro.
            El asistente compara tu solicitud con los {simulators.length} recursos del catálogo.
          </p>
          <div className="assistant-examples" aria-label="Ejemplos de solicitudes">
            {["Física para secundaria sin registro", "Inglés para practicar un examen", "Juegos de matemáticas para niños"].map((example) => (
              <button type="button" onClick={() => askAssistant(example)} key={example}>{example}</button>
            ))}
          </div>
        </div>
        <div className="assistant-panel">
          <form onSubmit={(event) => { event.preventDefault(); askAssistant(); }}>
            <label htmlFor="assistant-request">¿Qué estás buscando?</label>
            <div className="assistant-input-row">
              <textarea
                id="assistant-request"
                value={assistantQuery}
                onChange={(event) => setAssistantQuery(event.target.value)}
                placeholder="Ejemplo: necesito un simulador de circuitos para estudiantes de bachillerato que funcione sin iniciar sesión"
                rows={3}
              />
              <button className="primary-button" type="submit">Recomendar <span aria-hidden="true">✦</span></button>
            </div>
          </form>

          {assistantRequest && (
            <div className="assistant-response" aria-live="polite">
              <div className="assistant-response-head">
                <span aria-hidden="true">✦</span>
                <p>
                  {recommendations.length
                    ? `Encontré ${recommendations.length} opciones especialmente relacionadas con tu solicitud.`
                    : "No encontré una coincidencia suficientemente clara. Prueba indicando una materia, tema o tipo de juego."}
                </p>
              </div>
              {recommendations.length > 0 && (
                <div className="recommendation-list">
                  {recommendations.map(({ simulator, reasons }) => (
                    <article className="recommendation-card" key={simulator.id}>
                      <div className="recommendation-icon" aria-hidden="true">{categoryMeta[simulator.category].glyph}</div>
                      <div>
                        <span className={`access-label access-${simulator.access}`}>{accessMeta[simulator.access].short}</span>
                        <h3>{simulator.title}</h3>
                        <p>{simulator.description}</p>
                        <small>
                          Recomendado por: {reasons.length ? reasons.join(", ") : simulator.category.toLowerCase()}.
                        </small>
                      </div>
                      <a href={simulator.href} target="_blank" rel="noreferrer" aria-label={`Abrir ${simulator.title} en una nueva pestaña`}>
                        Abrir <span aria-hidden="true">↗</span>
                      </a>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
          {!assistantRequest && <p className="assistant-privacy">Funciona en tu navegador. No envía ni almacena lo que escribes.</p>}
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <div><p className="eyebrow">Para empezar</p><h2 id="featured-title">Experiencias destacadas</h2></div>
          <a href="#catalogo">Ver catálogo completo <span aria-hidden="true">↓</span></a>
        </div>
        <div className="featured-grid">
          {featured.map((item) => (
            <a className="featured-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
              <div className="featured-image"><img src={item.image} alt="" /><span className="free-badge">ACCESO DIRECTO</span></div>
              <div className="featured-card-body">
                <span className="category-tag">{item.category}</span>
                <h3>{item.title}</h3><p>{item.description}</p><span className="card-arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="category-section" id="categorias" aria-labelledby="categories-title">
        <div className="section-heading">
          <div><p className="eyebrow">Todo está conectado</p><h2 id="categories-title">Explora por categoría</h2></div>
          <p className="heading-copy">Desde laboratorios de física hasta idiomas, simulacros, arte y juegos de estrategia.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            const meta = categoryMeta[category];
            const count = simulators.filter((item) => item.category === category).length;
            return (
              <button
                type="button"
                className="category-card"
                data-category={category}
                onClick={() => chooseCategory(category)}
                key={category}
              >
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
          <div><p className="eyebrow">Catálogo investigado</p><h2 id="catalog-title">Todos los recursos</h2></div>
          <button className="secondary-button" type="button" onClick={surpriseMe}>Sorpréndeme <span aria-hidden="true">✦</span></button>
        </div>

        <div className="access-filter" aria-label="Filtrar por tipo de acceso">
          <span>Acceso:</span>
          <button type="button" className={accessFilter === "todos" ? "selected" : ""} onClick={() => { setAccessFilter("todos"); setVisibleLimit(PAGE_SIZE); }}>Todos</button>
          {(Object.keys(accessMeta) as Access[]).map((access) => (
            <button type="button" className={accessFilter === access ? "selected" : ""} onClick={() => { setAccessFilter(access); setVisibleLimit(PAGE_SIZE); }} key={access}>
              {accessMeta[access].short}
            </button>
          ))}
        </div>

        <div className="filter-row" aria-label="Filtrar por categoría">
          <button type="button" className={!favoritesOnly && activeCategory === "Todos" ? "selected" : ""} onClick={() => chooseCategory("Todos")}>Todos</button>
          {categories.map((category) => (
            <button type="button" className={!favoritesOnly && activeCategory === category ? "selected" : ""} onClick={() => chooseCategory(category)} key={category}>{category}</button>
          ))}
          <button type="button" className={favoritesOnly ? "selected favorite-filter" : "favorite-filter"} onClick={showFavorites}>☆ Favoritos</button>
        </div>

        <div className="results-line" aria-live="polite">
          <span>Mostrando {Math.min(visibleLimit, filteredSimulators.length)} de {filteredSimulators.length} resultados</span>
          {(query || activeCategory !== "Todos" || accessFilter !== "todos" || favoritesOnly) && (
            <button type="button" onClick={clearFilters}>Limpiar filtros</button>
          )}
        </div>

        {visibleSimulators.length > 0 ? (
          <>
            <div className="simulator-grid">
              {visibleSimulators.map((simulator) => {
                const meta = categoryMeta[simulator.category];
                const isFavorite = favorites.has(simulator.id);
                return (
                  <article className="simulator-card" data-category={simulator.category} key={simulator.id}>
                    <div className="simulator-visual"><span aria-hidden="true">{meta.glyph}</span><small>{simulator.category}</small></div>
                    <div className="simulator-content">
                      <div className="simulator-topline">
                        <span className={`access-label access-${simulator.access}`} title={accessMeta[simulator.access].label}>
                          {accessMeta[simulator.access].short}
                        </span>
                        <button
                          type="button"
                          className={isFavorite ? "favorite-button active" : "favorite-button"}
                          aria-label={isFavorite ? `Quitar ${simulator.title} de favoritos` : `Guardar ${simulator.title} en favoritos`}
                          aria-pressed={isFavorite}
                          onClick={() => toggleFavorite(simulator.id)}
                        >{isFavorite ? "★" : "☆"}</button>
                      </div>
                      <h3>{simulator.title}</h3><p>{simulator.description}</p>
                      <div className="tag-list">{simulator.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <a href={simulator.href} target="_blank" rel="noreferrer" aria-label={`Abrir ${simulator.title} en una nueva pestaña`}>
                        Abrir recurso <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
            {visibleLimit < filteredSimulators.length && (
              <div className="load-more-wrap">
                <button className="secondary-button" type="button" onClick={() => setVisibleLimit((value) => value + PAGE_SIZE)}>
                  Mostrar {Math.min(PAGE_SIZE, filteredSimulators.length - visibleLimit)} recursos más
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span><h3>No encontramos ese recurso</h3>
            <p>Prueba otra palabra, categoría o tipo de acceso.</p>
            <button type="button" className="secondary-button" onClick={clearFilters}>Ver todos</button>
          </div>
        )}
      </section>

      <section className="emergency-feature" aria-labelledby="emergency-title">
        <div>
          <p className="eyebrow">Simulacro recomendado</p>
          <h2 id="emergency-title">¿Puedes diseñar una ciudad preparada para el desastre?</h2>
          <p>Planifica infraestructuras, protege a la población y observa las consecuencias de cada decisión.</p>
          <a className="primary-button link-button" href="https://www.stopdisastersgame.org/" target="_blank" rel="noreferrer">
            Iniciar simulacro <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="radar-graphic" aria-hidden="true"><i /><i /><i /><span>△</span></div>
      </section>

      <section className="principles-section" aria-labelledby="principles-title">
        <div><p className="eyebrow">Criterio Simula</p><h2 id="principles-title">Un catálogo claro y transparente</h2></div>
        <div className="principles-grid">
          <article><span>01</span><h3>Acceso identificado</h3><p>Cada tarjeta indica si funciona sin cuenta, tiene registro opcional o acceso mixto.</p></article>
          <article><span>02</span><h3>Enlaces externos</h3><p>Los recursos se abren en una pestaña nueva para respetar la seguridad de cada plataforma.</p></article>
          <article><span>03</span><h3>Búsqueda útil</h3><p>Encuentra recursos por nombre, área, descripción o etiquetas temáticas.</p></article>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark" aria-hidden="true"><i /><i /><b /></span><span>Simula</span></a>
        <p>{simulators.length} recursos para aprender, practicar y jugar.</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </main>
  );
}
