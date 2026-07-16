export type Category =
  | "Espacio"
  | "Tierra y clima"
  | "Física y química"
  | "Biología y salud"
  | "Ingeniería"
  | "Programación y robótica"
  | "Matemáticas y lógica"
  | "Simulacros y exámenes"
  | "Idiomas"
  | "Finanzas"
  | "Geografía e historia"
  | "Sociedad y ciudadanía"
  | "Arte y música"
  | "Educativos infantiles"
  | "Transporte"
  | "Emergencias"
  | "Juegos recreativos";

export type Access = "directo" | "opcional" | "mixto";

export type Simulator = {
  id: string;
  title: string;
  category: Category;
  description: string;
  href: string;
  tags: string[];
  access: Access;
};

export const categoryMeta: Record<Category, { glyph: string; description: string }> = {
  Espacio: { glyph: "◉", description: "Planetas, estrellas, órbitas y misiones" },
  "Tierra y clima": { glyph: "⌁", description: "Clima, geología, océanos y ambiente" },
  "Física y química": { glyph: "∿", description: "Fuerzas, materia, energía y laboratorios" },
  "Biología y salud": { glyph: "⌬", description: "Anatomía, células, genética y medicina" },
  Ingeniería: { glyph: "⚙", description: "Circuitos, electrónica y mecanismos" },
  "Programación y robótica": { glyph: "⌘", description: "Código, robots, algoritmos y seguridad" },
  "Matemáticas y lógica": { glyph: "∑", description: "Geometría, datos, cálculo y acertijos" },
  "Simulacros y exámenes": { glyph: "✓", description: "Pruebas académicas, idiomas y conducción" },
  Idiomas: { glyph: "A", description: "Vocabulario, gramática y comprensión" },
  Finanzas: { glyph: "↟", description: "Ahorro, inversión, presupuesto y economía" },
  "Geografía e historia": { glyph: "⌖", description: "Mapas, países, cultura e historia" },
  "Sociedad y ciudadanía": { glyph: "◎", description: "Gobierno, confianza y sistemas sociales" },
  "Arte y música": { glyph: "♪", description: "Dibujo, sonido, animación y creación 3D" },
  "Educativos infantiles": { glyph: "✦", description: "Aprendizaje seguro para niños y familias" },
  Transporte: { glyph: "↗", description: "Vuelo, conducción, barcos y navegación" },
  Emergencias: { glyph: "△", description: "Desastres, epidemias y gestión del riesgo" },
  "Juegos recreativos": { glyph: "◇", description: "Estrategia, cartas, puzles y aventuras" },
};

const slug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const r = (
  title: string,
  category: Category,
  description: string,
  href: string,
  tags: string[],
  access: Access = "directo",
): Simulator => ({
  id: `${slug(category)}-${slug(title)}`,
  title,
  category,
  description,
  href,
  tags,
  access,
});

export const simulators: Simulator[] = [
  // Espacio y astronomía
  r("NASA Eyes: Sistema Solar", "Espacio", "Explora planetas, lunas, asteroides y misiones en un entorno 3D.", "https://eyes.nasa.gov/apps/solar-system/", ["NASA", "3D"]),
  r("NASA Eyes: Exoplanetas", "Espacio", "Viaja por miles de mundos descubiertos fuera del sistema solar.", "https://eyes.nasa.gov/apps/exo/", ["Exoplanetas", "Datos"]),
  r("NASA Eyes: Asteroides", "Espacio", "Observa órbitas y aproximaciones de objetos cercanos a la Tierra.", "https://eyes.nasa.gov/apps/asteroids/", ["Órbitas", "NASA"]),
  r("Experience Curiosity", "Espacio", "Conduce el rover Curiosity y utiliza sus instrumentos sobre Marte.", "https://eyes.nasa.gov/apps/curiosity/", ["Marte", "Rover"]),
  r("NASA Solar System Exploration", "Espacio", "Guías, visualizaciones y datos de los cuerpos del sistema solar.", "https://science.nasa.gov/solar-system/", ["NASA", "Ciencia"]),
  r("Stellarium Web", "Espacio", "Planetario que reproduce el cielo desde cualquier lugar y fecha.", "https://stellarium-web.org/", ["Planetario", "Cielo"]),
  r("Solar System Scope", "Espacio", "Modelo orbital navegable con constelaciones y escalas planetarias.", "https://www.solarsystemscope.com/", ["Órbitas", "3D"]),
  r("NASA Mars Trek", "Espacio", "Recorre Marte con mapas, mediciones y datos de misiones.", "https://trek.nasa.gov/mars/", ["Marte", "Mapas"]),
  r("NASA Moon Trek", "Espacio", "Explora la superficie lunar y sus accidentes geográficos.", "https://trek.nasa.gov/moon/", ["Luna", "Mapas"]),
  r("ViewSpace", "Espacio", "Interactivos y videos científicos sobre astronomía y ciencias de la Tierra.", "https://viewspace.org/", ["Astronomía", "Educativo"]),
  r("Earth Space Lab", "Espacio", "Rotación terrestre, estaciones, sombras, órbitas y coordenadas en 3D.", "https://www.earthspacelab.com/", ["Tierra", "Órbitas"]),
  r("WorldWide Telescope", "Espacio", "Explorador web de datos astronómicos, imágenes y recorridos.", "https://worldwidetelescope.org/home", ["Telescopio", "Datos"]),
  r("100,000 Stars", "Espacio", "Viaje WebGL desde el Sol hasta la estructura de la Vía Láctea.", "https://stars.chromeexperiments.com/", ["WebGL", "Estrellas"]),
  r("Asterank 3D", "Espacio", "Miles de asteroides representados en una escena orbital 3D.", "https://www.asterank.com/3d/", ["Asteroides", "Datos"]),
  r("NASA Space Place", "Espacio", "Juegos y actividades de astronomía para público infantil.", "https://spaceplace.nasa.gov/menu/play/", ["NASA", "Niños"]),

  // Tierra, clima y ambiente
  r("earth.nullschool", "Tierra y clima", "Vientos, océanos, temperatura y contaminantes sobre un globo vivo.", "https://earth.nullschool.net/", ["Clima", "Datos en vivo"]),
  r("Windy", "Tierra y clima", "Compara modelos meteorológicos, lluvia, viento, oleaje y temperatura.", "https://www.windy.com/", ["Pronóstico", "Mapas"]),
  r("Ventusky", "Tierra y clima", "Mapas animados de clima, viento, tormentas y calidad del aire.", "https://www.ventusky.com/", ["Clima", "Animación"]),
  r("Zoom Earth", "Tierra y clima", "Sigue nubes, huracanes, incendios y precipitaciones casi en directo.", "https://zoom.earth/", ["Satélite", "En vivo"]),
  r("NASA Worldview", "Tierra y clima", "Compara capas satelitales y fenómenos ambientales globales.", "https://worldview.earthdata.nasa.gov/", ["NASA", "Satélite"]),
  r("En-ROADS", "Tierra y clima", "Cambia políticas y observa sus efectos climáticos hasta 2100.", "https://www.climateinteractive.org/en-roads/", ["Clima", "Política"]),
  r("C-ROADS", "Tierra y clima", "Prueba compromisos de emisiones por regiones y países.", "https://www.climateinteractive.org/c-roads", ["Emisiones", "Sistemas"]),
  r("NASA Climate Interactives", "Tierra y clima", "Colección de visualizaciones sobre clima, hielo, carbono y océanos.", "https://climate.nasa.gov/interactives/", ["NASA", "Clima"]),
  r("Global Forest Watch", "Tierra y clima", "Observa deforestación, incendios y cambios de cobertura forestal.", "https://www.globalforestwatch.org/map/", ["Bosques", "Satélite"]),
  r("USGS Earthquake Map", "Tierra y clima", "Terremotos mundiales por magnitud, profundidad y fecha.", "https://earthquake.usgs.gov/earthquakes/map/", ["Sismos", "En vivo"]),
  r("Visible Geology", "Tierra y clima", "Modelado 3D de estratos, fallas, intrusiones y topografía.", "https://www.visiblegeology.com/", ["Geología", "3D"]),
  r("Orb.Farm", "Tierra y clima", "Crea un ecosistema acuático con plantas, peces y microorganismos.", "https://orb.farm/", ["Ecosistema", "Sandbox"]),
  r("Survive the Century", "Tierra y clima", "Historia interactiva de decisiones climáticas y futuros posibles.", "https://survivethecentury.net/", ["Clima", "Narrativo"]),

  // Física y química
  r("PhET Interactive Simulations", "Física y química", "Simulaciones de física, química, biología, Tierra y matemáticas.", "https://phet.colorado.edu/es/", ["Laboratorio", "Español"]),
  r("Walter Fendt", "Física y química", "Applets HTML5 de mecánica, óptica, electricidad y ondas.", "https://www.walter-fendt.de/html5/phes/", ["Física", "HTML5"]),
  r("oPhysics", "Física y química", "Simulaciones de movimiento, fuerzas, electricidad, ondas y óptica.", "https://ophysics.com/", ["Física", "Laboratorio"]),
  r("myPhysicsLab", "Física y química", "Modelos manipulables de péndulos, colisiones, resortes y caos.", "https://www.myphysicslab.com/", ["Mecánica", "Caos"]),
  r("Falstad Math & Physics", "Física y química", "Simulaciones interactivas de ondas, campos y mecánica cuántica.", "https://www.falstad.com/mathphysics.html", ["Campos", "Ondas"]),
  r("The Physics Aviary", "Física y química", "Laboratorios de movimiento, electricidad, óptica y energía.", "https://www.thephysicsaviary.com/Physics/Programs/Labs/find.php", ["Laboratorios", "Física"]),
  r("Physics Classroom Interactives", "Física y química", "Actividades HTML5 de mecánica, electricidad, ondas y química.", "https://www.physicsclassroom.com/interactive", ["HTML5", "Secundaria"]),
  r("LearnChemE Virtual Laboratories", "Física y química", "Reactores, catálisis, transferencia de calor y procesos químicos.", "https://learncheme.com/virtual-laboratories/", ["Química", "Ingeniería"]),
  r("LearnChemE Simulations", "Física y química", "Más de 290 simulaciones; algunas funcionan en web y otras se descargan.", "https://learncheme.com/simulations/", ["Procesos", "Universidad"], "mixto"),
  r("JavaLab", "Física y química", "Cientos de simulaciones de física, química, astronomía y biología.", "https://javalab.org/en/", ["Ciencia", "HTML5"]),
  r("NetLogo Web", "Física y química", "Modelos de difusión, reacciones, poblaciones y sistemas complejos.", "https://www.netlogoweb.org/launch", ["Agentes", "Modelos"]),
  r("Andrew Duffy Physics Sims", "Física y química", "Más de 200 simulaciones universitarias ejecutables en el navegador.", "https://physics.bu.edu/~duffy/sims.html", ["Universidad", "Física"]),
  r("3JCN Physics Simulations", "Física y química", "Amplia colección abierta de simulaciones de física.", "https://www.new3jcn.com/simulation.html", ["Física", "Colección"]),
  r("CK-12 Physics Simulations", "Física y química", "Experiencias de física aplicadas a situaciones reales.", "https://interactives.ck12.org/simulations/physics.html", ["Física", "Escuela"], "opcional"),
  r("ChemCollective", "Física y química", "Laboratorios virtuales, escenarios y actividades de química.", "https://chemcollective.org/", ["Química", "Laboratorio"]),
  r("Open Source Physics", "Física y química", "Biblioteca de modelos y recursos abiertos para enseñar física.", "https://www.compadre.org/osp/", ["Código abierto", "Física"], "mixto"),
  r("WebGL Fluid Simulation", "Física y química", "Crea fluidos digitales que reaccionan a cada movimiento.", "https://paveldogreat.github.io/WebGL-Fluid-Simulation/", ["Fluidos", "WebGL"]),
  r("Sandspiel", "Física y química", "Combina arena, agua, fuego, hielo y vida en un mundo emergente.", "https://sandspiel.club/", ["Partículas", "Creativo"]),
  r("SciChamp", "Física y química", "Juegos de física, química y biología para secundaria.", "https://scichamp.com/", ["Juegos", "Secundaria"]),
  r("The Science Playground", "Física y química", "Directorio de simulaciones y juegos científicos gratuitos en la web.", "https://thescienceplayground.com/index.php/free-web-links/", ["Directorio", "Ciencia"]),

  // Biología y salud
  r("MolView", "Biología y salud", "Construye moléculas y examina su geometría tridimensional.", "https://molview.org/", ["Moléculas", "3D"]),
  r("LabXchange", "Biología y salud", "Laboratorios, secuencias y recursos científicos de Harvard.", "https://www.labxchange.org/library", ["Laboratorios", "Harvard"], "opcional"),
  r("HHMI BioInteractive", "Biología y salud", "Animaciones, laboratorios y recursos de biología basados en evidencia.", "https://www.biointeractive.org/", ["Biología", "Ciencia"]),
  r("Learn.Genetics", "Biología y salud", "Genética, ADN, células y herencia mediante interactivos.", "https://learn.genetics.utah.edu/", ["Genética", "ADN"]),
  r("BioMan Biology", "Biología y salud", "Juegos de células, genética, ecología y fisiología.", "https://biomanbio.com/", ["Biología", "Juegos"]),
  r("Ask A Biologist", "Biología y salud", "Juegos y simulaciones sobre células, evolución y anatomía.", "https://askabiologist.asu.edu/games-and-simulations", ["Biología", "ASU"]),
  r("Cells Alive", "Biología y salud", "Células, mitosis, microorganismos e inmunología interactiva.", "https://www.cellsalive.com/", ["Células", "Microscopía"]),
  r("NC BioNetwork Virtual Microscope", "Biología y salud", "Practica el manejo de un microscopio y observa muestras.", "https://elearning.ncbionetwork.org/virtuallab/microscope/", ["Microscopio", "Laboratorio"]),
  r("Virtual Microscope", "Biología y salud", "Muestras digitalizadas para aprender microscopía y anatomía.", "https://virtualmicroscope.org/", ["Microscopía", "Muestras"]),
  r("NMSU Virtual Labs", "Biología y salud", "Laboratorios virtuales de microbiología, alimentos y ciencias.", "https://virtuallabs.nmsu.edu/", ["Laboratorios", "Universidad"]),
  r("Innerbody", "Biología y salud", "Mapas y explicaciones interactivas del cuerpo humano.", "https://www.innerbody.com/htm/body.html", ["Anatomía", "Cuerpo"]),
  r("GetBodySmart", "Biología y salud", "Diagramas y cuestionarios de anatomía y fisiología.", "https://www.getbodysmart.com/", ["Anatomía", "Cuestionarios"]),
  r("RCSB Mol* Viewer", "Biología y salud", "Explora proteínas, ADN y estructuras experimentales complejas.", "https://www.rcsb.org/3d-view", ["Proteínas", "3D"]),
  r("BioDigital Human", "Biología y salud", "Recorre anatomía, enfermedades y tratamientos en un cuerpo 3D.", "https://human.biodigital.com/", ["Anatomía", "3D"], "mixto"),
  r("HHMI EarthViewer", "Biología y salud", "Viaja por 4.500 millones de años de evolución planetaria.", "https://media.hhmi.org/biointeractive/earthviewer_web/", ["Evolución", "Tiempo"]),
  r("Virus Explorer", "Biología y salud", "Compara estructuras, genomas y mecanismos de distintos virus.", "https://media.hhmi.org/biointeractive/embed/virus-explorer-embed/index.html", ["Virus", "3D"]),
  r("Modeling Disease Spread", "Biología y salud", "Experimenta con contagio, inmunidad y propagación epidémica.", "https://media.hhmi.org/biointeractive/click/modeling-disease-spread/index.html", ["Epidemias", "Modelo"]),
  r("Nobel Blood Typing Game", "Biología y salud", "Identifica grupos sanguíneos y practica transfusiones seguras.", "https://educationalgames.nobelprize.org/educational/medicine/bloodtypinggame/", ["Sangre", "Medicina"]),
  r("Human Bio Media Blood Lab", "Biología y salud", "Laboratorio virtual de tipificación sanguínea.", "https://www.humanbiomedia.org/blood-typing-lab-simulation/", ["Sangre", "Laboratorio"]),
  r("AnatomyTOOL", "Biología y salud", "Modelos 3D, juegos y cuestionarios anatómicos.", "https://anatomytool.org/interactive", ["Anatomía", "3D"]),
  r("Free Anatomy Quiz", "Biología y salud", "Más de 200 pruebas de anatomía, fisiología y patología.", "https://www.free-anatomy-quiz.com/", ["Anatomía", "Quiz"]),
  r("The Human Body Game", "Biología y salud", "Sistemas, órganos y huesos del cuerpo humano para primaria.", "https://www.thehumanbodygame.co.uk/", ["Cuerpo", "Niños"]),
  r("Eterna", "Biología y salud", "Resuelve plegamientos de ARN y participa en ciencia ciudadana.", "https://eternagame.org/", ["ARN", "Ciencia"], "opcional"),

  // Ingeniería y electrónica
  r("Falstad Circuit Simulator", "Ingeniería", "Construye circuitos y observa la corriente en tiempo real.", "https://www.falstad.com/circuit/circuitjs.html", ["Circuitos", "Electricidad"]),
  r("CircuitVerse", "Ingeniería", "Diseña sistemas lógicos digitales y observa su comportamiento.", "https://circuitverse.org/simulator", ["Lógica", "Circuitos"], "opcional"),
  r("Wokwi", "Ingeniería", "Programa Arduino, ESP32, sensores y pantallas sin hardware físico.", "https://wokwi.com/", ["Arduino", "Electrónica"], "opcional"),
  r("MechSimulator", "Ingeniería", "Construye y analiza mecanismos, eslabones y movimientos.", "https://www.mechsimulator.com/", ["Mecánica", "Mecanismos"]),
  r("MakeCode micro:bit", "Ingeniería", "Simula micro:bit con bloques o JavaScript antes de usar hardware.", "https://makecode.microbit.org/", ["micro:bit", "Bloques"], "opcional"),

  // Programación, robótica y ciberseguridad
  r("MakeCode Arcade", "Programación y robótica", "Crea videojuegos retro con bloques o JavaScript.", "https://arcade.makecode.com/", ["Videojuegos", "Código"], "opcional"),
  r("VEXcode VR", "Programación y robótica", "Programa un robot virtual en escenarios y desafíos 3D.", "https://vr.vex.com/", ["Robótica", "Bloques"], "opcional"),
  r("Blockly Games", "Programación y robótica", "Juegos progresivos para aprender conceptos de programación.", "https://blockly.games/", ["Bloques", "Principiantes"]),
  r("Code.org Game Lab", "Programación y robótica", "Diseña juegos y animaciones con JavaScript visual.", "https://code.org/educate/gamelab", ["Juegos", "JavaScript"], "opcional"),
  r("Scratch", "Programación y robótica", "Crea historias, animaciones y videojuegos con bloques.", "https://scratch.mit.edu/projects/editor/", ["MIT", "Bloques"], "opcional"),
  r("Snap!", "Programación y robótica", "Lenguaje visual avanzado inspirado en Scratch.", "https://snap.berkeley.edu/snap/snap.html", ["Berkeley", "Bloques"]),
  r("Turtle Academy", "Programación y robótica", "Aprende Logo guiando una tortuga en el navegador.", "https://turtleacademy.com/", ["Logo", "Principiantes"]),
  r("Flexbox Froggy", "Programación y robótica", "Aprende CSS Flexbox ayudando a unas ranas.", "https://flexboxfroggy.com/#es", ["CSS", "Juego"]),
  r("Grid Garden", "Programación y robótica", "Practica CSS Grid cultivando un jardín.", "https://cssgridgarden.com/#es", ["CSS", "Juego"]),
  r("CSS Diner", "Programación y robótica", "Aprende selectores CSS mediante desafíos visuales.", "https://flukeout.github.io/", ["CSS", "Selectores"]),
  r("RoboBlockly", "Programación y robótica", "Programación de robots y matemáticas con bloques.", "https://roboblockly.org/", ["Robótica", "STEM"]),
  r("Rocksi", "Programación y robótica", "Brazo robótico 3D con programación Blockly y sin registro.", "https://rocksi.net/", ["Robot", "3D"]),
  r("FTC SIM", "Programación y robótica", "Robots FIRST con bloques o Java en campos virtuales.", "https://ftcsim.org/", ["FIRST", "Robótica"], "opcional"),
  r("Virtual Robot Simulator", "Programación y robótica", "Programa robots FTC con Blockly o Java.", "https://powerplay.vrobotsim.online/", ["FTC", "Robot"]),
  r("Open Roberta Lab", "Programación y robótica", "Programa robots virtuales con bloques NEPO.", "https://lab.open-roberta.org/", ["NEPO", "Robot"], "opcional"),
  r("Robot Benchmark", "Programación y robótica", "Retos de programación y control de robots virtuales.", "https://robotbenchmark.net/", ["Webots", "Retos"], "opcional"),
  r("Elevator Saga", "Programación y robótica", "Programa ascensores eficientes mediante JavaScript.", "https://play.elevatorsaga.com/", ["JavaScript", "Juego"]),
  r("SQLBolt", "Programación y robótica", "Lecciones y ejercicios interactivos de SQL.", "https://sqlbolt.com/", ["SQL", "Base de datos"]),
  r("SQL Murder Mystery", "Programación y robótica", "Resuelve un asesinato consultando una base SQLite.", "https://mystery.knightlab.com/", ["SQL", "Misterio"]),
  r("Learn Git Branching", "Programación y robótica", "Simulador visual de ramas, commits y fusiones en español.", "https://learngitbranching.js.org/?locale=es_ES", ["Git", "Visual"]),
  r("Regex Crossword", "Programación y robótica", "Crucigramas resueltos con expresiones regulares.", "https://regexcrossword.com/", ["Regex", "Puzle"]),
  r("GitMastery", "Programación y robótica", "Juego interactivo para practicar comandos de Git.", "https://gitmastery.me/", ["Git", "Juego"]),
  r("VisuAlgo", "Programación y robótica", "Visualizaciones manipulables de algoritmos y estructuras de datos.", "https://visualgo.net/", ["Algoritmos", "Datos"]),
  r("Python Tutor", "Programación y robótica", "Ejecuta código paso a paso y muestra variables, objetos y memoria.", "https://pythontutor.com/", ["Python", "Visualizador"]),
  r("CS Field Guide Interactives", "Programación y robótica", "Compresión, criptografía, autómatas, algoritmos y redes.", "https://www.csfieldguide.org.nz/en/interactives/", ["Informática", "Interactivos"]),
  r("EarSketch", "Programación y robótica", "Aprende Python o JavaScript produciendo música.", "https://earsketch.gatech.edu/", ["Código", "Música"]),
  r("Interland", "Programación y robótica", "Cuatro juegos de ciudadanía y seguridad digital.", "https://beinternetawesome.withgoogle.com/interland/", ["Ciberseguridad", "Niños"]),
  r("NOVA Cybersecurity Lab", "Programación y robótica", "Defiende sistemas y aprende sobre contraseñas, código y ataques.", "https://www.pbslearningmedia.org/resource/nvcy-sci-cyberlab/nova-cybersecurity-lab/", ["Ciberseguridad", "Simulacro"], "opcional"),
  r("TensorFlow Playground", "Programación y robótica", "Entrena una red neuronal y observa sus fronteras de decisión.", "https://playground.tensorflow.org/", ["IA", "Machine learning"]),
  r("Teachable Machine", "Programación y robótica", "Crea un modelo de IA con imágenes, sonidos o movimientos.", "https://teachablemachine.withgoogle.com/", ["IA", "Cámara"]),
  r("Algorithm Visualizer", "Programación y robótica", "Sigue la ejecución animada de algoritmos y estructuras.", "https://algorithm-visualizer.org/", ["Algoritmos", "Animación"]),

  // Matemáticas, datos y lógica
  r("Desmos", "Matemáticas y lógica", "Calculadoras gráficas, geometría y visualización 3D.", "https://www.desmos.com/calculator?lang=es", ["Gráficas", "Álgebra"]),
  r("Desmos 3D", "Matemáticas y lógica", "Grafica ecuaciones tridimensionales y anímalas con parámetros.", "https://www.desmos.com/3d", ["3D", "Funciones"]),
  r("GeoGebra", "Matemáticas y lógica", "Geometría, álgebra, estadística, cálculo y recursos interactivos.", "https://www.geogebra.org/?lang=es", ["Geometría", "Álgebra"]),
  r("Polypad", "Matemáticas y lógica", "Manipulativos digitales para números, geometría, álgebra y probabilidad.", "https://polypad.amplify.com/", ["Manipulativos", "Aula"]),
  r("CODAP", "Matemáticas y lógica", "Analiza datos, crea gráficos y explora modelos estadísticos.", "https://codap.concord.org/app/", ["Datos", "Estadística"]),
  r("Math Playground", "Matemáticas y lógica", "Juegos de aritmética, lógica, geometría y resolución de problemas.", "https://www.mathplayground.com/", ["Juegos", "Primaria"]),
  r("Math Is Fun", "Matemáticas y lógica", "Explicaciones, ejercicios, puzles y herramientas matemáticas.", "https://www.mathsisfun.com/", ["Matemáticas", "Puzles"]),
  r("Transum", "Matemáticas y lógica", "Actividades y juegos matemáticos para distintas edades.", "https://www.transum.org/Software/", ["Juegos", "Aula"]),
  r("NRICH", "Matemáticas y lógica", "Problemas abiertos, retos y exploraciones matemáticas.", "https://nrich.maths.org/", ["Problemas", "Razonamiento"]),
  r("RoomRecess Math", "Matemáticas y lógica", "Juegos matemáticos gratuitos para primaria.", "https://www.roomrecess.com/pages/MathGames.html", ["Primaria", "Juegos"]),
  r("Math Learning Center Apps", "Matemáticas y lógica", "Regletas, fracciones, geoplano, recta numérica y marcos.", "https://www.mathlearningcenter.org/apps", ["Manipulativos", "Aula"]),
  r("Didax Virtual Manipulatives", "Matemáticas y lógica", "Bloques, fichas, números y fracciones manipulables.", "https://www.didax.com/math/virtual-manipulatives.html", ["Manipulativos", "Primaria"]),
  r("Visnos Math Demos", "Matemáticas y lógica", "Ángulos, polígonos, relojes, porcentajes y tablas.", "https://www.visnos.com/demos", ["Geometría", "Visual"]),
  r("MathsBot Manipulatives", "Matemáticas y lógica", "Mosaicos algebraicos, tangram, dados, dominó y geoplano.", "https://mathsbot.com/manipulativeMenu", ["Manipulativos", "Álgebra"]),
  r("Shodor Interactivate", "Matemáticas y lógica", "Probabilidad, funciones, geometría y modelación.", "https://www.shodor.org/interactivate/activities/", ["Modelos", "Estadística"]),
  r("Seeing Theory", "Matemáticas y lógica", "Probabilidad y estadística mediante visualizaciones interactivas.", "https://seeing-theory.brown.edu/", ["Estadística", "Visual"]),
  r("Euclidea", "Matemáticas y lógica", "Retos de construcciones geométricas con regla y compás.", "https://www.euclidea.xyz/", ["Geometría", "Retos"]),
  r("SageMathCell", "Matemáticas y lógica", "Cálculo, álgebra, gráficas y programación matemática.", "https://sagecell.sagemath.org/", ["Cálculo", "Álgebra"]),
  r("Mathics Live", "Matemáticas y lógica", "Sistema de álgebra computacional de código abierto.", "https://mathics.org/", ["Cálculo", "CAS"]),
  r("Gapminder Tools", "Matemáticas y lógica", "Explora indicadores mundiales mediante gráficos animados.", "https://www.gapminder.org/tools/", ["Datos", "Mundo"]),
  r("Mathler", "Matemáticas y lógica", "Acertijos aritméticos diarios y modo práctica ilimitado.", "https://www.mathler.com/", ["Aritmética", "Diario"]),
  r("Nerdle", "Matemáticas y lógica", "Encuentra una operación matemática oculta usando pistas.", "https://nerdlegame.com/", ["Cálculo", "Diario"], "opcional"),
  r("Clues by Sam", "Matemáticas y lógica", "Deducción lógica diaria sin posibilidad de adivinar.", "https://cluesbysam.com/", ["Lógica", "Misterio"]),
  r("Mystery-o-Matic", "Matemáticas y lógica", "Misterio lógico generado diariamente.", "https://mystery-o-matic.com/en", ["Deducción", "Diario"]),
  r("Murdle", "Matemáticas y lógica", "Misterios diarios con sospechoso, lugar y arma.", "https://murdle.com/", ["Lógica", "Misterio"]),
  r("SineRider", "Matemáticas y lógica", "Resuelve niveles dibujando funciones matemáticas.", "https://sinerider.com/", ["Funciones", "Juego"]),
  r("2048", "Matemáticas y lógica", "Combina números y planifica movimientos en el clásico puzle.", "https://play2048.co/", ["Números", "Puzle"]),
  r("Hextris", "Matemáticas y lógica", "Puzle de rotación y patrones alrededor de un hexágono.", "https://hextris.io/", ["Lógica", "Puzle"]),
  r("Sudoku.game", "Matemáticas y lógica", "Sudokus gratuitos con distintos niveles de dificultad.", "https://sudoku.game/", ["Sudoku", "Lógica"]),

  // Simulacros y exámenes
  r("ICFES Saber 11", "Simulacros y exámenes", "Información, guías y materiales oficiales para Saber 11.", "https://www.icfes.gov.co/evaluaciones-icfes/saber-11/", ["ICFES", "Colombia"]),
  r("ICFES Saber Pro y TyT", "Simulacros y exámenes", "Guías y materiales oficiales de educación superior.", "https://www.icfes.gov.co/evaluaciones-icfes/", ["ICFES", "Universidad"]),
  r("Cambridge Test Your English", "Simulacros y exámenes", "Prueba breve para estimar el nivel de inglés.", "https://www.cambridgeenglish.org/test-your-english/", ["Inglés", "Cambridge"]),
  r("Test-English", "Simulacros y exámenes", "Práctica de gramática, lectura, escucha y exámenes por nivel.", "https://test-english.com/", ["Inglés", "CEFR"]),
  r("Exam English", "Simulacros y exámenes", "Pruebas de nivel y práctica para exámenes internacionales.", "https://www.examenglish.com/", ["Inglés", "Exámenes"]),
  r("IELTS Practice", "Simulacros y exámenes", "Materiales oficiales y pruebas de práctica IELTS.", "https://ielts.org/take-a-test/preparation-resources", ["IELTS", "Inglés"]),
  r("British Council IELTS", "Simulacros y exámenes", "Práctica de escucha, lectura, escritura y conversación.", "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-practice-tests", ["IELTS", "British Council"]),
  r("TOEFL TestReady", "Simulacros y exámenes", "Recursos y práctica oficial para TOEFL.", "https://www.ets.org/toefl/test-takers/ibt/prepare/toefl-testready.html", ["TOEFL", "ETS"], "opcional"),
  r("ACT Free Test Prep", "Simulacros y exámenes", "Preguntas, exámenes y recursos oficiales gratuitos.", "https://www.act.org/content/act/en/products-and-services/the-act/test-preparation/free-act-test-prep.html", ["ACT", "Universidad"]),
  r("4Tests", "Simulacros y exámenes", "Pruebas gratuitas de educación, empleo y certificaciones.", "https://www.4tests.com/", ["Pruebas", "Práctica"]),
  r("Driving-Tests.org", "Simulacros y exámenes", "Práctica de conducción y señales por estados de EE. UU.", "https://driving-tests.org/", ["Conducción", "Licencia"]),
  r("California DMV Sample Tests", "Simulacros y exámenes", "Exámenes públicos de conocimientos para conducir.", "https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/", ["Conducción", "DMV"]),
  r("Monkeytype", "Simulacros y exámenes", "Pruebas configurables de velocidad y precisión al escribir.", "https://monkeytype.com/", ["Mecanografía", "Velocidad"], "opcional"),
  r("Keybr", "Simulacros y exámenes", "Entrenamiento adaptativo de mecanografía.", "https://www.keybr.com/", ["Mecanografía", "Práctica"], "opcional"),
  r("10FastFingers", "Simulacros y exámenes", "Pruebas rápidas de escritura en varios idiomas.", "https://10fastfingers.com/typing-test/spanish", ["Mecanografía", "Español"], "opcional"),
  r("HiSET Official Practice", "Simulacros y exámenes", "Lectura, escritura, matemáticas, ciencias y sociales en inglés y español.", "https://hiset.org/prepare-for-your-test/practice-tests/", ["HiSET", "Oficial"]),
  r("GED Test Previews", "Simulacros y exámenes", "Muestras oficiales de los cuatro componentes del GED.", "https://www.ged.com/en/test-previews.html", ["GED", "Oficial"]),
  r("MTEL Practice Tests", "Simulacros y exámenes", "Simulacros gratuitos para numerosas áreas docentes.", "https://www.mtel.nesinc.com/PageView.aspx?f=HTML_FRAG%2FGENRB_MTELPractice.html", ["Docentes", "Pruebas"]),
  r("Ohio State Practice Tests", "Simulacros y exámenes", "Lengua, matemáticas, ciencias y sociales.", "https://education.ohio.gov/Topics/Testing/Ohios-State-Test-in-ELA-Math-Science-SocialStudies/Sample-test-items-and-practice-tests", ["Escuela", "TestNav"]),
  r("ISASP TestNav Practice", "Simulacros y exámenes", "Práctica pública dentro del entorno TestNav.", "https://ia.mypearsonsupport.com/test-prep/", ["TestNav", "Escuela"]),
  r("TOEIC Official Samples", "Simulacros y exámenes", "Cuadernillos oficiales de comprensión, habla y escritura.", "https://www.ets.org/toeic/test-takers/prepare.html", ["TOEIC", "ETS"]),
  r("DELE Sample Exams", "Simulacros y exámenes", "Modelos oficiales con PDF y audios de todos los niveles.", "https://albuquerque.cervantes.es/en/diplomas_spanish/model_exam.htm", ["DELE", "Español"]),
  r("TCF Simulator TV5MONDE", "Simulacros y exámenes", "Banco de 600 preguntas y simulación de 80 preguntas.", "https://apprendre.tv5monde.com/en/tcf", ["Francés", "TCF"]),
  r("Preply English Test", "Simulacros y exámenes", "36 preguntas, resultado inmediato y sin registro.", "https://preply.com/en/language-tests/english", ["Inglés", "Nivel"]),
  r("Strømmen English Test", "Simulacros y exámenes", "Nivel CEFR sin correo ni cuenta.", "https://strommeninc.com/language-tests/english-level-test/", ["Inglés", "CEFR"]),
  r("EnglishRadar", "Simulacros y exámenes", "60 preguntas desde A1 hasta C2 con resultado inmediato.", "https://www.englishradar.com/english-test/", ["Inglés", "CEFR"]),
  r("Oxford Online English Tests", "Simulacros y exámenes", "Lectura, escucha, gramática y vocabulario.", "https://www.oxfordonlineenglish.com/english-level-test", ["Inglés", "Nivel"]),
  r("Mometrix SAT Math", "Simulacros y exámenes", "Simulacro gratuito de matemáticas para el SAT.", "https://www.mometrix.com/academy/sat-math-practice-test/", ["SAT", "Matemáticas"]),

  // Idiomas
  r("Games to Learn English", "Idiomas", "Juegos de vocabulario, gramática, escucha y conversación.", "https://www.gamestolearnenglish.com/", ["Inglés", "Juegos"]),
  r("Digital Dialects", "Idiomas", "Juegos gratuitos para aprender decenas de idiomas.", "https://www.digitaldialects.com/", ["Vocabulario", "Idiomas"]),
  r("British Council LearnEnglish Kids", "Idiomas", "Juegos, historias y canciones para aprender inglés.", "https://learnenglishkids.britishcouncil.org/fun-games", ["Inglés", "Niños"]),
  r("British Council LearnEnglish Teens", "Idiomas", "Juegos y práctica de inglés para adolescentes.", "https://learnenglishteens.britishcouncil.org/study-break/games", ["Inglés", "Jóvenes"]),
  r("ESL Games Plus", "Idiomas", "Juegos interactivos de vocabulario y gramática inglesa.", "https://www.eslgamesplus.com/", ["Inglés", "ESL"]),
  r("EnglishClub Games", "Idiomas", "Juegos de pronunciación, vocabulario y gramática.", "https://www.englishclub.com/esl-games/", ["Inglés", "Juegos"]),
  r("MES Games", "Idiomas", "Actividades de vocabulario inglés con audio e imágenes.", "https://www.mes-games.com/", ["Inglés", "Vocabulario"]),
  r("Ba Ba Dum", "Idiomas", "Juego visual y auditivo de vocabulario en múltiples idiomas.", "https://babadum.com/", ["Vocabulario", "Audio"]),
  r("LanguageGuide", "Idiomas", "Vocabulario visual con pronunciación en varios idiomas.", "https://www.languageguide.org/", ["Pronunciación", "Visual"]),
  r("OnlineFreeSpanish", "Idiomas", "Vocabulario español con juegos y audio nativo.", "https://www.onlinefreespanish.com/", ["Español", "Audio"]),
  r("Spanish-Games.net", "Idiomas", "Lecciones, pruebas y catorce modalidades de juego.", "https://www.spanish-games.net/", ["Español", "Juegos"]),
  r("Let's Speak Spanish Games", "Idiomas", "Gramática y vocabulario organizados por niveles.", "https://letsspeakspanish.com/free-spanish-games/", ["Español", "Gramática"]),
  r("PandaTree Spanish", "Idiomas", "Colores, números, animales, clima y alimentos.", "https://www.pandatree.com/games/spanish", ["Español", "Niños"]),
  r("German-Games.net", "Idiomas", "Más de cien temas, catorce juegos y ninguna inscripción.", "https://www.german-games.net/", ["Alemán", "Juegos"]),
  r("Learn German With Games", "Idiomas", "Vocabulario, género, verbos y gramática A1–B1.", "https://www.learngermanwithgames.com/", ["Alemán", "Gramática"]),
  r("Conjuguemos", "Idiomas", "Conjugación y juegos en nueve idiomas; permite practicar sin cuenta.", "https://conjuguemos.com/", ["Verbos", "Idiomas"], "opcional"),
  r("LingoHut", "Idiomas", "Lecciones y juegos en más de sesenta idiomas sin login.", "https://www.lingohut.com/en", ["Idiomas", "Audio"]),
  r("GamesForLanguage", "Idiomas", "Juegos rápidos de español, francés, inglés, alemán e italiano.", "https://www.gamesforlanguage.com/", ["Idiomas", "Juegos"]),
  r("HelpfulGames German", "Idiomas", "Juegos escolares de vocabulario y gramática alemana.", "https://www.helpfulgames.com/subjects/german/", ["Alemán", "Escuela"]),
  r("Calico Spanish Games", "Idiomas", "Juegos gratuitos de vocabulario español para niños.", "https://calicospanish.com/learn-spanish-online-games/", ["Español", "Niños"]),

  // Finanzas y economía
  r("NGPF Arcade", "Finanzas", "Colección de juegos gratuitos sobre dinero y decisiones financieras.", "https://www.ngpf.org/arcade/", ["Finanzas", "Juegos"]),
  r("Build Your Stax", "Finanzas", "Comprime veinte años de decisiones de inversión en veinte minutos.", "https://buildyourstax.com/", ["Inversión", "Juego"]),
  r("Payback", "Finanzas", "Equilibra universidad, trabajo, bienestar y deuda estudiantil.", "https://www.timeforpayback.com/", ["Deuda", "Narrativo"]),
  r("SPENT", "Finanzas", "Toma decisiones difíciles con un presupuesto familiar limitado.", "https://playspent.org/", ["Presupuesto", "Decisiones"]),
  r("Financial Football", "Finanzas", "Responde preguntas financieras mientras juegas fútbol americano.", "https://www.practicalmoneyskills.com/en/play/financial_football.html", ["Dinero", "Deporte"]),
  r("The Uber Game", "Finanzas", "Simulación periodística sobre ingresos y decisiones de un conductor.", "https://ig.ft.com/uber-game/", ["Trabajo", "Economía"]),
  r("EconArena", "Finanzas", "Juegos de economía, mercados y toma de decisiones.", "https://www.econarena.com/", ["Economía", "Mercados"]),
  r("Econiverse", "Finanzas", "Actividades interactivas de economía para estudiantes.", "https://www.econiverse.org/", ["Economía", "Educativo"]),
  r("Intertwined Finance", "Finanzas", "Simulaciones de finanzas personales y decisiones económicas.", "https://www.intertwinedfinance.com/", ["Finanzas", "Simulación"]),
  r("The Fiscal Ship", "Finanzas", "Construye un presupuesto y controla la deuda pública.", "https://fiscalship.org/", ["Presupuesto", "Gobierno"]),
  r("Cleveland Fed Games", "Finanzas", "Trueque, presupuestos, ahorro e historia bancaria.", "https://www.clevelandfed.org/financial-literacy-resources", ["Ahorro", "Economía"]),
  r("ProjectionLab", "Finanzas", "Modela patrimonio, metas, jubilación y futuros financieros.", "https://projectionlab.com/", ["Planificación", "Escenarios"], "mixto"),
  r("FI Calc", "Finanzas", "Prueba estrategias de jubilación contra datos históricos.", "https://ficalc.app/", ["Retiro", "Histórico"]),
  r("Investopedia Simulator", "Finanzas", "Practica compraventa de acciones con dinero virtual.", "https://www.investopedia.com/simulator/", ["Bolsa", "Trading"], "mixto"),
  r("OptionStrat", "Finanzas", "Visualiza riesgo y beneficio de estrategias con opciones.", "https://optionstrat.com/", ["Opciones", "Riesgo"], "mixto"),
  r("CME Trading Simulator", "Finanzas", "Practica futuros y estrategias con datos de mercado.", "https://www.cmegroup.com/education/practice/about-the-trading-simulator", ["Futuros", "Mercado"], "mixto"),

  // Geografía, historia y cultura
  r("World Geography Games", "Geografía e historia", "Países, capitales, banderas, ríos y continentes.", "https://world-geography-games.com/", ["Geografía", "Mapas"]),
  r("Lizard Point", "Geografía e historia", "Cuestionarios de mapas, países, capitales e historia.", "https://lizardpoint.com/", ["Mapas", "Quiz"]),
  r("Seterra", "Geografía e historia", "Juegos de mapas y geografía de todo el mundo.", "https://www.geoguessr.com/quiz/seterra", ["Mapas", "Países"], "opcional"),
  r("MapChart", "Geografía e historia", "Crea y colorea mapas políticos e históricos.", "https://www.mapchart.net/", ["Mapas", "Crear"]),
  r("Google Earth", "Geografía e historia", "Explora el planeta, ciudades, relieve y recorridos.", "https://earth.google.com/web/", ["Tierra", "3D"]),
  r("Google Arts & Culture", "Geografía e historia", "Museos, obras, sitios históricos y experiencias culturales.", "https://artsandculture.google.com/", ["Arte", "Historia"]),
  r("British Museum Collection", "Geografía e historia", "Explora objetos y periodos de la historia humana.", "https://www.britishmuseum.org/collection", ["Museo", "Historia"]),
  r("iCivics", "Geografía e historia", "Juegos sobre gobierno, democracia, leyes y ciudadanía.", "https://www.icivics.org/games", ["Ciudadanía", "Gobierno"]),
  r("Ducksters History Games", "Geografía e historia", "Historia y geografía mediante juegos y cuestionarios.", "https://www.ducksters.com/games/", ["Historia", "Niños"]),
  r("National Geographic Kids", "Geografía e historia", "Juegos y actividades de animales, ciencia y geografía.", "https://kids.nationalgeographic.com/games", ["Geografía", "Niños"]),
  r("City Guesser", "Geografía e historia", "Adivina ciudades mediante videos reales.", "https://virtualvacation.us/guess", ["Ciudades", "Video"]),
  r("Guess Where You Are", "Geografía e historia", "Alternativa gratuita e ilimitada para adivinar ubicaciones.", "https://guesswhereyouare.com/", ["Ubicaciones", "Street View"]),
  r("Worldle", "Geografía e historia", "Identifica países por su silueta.", "https://worldle.teuteuf.fr/", ["Países", "Diario"]),
  r("Globle", "Geografía e historia", "Encuentra el país secreto mediante pistas de distancia.", "https://globle-game.com/", ["Países", "Distancia"]),
  r("Travle", "Geografía e historia", "Construye una ruta entre países limítrofes.", "https://travle.earth/", ["Rutas", "Países"]),
  r("GeoGames", "Geografía e historia", "Países, capitales, banderas, formas y mapas.", "https://geogames.io/", ["Mapas", "Banderas"]),
  r("JetPunk", "Geografía e historia", "Miles de cuestionarios públicos de geografía y cultura.", "https://www.jetpunk.com/", ["Quiz", "Cultura"], "opcional"),
  r("PurposeGames", "Geografía e historia", "Mapas, anatomía, ciencias e historia creados por la comunidad.", "https://www.purposegames.com/", ["Quiz", "Comunidad"], "opcional"),
  r("MapCrunch", "Geografía e historia", "Exploración aleatoria de lugares mediante Street View.", "https://www.mapcrunch.com/", ["Street View", "Explorar"]),
  r("Trivia Plaza", "Geografía e historia", "Cuestionarios de geografía, historia, ciencia, música y cine.", "https://www.triviaplaza.com/", ["Trivia", "Cultura"]),
  r("Flagle", "Geografía e historia", "Identifica una bandera mediante fragmentos.", "https://www.flagle.io/", ["Banderas", "Diario"]),
  r("Sporcle", "Geografía e historia", "Cuestionarios de cultura general, mapas, historia y ciencia.", "https://www.sporcle.com/", ["Quiz", "Trivia"], "opcional"),
  r("Hide and Seek World", "Geografía e historia", "Escondite multijugador utilizando ubicaciones del mundo.", "https://hideandseek.world/", ["Multijugador", "Mapa"], "opcional"),

  // Sociedad y ciudadanía
  r("Parable of the Polygons", "Sociedad y ciudadanía", "Simulación de segregación producida por pequeños sesgos.", "https://ncase.me/polygons/", ["Sesgo", "Sociedad"]),
  r("The Evolution of Trust", "Sociedad y ciudadanía", "Cooperación, engaño y teoría de juegos.", "https://ncase.me/trust/", ["Confianza", "Decisiones"]),
  r("Sabiduría o locura de las masas", "Sociedad y ciudadanía", "Redes sociales, contagio y comportamiento colectivo.", "https://ncase.me/crowds/es.html", ["Redes", "Sociedad"]),
  r("LOOPY", "Sociedad y ciudadanía", "Crea simulaciones mediante ciclos de causa y efecto.", "https://ncase.me/loopy/", ["Sistemas", "Causalidad"]),
  r("To Build a Better Ballot", "Sociedad y ciudadanía", "Compara sistemas electorales de manera interactiva.", "https://ncase.me/ballot/", ["Elecciones", "Gobierno"]),
  r("We Become What We Behold", "Sociedad y ciudadanía", "Simulación breve sobre medios y ciclos sociales.", "https://ncase.me/wbwwb/", ["Medios", "Sociedad"]),
  r("Bill of Rights Institute Games", "Sociedad y ciudadanía", "Federalismo, Congreso, burocracia y derechos civiles.", "https://billofrightsinstitute.org/games/", ["Gobierno", "Derechos"]),
  r("HelpfulGames Civics", "Sociedad y ciudadanía", "Juegos escolares sobre civismo y ciudadanía.", "https://www.helpfulgames.com/subjects/civics/", ["Civismo", "Escuela"]),
  r("Journey 2050", "Sociedad y ciudadanía", "Gestiona agricultura, agua, economía y seguridad alimentaria.", "https://www.journey2050.com/2050-games/", ["Agricultura", "Futuro"]),

  // Arte, música y creación
  r("Chrome Music Lab", "Arte y música", "Experimentos musicales de ritmo, armonía, ondas y melodía.", "https://musiclab.chromeexperiments.com/", ["Música", "Experimentos"]),
  r("Song Maker", "Arte y música", "Crea melodías y ritmos sobre una cuadrícula visual.", "https://musiclab.chromeexperiments.com/Song-Maker/", ["Música", "Componer"]),
  r("Kandinsky", "Arte y música", "Convierte dibujos y formas en sonidos.", "https://musiclab.chromeexperiments.com/Kandinsky/", ["Dibujo", "Sonido"]),
  r("Chrome Rhythm", "Arte y música", "Experimenta con patrones rítmicos y percusión.", "https://musiclab.chromeexperiments.com/Rhythm/", ["Ritmo", "Música"]),
  r("AutoDraw", "Arte y música", "Dibujo asistido que reconoce trazos y propone ilustraciones.", "https://www.autodraw.com/", ["Dibujo", "IA"]),
  r("Quick, Draw!", "Arte y música", "Reta a una red neuronal a reconocer tus dibujos.", "https://quickdraw.withgoogle.com/", ["Dibujo", "IA"]),
  r("Paint With Music", "Arte y música", "Transforma trazos, colores y paisajes en música.", "https://artsandculture.google.com/experiment/paint-with-music/YAGuJyDB-XbbWg", ["Pintura", "Música"]),
  r("Blob Opera", "Arte y música", "Compón armonías controlando cuatro voces animadas.", "https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw", ["Voz", "Música"]),
  r("Kleki", "Arte y música", "Editor de pintura y dibujo que funciona directamente en web.", "https://kleki.com/", ["Dibujo", "Pintura"]),
  r("Patatap", "Arte y música", "Crea animaciones y sonidos utilizando el teclado.", "https://patatap.com/", ["Sonido", "Animación"]),
  r("Sampulator", "Arte y música", "Secuenciador musical rápido controlado con el teclado.", "https://sampulator.com/", ["Ritmo", "Sampler"]),
  r("OpenDAW", "Arte y música", "Estudio musical completo sin registro ni suscripción.", "https://opendaw.org/en", ["DAW", "Producción"]),
  r("BeepBox", "Arte y música", "Composición musical y guardado mediante URL.", "https://www.beepbox.co/", ["Música", "Secuenciador"]),
  r("Musicca Instruments", "Arte y música", "Piano, guitarra, bajo, violín, batería y xilófono virtuales.", "https://www.musicca.com/instruments", ["Instrumentos", "Música"]),
  r("ButtonBass", "Arte y música", "Sintetizadores, cajas de ritmos y producción musical.", "https://www.buttonbass.com/", ["Beats", "Sintetizador"]),
  r("Piskel", "Arte y música", "Editor de sprites animados y pixel art.", "https://www.piskelapp.com/", ["Pixel art", "Animación"]),
  r("Silk", "Arte y música", "Dibujo generativo y simétrico en pantalla completa.", "https://weavesilk.com/", ["Generativo", "Dibujo"]),
  r("Photopea", "Arte y música", "Edición avanzada de imágenes directamente en el navegador.", "https://www.photopea.com/", ["Imagen", "Editor"]),
  r("Incredibox Web Demo", "Arte y música", "Crea mezclas musicales con personajes de beatbox.", "https://www.incredibox.com/demo/", ["Beatbox", "Demo"], "mixto"),
  r("JS Paint", "Arte y música", "Recreación moderna de Microsoft Paint.", "https://jspaint.app/", ["Dibujo", "Retro"]),
  r("Sketchpad", "Arte y música", "Dibujo, pintura, vectores y texto en el navegador.", "https://sketch.io/sketchpad/", ["Dibujo", "Vectores"]),
  r("SculptGL", "Arte y música", "Escultura 3D como arcilla virtual.", "https://stephaneginier.com/sculptgl/", ["Escultura", "3D"]),
  r("Blockbench Web", "Arte y música", "Modelos 3D, texturas y animaciones low-poly.", "https://web.blockbench.net/", ["Modelado", "3D"]),
  r("drumbit", "Arte y música", "Caja de ritmos y secuenciador en el navegador.", "https://drumbit.app/", ["Batería", "Ritmo"]),
  r("Virtual Drumming", "Arte y música", "Baterías virtuales y juegos de ritmo.", "https://www.virtualdrumming.com/drums/online-virtual-games/online-virtual-games-drums.html", ["Batería", "Juego"]),

  // Educativos infantiles
  r("PBS KIDS Games", "Educativos infantiles", "Juegos educativos de ciencia, lectura, creatividad y matemáticas.", "https://pbskids.org/games/", ["Niños", "Educativo"]),
  r("ABCya", "Educativos infantiles", "Juegos escolares por grado y área de aprendizaje.", "https://www.abcya.com/", ["Primaria", "Juegos"], "mixto"),
  r("Funbrain", "Educativos infantiles", "Juegos de matemáticas, lectura y resolución de problemas.", "https://www.funbrain.com/games", ["Niños", "Escuela"]),
  r("Toy Theater", "Educativos infantiles", "Manipulativos, juegos, arte y actividades para primaria.", "https://toytheater.com/", ["Primaria", "Creatividad"]),
  r("Starfall", "Educativos infantiles", "Lectura, fonética y matemáticas para primeros grados.", "https://www.starfall.com/h/", ["Lectura", "Primaria"], "mixto"),
  r("Sheppard Software", "Educativos infantiles", "Juegos de ciencia, geografía, animales y matemáticas.", "https://www.sheppardsoftware.com/", ["Niños", "Educativo"]),
  r("Smithsonian STEM Game Center", "Educativos infantiles", "Juegos y simulaciones STEM revisados por especialistas.", "https://ssec.si.edu/game-center", ["STEM", "Smithsonian"]),
  r("Science Museum Games", "Educativos infantiles", "Juegos científicos del Science Museum Group.", "https://www.sciencemuseum.org.uk/games-and-apps", ["Ciencia", "Museo"]),
  r("MERLOT Simulations", "Educativos infantiles", "Colección abierta de simulaciones y materiales educativos.", "https://www.merlot.org/merlot/materials.htm?category=2178", ["Educación", "Colección"], "mixto"),

  // Transporte y navegación
  r("GeoFS", "Transporte", "Simulador de vuelo mundial con terreno satelital y clima.", "https://www.geo-fs.com/geofs.php", ["Vuelo", "Mundo"]),
  r("Google Earth Flight Simulator", "Transporte", "Pilota sobre paisajes y ciudades de Google Earth.", "https://earth.google.com/web/", ["Vuelo", "3D"]),
  r("ATC-SIM", "Transporte", "Gestiona aproximaciones y despegues desde una torre de control.", "https://atc-sim.com/", ["Aviación", "Control"]),
  r("Slow Roads", "Transporte", "Conduce por carreteras procedurales con clima y paisajes infinitos.", "https://slowroads.io/", ["Conducción", "Procedural"]),
  r("Shipmap", "Transporte", "Observa el movimiento del comercio marítimo mundial.", "https://www.shipmap.org/", ["Barcos", "Datos"]),

  // Emergencias y riesgo
  r("Stop Disasters!", "Emergencias", "Diseña comunidades resistentes a tsunamis, incendios y terremotos.", "https://www.stopdisastersgame.org/", ["Desastres", "Estrategia"]),
  r("Solve the Outbreak", "Emergencias", "Investiga epidemias y toma decisiones como un detective del CDC.", "https://www.cdc.gov/digital-social-media-tools/mobile/applications/sto/sto-web.html", ["Epidemias", "CDC"]),
  r("Asteroid Launcher", "Emergencias", "Calcula cráter, onda expansiva, calor y víctimas de un impacto.", "https://neal.fun/asteroid-launcher/", ["Asteroides", "Mapa"]),
  r("Impact Earth", "Emergencias", "Calculadora científica de impactos de asteroides.", "https://www.purdue.edu/impactearth/", ["Impacto", "Ciencia"]),
  r("Down2Earth", "Emergencias", "Simulador de formación de cráteres disponible en español.", "https://down2earth.eu/impact_calculator/", ["Cráteres", "Español"]),
  r("Project IMPACT", "Emergencias", "Impactos y estrategias para desviar asteroides.", "https://www.asteroidstrike.earth/", ["Mitigación", "Asteroides"]),
  r("COVID-19 Simulator", "Emergencias", "Prueba cómo las interacciones y la prevención alteran un contagio.", "https://ncase.me/covid-19/", ["Salud", "Sistemas"]),

  // Juegos recreativos
  r("GamePix", "Juegos recreativos", "Portal de juegos HTML5 de acción, puzles, deportes y estrategia.", "https://www.gamepix.com/", ["HTML5", "Portal"]),
  r("CrazyGames", "Juegos recreativos", "Amplio catálogo de juegos gratuitos para navegador.", "https://www.crazygames.com/", ["Portal", "Juegos"], "opcional"),
  r("Addicting Games", "Juegos recreativos", "Juegos casuales, acción, estrategia y habilidad.", "https://www.addictinggames.com/", ["Casual", "Portal"]),
  r("Plays.org", "Juegos recreativos", "Miles de juegos HTML5 para computador y móvil.", "https://plays.org/", ["HTML5", "Portal"], "opcional"),
  r("Armor Games", "Juegos recreativos", "Aventuras, estrategia, acción y juegos independientes.", "https://armorgames.com/", ["Estrategia", "Portal"], "opcional"),
  r("Y8", "Juegos recreativos", "Gran catálogo de juegos de navegador por categorías.", "https://www.y8.com/", ["Portal", "Multijugador"], "opcional"),
  r("247 Games", "Juegos recreativos", "Solitario, sudoku, mahjong, cartas y puzles.", "https://www.247games.com/", ["Clásicos", "Puzles"]),
  r("itch.io Browser Games", "Juegos recreativos", "Juegos independientes gratuitos que se ejecutan en el navegador.", "https://itch.io/games/free/platform-web", ["Indie", "Web"], "opcional"),
  r("Game Jolt", "Juegos recreativos", "Juegos independientes y comunidades de creadores.", "https://gamejolt.com/games", ["Indie", "Comunidad"], "mixto"),
  r("Newgrounds Games", "Juegos recreativos", "Juegos independientes y experimentales publicados por la comunidad.", "https://www.newgrounds.com/games", ["Indie", "Comunidad"], "opcional"),
  r("Internet Archive DOS Games", "Juegos recreativos", "Clásicos de DOS emulados directamente en el navegador.", "https://archive.org/details/softwarelibrary_msdos_games", ["Retro", "Emulación"]),
  r("ClassicReload", "Juegos recreativos", "Juegos antiguos de DOS y Windows ejecutables en web.", "https://classicreload.com/", ["Retro", "Clásicos"]),
  r("Little Alchemy 2", "Juegos recreativos", "Combina elementos y descubre cientos de objetos nuevos.", "https://littlealchemy2.com/", ["Creativo", "Puzle"]),
  r("Lichess", "Juegos recreativos", "Ajedrez gratuito contra personas, amigos o computadora.", "https://lichess.org/", ["Ajedrez", "Estrategia"], "opcional"),
  r("TETR.IO", "Juegos recreativos", "Juego moderno de bloques con modos individual y multijugador.", "https://tetr.io/", ["Bloques", "Multijugador"], "opcional"),
  r("skribbl.io", "Juegos recreativos", "Dibujo y adivinanzas multijugador mediante salas privadas.", "https://skribbl.io/", ["Dibujo", "Multijugador"]),
  r("CardGames.io", "Juegos recreativos", "Cartas y juegos de mesa sin registro.", "https://cardgames.io/", ["Cartas", "Clásicos"]),
  r("FreeBoardGames.org", "Juegos recreativos", "Ajedrez, damas y juegos contra IA, locales o por enlace.", "https://www.freeboardgames.org/", ["Mesa", "Código abierto"]),
  r("BuddyBoardGames", "Juegos recreativos", "Partidas con amigos sin iniciar sesión ni descargar.", "https://buddyboardgames.com/", ["Mesa", "Amigos"]),
  r("Solitr", "Juegos recreativos", "Solitario gratuito sin registro.", "https://www.solitr.com/", ["Solitario", "Cartas"]),
  r("Friv", "Juegos recreativos", "Colección familiar sin descargas ni compras dentro del juego.", "https://www.friv.com/", ["Familia", "Portal"]),
  r("Playhop", "Juegos recreativos", "Portal con miles de juegos de navegador sin login.", "https://playhop.com/", ["Portal", "HTML5"]),
  r("The Jigsaw Puzzles", "Juegos recreativos", "Miles de rompecabezas gratuitos en línea.", "https://thejigsawpuzzles.com/", ["Rompecabezas", "Fotos"], "opcional"),
  r("Daily Jigsaw Puzzles", "Juegos recreativos", "Rompecabezas familiares sin descarga ni registro.", "https://www.dailyjigsawpuzzles.net/", ["Rompecabezas", "Diario"]),
  r("Jigsaw Explorer", "Juegos recreativos", "Rompecabezas, imágenes propias y modo multijugador.", "https://www.jigsawexplorer.com/", ["Rompecabezas", "Multijugador"]),
  r("A Dark Room", "Juegos recreativos", "Aventura minimalista de supervivencia y exploración.", "https://adarkroom.doublespeakgames.com/", ["Aventura", "Texto"]),
  r("Candy Box 2", "Juegos recreativos", "Aventura incremental con exploración y acertijos.", "https://candybox2.github.io/", ["Incremental", "Aventura"]),
  r("Universal Paperclips", "Juegos recreativos", "Simulación incremental de producción y automatización.", "https://www.decisionproblem.com/paperclips/index2.html", ["Incremental", "Estrategia"]),
  r("Townscaper Web", "Juegos recreativos", "Demostración gratuita para construir ciudades costeras.", "https://oskarstalberg.com/Townscaper/", ["Construcción", "Creativo"], "mixto"),
];

export const accessMeta: Record<Access, { label: string; short: string }> = {
  directo: { label: "Acceso directo, sin cuenta", short: "Sin cuenta" },
  opcional: { label: "Se puede probar sin cuenta; cuenta opcional para guardar", short: "Cuenta opcional" },
  mixto: { label: "Acceso gratuito limitado, descarga o cuenta en algunas funciones", short: "Acceso mixto" },
};

export const categories = Object.keys(categoryMeta) as Category[];
