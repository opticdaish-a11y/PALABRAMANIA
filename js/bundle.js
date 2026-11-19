// js/bundle.js - Motor Full-Screen Móvil con Tablero Rectangular Dinámico, Desafío Diario, Blitz, Misterio, Aventura (2 Mundos), Fondos y Música

(function () {
    'use strict';

    // ==========================================
    // 1. CONSTANTES, FONDOS Y BANCO DE NIVELES
    // ==========================================
    const SPANISH_LETTER_FREQUENCY = 'AAAAAAAAAEEEEEEEEEEIIIIIIOOOOOOOUUUUUUBBCDDEEEFFGGHHIIJKLLLMNNNÑÑOOOPQRRRSSSTTTUVXYZ';

    const PASTEL_CAPSULE_COLORS = [
        '#5eead4', // Turquesa
        '#fca5a5', // Coral
        '#86efac', // Lima
        '#f0abfc', // Lavanda
        '#a5b4fc', // Índigo
        '#fde047', // Amarillo
        '#fdba74', // Melocotón
        '#93c5fd'  // Azul cielo
    ];

    const BG_THEMES = {
        montanas: {
            name: 'Montañas',
            url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'
        },
        hojas: {
            name: 'Hojas Rocío',
            url: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&auto=format&fit=crop&q=80'
        },
        atardecer: {
            name: 'Atardecer',
            url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&auto=format&fit=crop&q=80'
        },
        playa: {
            name: 'Playa',
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80'
        },
        cerezos: {
            name: 'Cerezos',
            url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&auto=format&fit=crop&q=80'
        },
        aurora: {
            name: 'Aurora',
            url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&auto=format&fit=crop&q=80'
        }
    };

    const DAILY_QUOTES = [
        {
            author: 'GABRIEL CELAYA',
            template: '"La {POESIA} es un {ARMA} cargada de {FUTURO}, una {LLAVE} para {CONSTRUIR} {PUENTES}."',
            words: ['POESIA', 'ARMA', 'FUTURO', 'LLAVE', 'CONSTRUIR', 'PUENTES']
        },
        {
            author: 'MIGUEL DE CERVANTES',
            template: '"El que {LEE} mucho y {ANDA} mucho, {MIRA} mucho y {SABE} de {VERDAD} la {VIDA}."',
            words: ['LEE', 'ANDA', 'MIRA', 'SABE', 'VERDAD', 'VIDA']
        },
        {
            author: 'PABLO NERUDA',
            template: '"Podrán {CORTAR} todas las {FLORES}, pero no podrán {DETENER} jamás la {PRIMAVERA}."',
            words: ['CORTAR', 'FLORES', 'DETENER', 'PRIMAVERA', 'CAMPO', 'AROMA']
        },
        {
            author: 'GABRIEL GARCÍA MÁRQUEZ',
            template: '"La {VIDA} no es la que uno {VIVIO}, sino la que {RECUERDA} para {CONTAR} su {HISTORIA}."',
            words: ['VIDA', 'VIVIO', 'RECUERDA', 'CONTAR', 'HISTORIA', 'TIEMPO']
        },
        {
            author: 'FRIDA KAHLO',
            template: '"Pies, para qué los {QUIERO} si tengo {ALAS} para {VOLAR} hacia un {MUNDO} de {COLOR}."',
            words: ['QUIERO', 'ALAS', 'VOLAR', 'MUNDO', 'COLOR', 'SUENO']
        },
        {
            author: 'ANTONIO MACHADO',
            template: '"Caminante, no hay {CAMINO}, se hace {CAMINO} al {ANDAR} sobre el {MAR} y la {TIERRA}."',
            words: ['CAMINO', 'ANDAR', 'MAR', 'TIERRA', 'PASO', 'HUELLA']
        },
        {
            author: 'JORGE LUIS BORGES',
            template: '"Siempre {IMAGINE} que el {PARAISO} sería algún {TIPO} de gran {REINO} con {LIBROS} y {LETRAS}."',
            words: ['IMAGINE', 'PARAISO', 'TIPO', 'REINO', 'LIBROS', 'LETRAS']
        },
        {
            author: 'OCTAVIO PAZ',
            template: '"La {PALABRA} es el {PUENTE} entre el {SILENCIO} del {ALMA} y la {LUZ} del {MUNDO}."',
            words: ['PALABRA', 'PUENTE', 'SILENCIO', 'ALMA', 'LUZ', 'MUNDO']
        },
        {
            author: 'MARIO BENEDETTI',
            template: '"Cuando {CREIAMOS} tener todas las {CLAVES}, cambiaron las {PREGUNTAS} del {JUEGO}."',
            words: ['CREIAMOS', 'CLAVES', 'PREGUNTAS', 'JUEGO', 'MENTE', 'RETO']
        },
        {
            author: 'JULIO CORTÁZAR',
            template: '"Andábamos sin {BUSCAR} pero {SABIENDO} que {ANDABAMOS} para {ENCONTRAR} la {MAGIA}."',
            words: ['BUSCAR', 'SABIENDO', 'ANDABAMOS', 'ENCONTRAR', 'MAGIA', 'AZAR']
        }
    ];

    const ADVENTURE_LEVELS = [
        // MUNDO 1: EXPEDICIÓN SALVAJE
        {
            id: 1, world: 'Mundo 1: Expedición Salvaje', title: "El Rey de la Sabana", biome: "Sabana Africana",
            words: ["LEON", "MELENA", "RUGIDO", "SABANA", "CAZA", "MANADA"], difficulty: "facil",
            reward: {
                id: "card_leon", name: "León Africano", scientific: "Panthera leo", rarity: "Raro", rarityColor: "#3b82f6",
                image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
                context: "Conocido como el Rey de la Selva, es el único felino que vive en manadas familiares. Su rugido se escucha a más de 8 km.", basePoints: 250
            }
        },
        {
            id: 2, world: 'Mundo 1: Expedición Salvaje', title: "Guardianes de la Selva", biome: "Selva Tropical",
            words: ["TIGRE", "RAYAS", "SELVA", "GARRA", "SIGILO", "AGIL"], difficulty: "facil",
            reward: {
                id: "card_tigre", name: "Tigre de Bengala", scientific: "Panthera tigris", rarity: "Épico", rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
                context: "Excelente nadador y cazador solitario. Sus rayas son únicas en cada individuo, como las huellas dactilares humanas.", basePoints: 300
            }
        },
        {
            id: 3, world: 'Mundo 1: Expedición Salvaje', title: "Gigantes Nobles", biome: "Planicie Africana",
            words: ["ELEFANTE", "TROMPA", "MARFIL", "MEMORIA", "OREJAS", "GIGANTE", "AGUA"], difficulty: "medio",
            reward: {
                id: "card_elefante", name: "Elefante de la Sabana", scientific: "Loxodonta africana", rarity: "Raro", rarityColor: "#3b82f6",
                image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&auto=format&fit=crop&q=80",
                context: "Memoria prodigiosa capaz de recordar rutas de agua durante décadas. Su trompa tiene más de 40.000 músculos.", basePoints: 350
            }
        },
        {
            id: 4, world: 'Mundo 1: Expedición Salvaje', title: "Señores del Cielo", biome: "Cumbres Rocosas",
            words: ["AGUILA", "PLUMAS", "VUELO", "NIDO", "PICO", "GARRA", "ALTURA"], difficulty: "medio",
            reward: {
                id: "card_aguila", name: "Águila Real", scientific: "Aquila chrysaetos", rarity: "Épico", rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&auto=format&fit=crop&q=80",
                context: "Puede divisar presas a más de 3 km de distancia mientras planea. Al descender en picado supera los 240 km/h.", basePoints: 400
            }
        },
        {
            id: 5, world: 'Mundo 1: Expedición Salvaje', title: "Océano Inteligente", biome: "Mar Abierto",
            words: ["DELFIN", "OCEANO", "ECO", "SALTO", "ALETA", "SONAR", "CORAL", "AZUL"], difficulty: "medio",
            reward: {
                id: "card_delfin", name: "Delfín Mular", scientific: "Tursiops truncatus", rarity: "Raro", rarityColor: "#3b82f6",
                image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=800&auto=format&fit=crop&q=80",
                context: "Utilizan ecolocalización de alta precisión para 'ver' bajo el agua mediante el sonido. Duermen con un hemisferio cerebral a la vez.", basePoints: 450
            }
        },
        {
            id: 6, world: 'Mundo 1: Expedición Salvaje', title: "Espíritu de la Nieve", biome: "Bosque Boreal",
            words: ["LOBO", "AULLIDO", "BOSQUE", "ALFA", "NIEVE", "MANADA", "NOCHE", "LUNA"], difficulty: "medio",
            reward: {
                id: "card_lobo", name: "Lobo Ártico", scientific: "Canis lupus arctos", rarity: "Épico", rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=800&auto=format&fit=crop&q=80",
                context: "Sobrevive a temperaturas de hasta -50 °C. Su aullido sirve para cohesionar la manada y marcar territorio en la tundra.", basePoints: 500
            }
        },
        {
            id: 7, world: 'Mundo 1: Expedición Salvaje', title: "El Pacifista de Bambú", biome: "Montañas de Niebla",
            words: ["PANDA", "BAMBU", "CHINA", "OSO", "BLANCO", "NEGRO", "BOSQUE", "RAMA"], difficulty: "dificil",
            reward: {
                id: "card_panda", name: "Oso Panda Gigante", scientific: "Ailuropoda melanoleuca", rarity: "Legendario", rarityColor: "#f59e0b",
                image: "https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=800&auto=format&fit=crop&q=80",
                context: "Pasa de 12 a 16 horas diarias comiendo bambú. Posee un 'falso pulgar' que le ayuda a sostener los tallos con destreza.", basePoints: 600
            }
        },
        {
            id: 8, world: 'Mundo 1: Expedición Salvaje', title: "El Leviatán del Abismo", biome: "Gran Fosa Marina",
            words: ["BALLENA", "AZUL", "MARES", "CANTO", "GIGANTE", "ABISMO", "KRILL", "PROFUNDO"], difficulty: "dificil",
            reward: {
                id: "card_ballena", name: "Ballena Azul", scientific: "Balaenoptera musculus", rarity: "Legendario", rarityColor: "#f59e0b",
                image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&auto=format&fit=crop&q=80",
                context: "Su corazón es del tamaño de un coche pequeño y su lengua pesa tanto como un elefante. Su canto viaja cientos de kilómetros.", basePoints: 700
            }
        },
        // MUNDO 2: MARAVILLAS DEL PLANETA
        {
            id: 9, world: 'Mundo 2: Maravillas del Planeta', title: "El Gran Cañón", biome: "Arizona, EE.UU.",
            words: ["CANON", "ROCA", "RIO", "DESIERTO", "VALLE", "ROJO", "SOL", "ABISMO"], difficulty: "medio",
            reward: {
                id: "card_canon", name: "Gran Cañón", scientific: "Garganta del Colorado", rarity: "Épico", rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&auto=format&fit=crop&q=80",
                context: "Esculpido por el río Colorado durante millones de años, expone casi 2.000 millones de años de historia geológica de la Tierra.", basePoints: 750
            }
        },
        {
            id: 10, world: 'Mundo 2: Maravillas del Planeta', title: "Luces del Polo Norte", biome: "Islandia",
            words: ["AURORA", "HIELO", "POLO", "NOCHE", "VERDE", "CIELO", "FRIO", "ESTRELLA"], difficulty: "medio",
            reward: {
                id: "card_aurora", name: "Aurora Boreal", scientific: "Fenómeno Solar", rarity: "Legendario", rarityColor: "#f59e0b",
                image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80",
                context: "Cortinas luminosas provocadas por partículas solares que chocan contra el campo magnético terrestre en las regiones polares.", basePoints: 800
            }
        },
        {
            id: 11, world: 'Mundo 2: Maravillas del Planeta', title: "Jardín Submarino", biome: "Australia",
            words: ["CORAL", "ARRECIFE", "PEZ", "TURQUESA", "ISLA", "MAR", "TROPICO", "VIDA"], difficulty: "dificil",
            reward: {
                id: "card_coral", name: "Gran Barrera de Coral", scientific: "Ecosistema Marino", rarity: "Épico", rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&auto=format&fit=crop&q=80",
                context: "El arrecife más grande del planeta, con más de 2.300 km de longitud. Es la única estructura viva visible desde el espacio.", basePoints: 900
            }
        },
        {
            id: 12, world: 'Mundo 2: Maravillas del Planeta', title: "La Cumbre Sagrada", biome: "Japón",
            words: ["FUJI", "MONTE", "VOLCAN", "NIEVE", "CEREZO", "JAPON", "NUBE", "PAZ"], difficulty: "dificil",
            reward: {
                id: "card_fuji", name: "Monte Fuji", scientific: "Estratovolcán (3.776 m)", rarity: "Legendario", rarityColor: "#f59e0b",
                image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&auto=format&fit=crop&q=80",
                context: "Cono volcánico casi perfectamente simétrico cubierto de nieve gran parte del año; símbolo sagrado de la cultura japonesa.", basePoints: 1200
            }
        }
    ];

    const CLASSIC_CATEGORIES = {
        animales: { id: 'animales', name: 'Reino Animal', icon: '🦁', words: ['LEON', 'TIGRE', 'ELEFANTE', 'JIRAFA', 'DELFIN', 'BALLENA', 'AGUILA', 'HALCON', 'PINGUINO', 'CANGURO', 'KOALA', 'LEOPARDO', 'PANDA', 'CEBRA', 'CAMALEON', 'COLIBRI', 'LOBO', 'ZORRO', 'JAGUAR', 'TORTUGA', 'PANTERA', 'GORILA'] },
        paises: { id: 'paises', name: 'Países', icon: '🌎', words: ['MEXICO', 'ESPANA', 'ARGENTINA', 'COLOMBIA', 'CHILE', 'PERU', 'BRASIL', 'CANADA', 'FRANCIA', 'ITALIA', 'ALEMANIA', 'JAPON', 'AUSTRALIA', 'PORTUGAL', 'URUGUAY', 'ECUADOR', 'GRECIA', 'EGIPTO', 'SUIZA', 'NORUEGA', 'SUECIA'] },
        tecnologia: { id: 'tecnologia', name: 'Mundo Tech', icon: '💻', words: ['ALGORITMO', 'INTERNET', 'ROBOT', 'SATELITE', 'SOFTWARE', 'HARDWARE', 'CODIGO', 'PROGRAMA', 'DATOS', 'SERVIDOR', 'PANTALLA', 'CELULAR', 'NUBE', 'DATABASE', 'CONEXION', 'MEMORIA', 'SISTEMA', 'TECLADO', 'ROUTER', 'ARCHIVO'] },
        gastronomia: { id: 'gastronomia', name: 'Gastronomía', icon: '🍕', words: ['MANZANA', 'PLATANO', 'FRESA', 'NARANJA', 'AGUACATE', 'SANDIA', 'CEREZA', 'CHOCOLATE', 'PIZZA', 'PASTA', 'BURGUER', 'TACO', 'MANGO', 'LIMON', 'VAINILLA', 'CANELA', 'GALLETA', 'QUESO', 'PIÑA', 'PASTEL', 'HELADO', 'SUSHI'] },
        deportes: { id: 'deportes', name: 'Deportes', icon: '⚽', words: ['FUTBOL', 'BASKET', 'NATACION', 'CICLISMO', 'TENIS', 'VOLEIBOL', 'ATLETISMO', 'BOXEO', 'KARATE', 'BEISBOL', 'GOLF', 'PATINAJE', 'ESQUI', 'RUGBY', 'GIMNASIA', 'AJEDREZ', 'SURF', 'MARATON', 'REMO', 'HOCKEY', 'JUDO'] },
        universo: { id: 'universo', name: 'Cosmos', icon: '🚀', words: ['GALAXIA', 'PLANETA', 'ESTRELLA', 'COMETA', 'ASTEROIDE', 'ORBITA', 'GRAVEDAD', 'ASTRONAUTA', 'MARTE', 'JUPITER', 'SATURNO', 'NEBULOSA', 'LUNA', 'SOL', 'ECLIPSE', 'COSMOS', 'UNIVERSO', 'METEORO'] }
    };

    function sanitizeWord(w) {
        return w.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-ZÑ]/g, '').trim();
    }

    // Generador determinista para que el Desafío Diario sea único por fecha
    function getTodayDateKey() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function hashString(str) {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        return h >>> 0;
    }

    function createSeededRng(seed) {
        let t = seed >>> 0;
        return function () {
            t += 0x6D2B79F5;
            let r = Math.imul(t ^ (t >>> 15), 1 | t);
            r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
            return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
        };
    }

    // ==========================================
    // 2. SISTEMA DE AUDIO Y MÚSICA SIN COPYRIGHT
    // ==========================================
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.enabled = localStorage.getItem('sopa_sound') !== 'false';
            this.musicGenre = localStorage.getItem('sopa_music_genre') || 'piano';
            this.musicLoop = null;
            this.musicBus = null;
            this.stepIndex = 0;
            this.isPlayingMusic = false;
            this._pausedByBackground = false;
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                    this.setupMusicBus();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended' && !document.hidden) {
                this.ctx.resume().then(() => {
                    if (this.isPlayingMusic && !this._pausedByBackground && this.musicGenre !== 'off') {
                        this.playMusicStep();
                    }
                }).catch(() => {});
            }
        }

        setupMusicBus() {
            if (!this.ctx || this.musicBus) return;
            const masterGain = this.ctx.createGain();
            masterGain.gain.value = 0.22;

            const lowpass = this.ctx.createBiquadFilter();
            lowpass.type = 'lowpass';
            lowpass.frequency.value = 1600;

            const delay = this.ctx.createDelay();
            delay.delayTime.value = 0.34;
            const feedback = this.ctx.createGain();
            feedback.gain.value = 0.28;

            lowpass.connect(masterGain);
            lowpass.connect(delay);
            delay.connect(feedback);
            feedback.connect(delay);
            delay.connect(masterGain);
            masterGain.connect(this.ctx.destination);

            this.musicBus = lowpass;
        }

        toggleSfx() {
            this.enabled = !this.enabled;
            localStorage.setItem('sopa_sound', this.enabled);
            return this.enabled;
        }

        setMusicGenre(genre) {
            this.musicGenre = genre;
            localStorage.setItem('sopa_music_genre', genre);
            this.stopMusic();
            if (genre !== 'off') this.startMusic();
        }

        startMusic() {
            if (this.musicGenre === 'off' || document.hidden) return;
            this._pausedByBackground = false;
            this.init();
            if (!this.ctx || this.isPlayingMusic) return;

            this.isPlayingMusic = true;
            this.stepIndex = 0;
            const intervals = { piano: 750, relax: 2200, lofi: 620, aventura: 480 };
            if (this.ctx.state === 'running') this.playMusicStep();
            this.musicLoop = setInterval(() => this.playMusicStep(), intervals[this.musicGenre] || 800);
        }

        stopMusic() {
            this.isPlayingMusic = false;
            if (this.musicLoop) { clearInterval(this.musicLoop); this.musicLoop = null; }
        }

        pauseForBackground() {
            if (this.isPlayingMusic) {
                this._pausedByBackground = true;
            }
            this.stopMusic();
            if (this.ctx && this.ctx.state === 'running') {
                this.ctx.suspend().catch(() => {});
            }
        }

        resumeFromBackground() {
            if (document.hidden) return;
            const shouldResume = this._pausedByBackground || (this.musicGenre !== 'off' && !this.isPlayingMusic);
            this._pausedByBackground = false;
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().then(() => {
                    if (shouldResume && this.musicGenre !== 'off' && !this.isPlayingMusic && !document.hidden) {
                        this.startMusic();
                    }
                }).catch(() => {});
            } else if (shouldResume && this.musicGenre !== 'off' && !this.isPlayingMusic) {
                this.startMusic();
            }
        }

        playTone(freq, duration, type = 'sine', vol = 0.2, attack = 0.04) {
            if (!this.ctx || !this.musicBus) return;
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.0001, now);
                gain.gain.linearRampToValueAtTime(vol, now + attack);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
                osc.connect(gain);
                gain.connect(this.musicBus);
                osc.start(now);
                osc.stop(now + duration + 0.05);
            } catch (e) {}
        }

        playMusicStep() {
            if (!this.ctx || this.ctx.state !== 'running' || this.musicGenre === 'off') return;
            const s = this.stepIndex++;

            if (this.musicGenre === 'piano') {
                const chords = [
                    [261.63, 329.63, 392.00, 493.88],
                    [220.00, 261.63, 329.63, 392.00],
                    [174.61, 220.00, 261.63, 329.63],
                    [196.00, 246.94, 293.66, 329.63]
                ];
                const chord = chords[Math.floor(s / 4) % chords.length];
                this.playTone(chord[s % 4], 1.8, 'triangle', 0.22, 0.03);
                if (s % 4 === 0) this.playTone(chord[0] / 2, 2.6, 'sine', 0.16, 0.08);
            } else if (this.musicGenre === 'relax') {
                const pads = [[146.83, 220, 293.66, 369.99], [123.47, 185, 246.94, 293.66], [196, 246.94, 293.66, 369.99]];
                pads[s % pads.length].forEach(f => this.playTone(f, 3.8, 'sine', 0.09, 0.8));
                const bells = [587.33, 739.99, 880.00, 1174.66];
                this.playTone(bells[s % bells.length], 2.2, 'sine', 0.06, 0.1);
            } else if (this.musicGenre === 'lofi') {
                const lofiChords = [[174.61, 261.63, 329.63, 440], [164.81, 246.94, 293.66, 392], [146.83, 220, 261.63, 349.23], [130.81, 196, 246.94, 329.63]];
                const c = lofiChords[Math.floor(s / 4) % lofiChords.length];
                if (s % 4 === 0) {
                    c.forEach(f => this.playTone(f, 2.1, 'sine', 0.10, 0.05));
                    this.playTone(c[0] / 2, 1.8, 'triangle', 0.18, 0.04);
                } else if (s % 2 === 1) {
                    const mel = [523.25, 587.33, 659.25, 440.00];
                    this.playTone(mel[s % mel.length], 0.7, 'sine', 0.10, 0.02);
                }
            } else if (this.musicGenre === 'aventura') {
                const scale = [392, 440, 493.88, 587.33, 659.25, 783.99];
                const pattern = [0, 2, 3, 5, 4, 3, 2, 1];
                this.playTone(scale[pattern[s % pattern.length]], 0.45, 'triangle', 0.22, 0.01);
                if (s % 4 === 0) this.playTone(196, 0.9, 'sine', 0.18, 0.02);
            }
        }

        playSelect() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const osc = this.ctx.createOscillator(), gain = this.ctx.createGain(), now = this.ctx.currentTime;
                osc.type = 'sine'; osc.frequency.setValueAtTime(540, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
                gain.gain.setValueAtTime(0.05, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain); gain.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.04);
            } catch (e) {}
        }

        playWordSuccess() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const now = this.ctx.currentTime;
                [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
                    const osc = this.ctx.createOscillator(), gain = this.ctx.createGain(), t = now + (i * 0.06);
                    osc.type = 'triangle'; osc.frequency.setValueAtTime(f, t);
                    gain.gain.setValueAtTime(0.12, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
                    osc.connect(gain); gain.connect(this.ctx.destination); osc.start(t); osc.stop(t + 0.32);
                });
            } catch (e) {}
        }

        playCardUnlock() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const now = this.ctx.currentTime;
                [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
                    const osc = this.ctx.createOscillator(), gain = this.ctx.createGain(), t = now + (i * 0.08);
                    osc.type = 'triangle'; osc.frequency.setValueAtTime(f, t);
                    gain.gain.setValueAtTime(0.15, t); gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                    osc.connect(gain); gain.connect(this.ctx.destination); osc.start(t); osc.stop(t + 0.4);
                });
            } catch (e) {}
        }

        playHint() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const now = this.ctx.currentTime, osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
                osc.type = 'sine'; osc.frequency.setValueAtTime(880, now); osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
                gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain); gain.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.15);
            } catch (e) {}
        }

        playError() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const now = this.ctx.currentTime, osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
                osc.type = 'sawtooth'; osc.frequency.setValueAtTime(180, now); osc.frequency.linearRampToValueAtTime(120, now + 0.15);
                gain.gain.setValueAtTime(0.08, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain); gain.connect(this.ctx.destination); osc.start(now); osc.stop(now + 0.15);
            } catch (e) {}
        }
    }
    const sound = new SoundEngine();

    // ==========================================
    // 3. GENERADOR RECTANGULAR MÓVIL (MAXIMIZADO PARA PANTALLAS VERTICALES)
    // ==========================================
    const DIRECTIONS = {
        H_LR: [0, 1], H_RL: [0, -1], V_TB: [1, 0], V_BT: [-1, 0],
        D_DR: [1, 1], D_DL: [1, -1], D_UR: [-1, 1], D_UL: [-1, -1]
    };

    const PRESETS = {
        blitz: { cols: 7, rows: 8, count: 5, dirs: [DIRECTIONS.H_LR, DIRECTIONS.V_TB, DIRECTIONS.D_DR] },
        facil: { cols: 8, rows: 9, count: 6, dirs: [DIRECTIONS.H_LR, DIRECTIONS.V_TB] },
        medio: { cols: 9, rows: 10, count: 7, dirs: [DIRECTIONS.H_LR, DIRECTIONS.V_TB, DIRECTIONS.D_DR, DIRECTIONS.D_UR] },
        dificil: { cols: 10, rows: 12, count: 9, dirs: Object.values(DIRECTIONS) }
    };

    class Generator {
        static createRandom(fullWordList, difficulty = 'medio', rng = Math.random) {
            const config = PRESETS[difficulty] || PRESETS.medio;
            const maxLen = Math.max(config.cols, config.rows);
            const cleaned = fullWordList
                .map(w => sanitizeWord(w))
                .filter(w => w.length >= 3 && w.length <= maxLen);

            // Fisher-Yates con rng (aleatorio o con semilla diaria)
            const copy = [...cleaned];
            for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(rng() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
            }
            const selected = copy.slice(0, config.count);
            return this.buildBoard(selected, difficulty, rng);
        }

        static createFixed(words, difficulty = 'medio', rng = Math.random) {
            const cleaned = words.map(w => sanitizeWord(w));
            return this.buildBoard(cleaned, difficulty, rng);
        }

        static buildBoard(words, difficulty, rng = Math.random) {
            const config = PRESETS[difficulty] || PRESETS.medio;
            const cols = config.cols;
            const rows = config.rows;
            const dirs = config.dirs;

            const sorted = [...words].filter(w => w.length <= Math.max(cols, rows)).sort((a, b) => b.length - a.length);
            const grid = Array.from({ length: rows }, () => Array(cols).fill(''));
            const placed = [];

            for (const word of sorted) {
                const res = this.placeWord(grid, word, rows, cols, dirs, rng);
                if (res) placed.push(res);
            }

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (grid[r][c] === '') {
                        const idx = Math.floor(rng() * SPANISH_LETTER_FREQUENCY.length);
                        grid[r][c] = SPANISH_LETTER_FREQUENCY[idx];
                    }
                }
            }

            return {
                grid,
                rows,
                cols,
                difficulty,
                wordsToFind: placed.map(p => p.word),
                placedWords: placed
            };
        }

        static placeWord(grid, word, rows, cols, dirs, rng) {
            const len = word.length;
            for (let attempt = 0; attempt < 200; attempt++) {
                const dir = dirs[Math.floor(rng() * dirs.length)];
                const [dr, dc] = dir;

                let minR = 0, maxR = rows - 1;
                let minC = 0, maxC = cols - 1;

                if (dr > 0) maxR = rows - len;
                else if (dr < 0) minR = len - 1;
                if (dc > 0) maxC = cols - len;
                else if (dc < 0) minC = len - 1;

                if (minR > maxR || minC > maxC) continue;

                const sr = Math.floor(rng() * (maxR - minR + 1)) + minR;
                const sc = Math.floor(rng() * (maxC - minC + 1)) + minC;

                let fits = true;
                const cells = [];

                for (let i = 0; i < len; i++) {
                    const r = sr + (i * dr);
                    const c = sc + (i * dc);
                    const char = word[i];
                    if (grid[r][c] !== '' && grid[r][c] !== char) {
                        fits = false;
                        break;
                    }
                    cells.push({ r, c, char });
                }

                if (fits) {
                    cells.forEach(c => { grid[c.r][c.c] = c.char; });
                    return {
                        word,
                        start: { r: sr, c: sc },
                        end: { r: sr + ((len - 1) * dr), c: sc + ((len - 1) * dc) },
                        cells: cells.map(c => ({ r: c.r, c: c.c }))
                    };
                }
            }
            return null;
        }

        static getLineCells(r1, c1, r2, c2) {
            const dr = r2 - r1;
            const dc = c2 - c1;
            const isH = dr === 0 && dc !== 0;
            const isV = dc === 0 && dr !== 0;
            const isDiag = Math.abs(dr) === Math.abs(dc) && dr !== 0;

            if (!isH && !isV && !isDiag) return null;

            const sr = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
            const sc = dc === 0 ? 0 : (dc > 0 ? 1 : -1);
            const steps = Math.max(Math.abs(dr), Math.abs(dc));

            const cells = [];
            for (let i = 0; i <= steps; i++) {
                cells.push({ r: r1 + (i * sr), c: c1 + (i * sc) });
            }
            return cells;
        }
    }

    // ==========================================
    // 4. STORAGE, MONEDAS, TEMAS, RACHA Y RANKING
    // ==========================================
    const DEFAULT_LEADERBOARD = [
        { rank: 1, name: "Valentina_Pro", country: "🇲🇽", points: 8450, badge: "Maestro Supremo", avatar: "🦁" },
        { rank: 2, name: "Marcos_Wordle", country: "🇪🇸", points: 7200, badge: "Cazador Legendario", avatar: "⚡" },
        { rank: 3, name: "Camila_Sopa", country: "🇨🇱", points: 6100, badge: "Experto Táctico", avatar: "🦊" },
        { rank: 4, name: "Lucas_Gamer", country: "🇦🇷", points: 5350, badge: "Explorador", avatar: "🚀" },
        { rank: 5, name: "Sofia_Puzzles", country: "🇨🇴", points: 4800, badge: "Explorador", avatar: "🐼" },
        { rank: 6, name: "Mateo_99", country: "🇵🇪", points: 3950, badge: "Aprendiz", avatar: "🐶" },
        { rank: 7, name: "Daniela_CR", country: "🇨🇷", points: 3100, badge: "Aprendiz", avatar: "🧙‍♂️" }
    ];

    class AuthManager {
        static hashPassword(str) {
            // Hash determinista con sal para no guardar contraseñas en texto plano
            let h1 = 0xdeadbeef ^ str.length, h2 = 0x41c6ce57 ^ str.length;
            for (let i = 0; i < str.length; i++) {
                const ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
        }

        static getUsers() {
            try {
                const raw = localStorage.getItem('sopa_users_db');
                return raw ? JSON.parse(raw) : {};
            } catch (e) { return {}; }
        }

        static saveUsers(db) {
            try { localStorage.setItem('sopa_users_db', JSON.stringify(db)); } catch (e) {}
        }

        static getSession() {
            return localStorage.getItem('sopa_current_session'); // null | 'guest' | email
        }

        static register(email, password, nickname) {
            const cleanEmail = email.trim().toLowerCase();
            if (!cleanEmail.includes('@') || password.length < 4) {
                return { ok: false, error: 'Ingresa un correo válido y contraseña de al menos 4 caracteres.' };
            }
            const db = this.getUsers();
            if (db[cleanEmail]) {
                return { ok: false, error: 'Este correo ya está registrado. Inicia sesión en su lugar.' };
            }

            db[cleanEmail] = {
                passwordHash: this.hashPassword(password),
                createdAt: Date.now()
            };
            this.saveUsers(db);

            // Migrar progreso previo de invitado si es la primera cuenta creada en este dispositivo
            const hadLegacy = localStorage.getItem('sopa_pro_profile');
            localStorage.setItem('sopa_current_session', cleanEmail);

            if (hadLegacy && Object.keys(db).length === 1) {
                ['sopa_pro_profile', 'sopa_unlocked_cards', 'sopa_adv_progress', 'sopa_daily_state'].forEach(base => {
                    const val = localStorage.getItem(base);
                    if (val) localStorage.setItem(`${base}__${cleanEmail}`, val);
                });
            }

            const prof = Storage.getProfile();
            if (nickname && nickname.trim()) {
                prof.name = nickname.trim();
                Storage.saveProfile(prof);
            }
            return { ok: true, email: cleanEmail };
        }

        static login(email, password) {
            const cleanEmail = email.trim().toLowerCase();
            const db = this.getUsers();
            const user = db[cleanEmail];
            if (!user) {
                return { ok: false, error: 'No existe una cuenta con ese correo.' };
            }
            if (user.passwordHash !== this.hashPassword(password)) {
                return { ok: false, error: 'Contraseña incorrecta.' };
            }
            localStorage.setItem('sopa_current_session', cleanEmail);
            return { ok: true, email: cleanEmail };
        }

        static continueAsGuest() {
            localStorage.setItem('sopa_current_session', 'guest');
        }

        static logout() {
            localStorage.removeItem('sopa_current_session');
        }
    }

    class Storage {
        static key(base) {
            const session = AuthManager.getSession();
            if (session && session !== 'guest') {
                return `${base}__${session}`;
            }
            return base;
        }

        static getProfile() {
            try {
                const raw = localStorage.getItem(this.key('sopa_pro_profile'));
                if (raw) {
                    const p = JSON.parse(raw);
                    if (p.coins === undefined) p.coins = 250;
                    if (p.freeHints === undefined) p.freeHints = 3;
                    return p;
                }
            } catch (e) {}
            return { name: 'Cazapalabras', avatar: '🦊', rank: 'Novato', totalScore: 0, coins: 250, freeHints: 3 };
        }

        static saveProfile(p) {
            try { localStorage.setItem(this.key('sopa_pro_profile'), JSON.stringify(p)); } catch (e) {}
        }

        static addScoreAndCoins(scorePts, coinsEarned) {
            const p = this.getProfile();
            p.totalScore = (p.totalScore || 0) + scorePts;
            p.coins = (p.coins || 0) + coinsEarned;
            if (p.totalScore >= 7500) p.rank = 'Maestro Supremo';
            else if (p.totalScore >= 4500) p.rank = 'Cazador Legendario';
            else if (p.totalScore >= 2000) p.rank = 'Experto Táctico';
            else if (p.totalScore >= 800) p.rank = 'Explorador';
            this.saveProfile(p);
            return p;
        }

        static spendCoins(amount) {
            const p = this.getProfile();
            if ((p.coins || 0) < amount) return false;
            p.coins -= amount;
            this.saveProfile(p);
            return true;
        }

        static getTheme() {
            return localStorage.getItem('sopa_bg_theme') || 'montanas';
        }

        static saveTheme(key) {
            localStorage.setItem('sopa_bg_theme', key);
        }

        static getUnlockedCards() {
            try {
                const raw = localStorage.getItem(this.key('sopa_unlocked_cards'));
                return raw ? JSON.parse(raw) : [];
            } catch (e) { return []; }
        }

        static unlockCard(cardId) {
            const list = this.getUnlockedCards();
            if (!list.includes(cardId)) {
                list.push(cardId);
                try { localStorage.setItem(this.key('sopa_unlocked_cards'), JSON.stringify(list)); } catch (e) {}
            }
            return list;
        }

        static getAdventureProgress() {
            try {
                const raw = localStorage.getItem(this.key('sopa_adv_progress'));
                return raw ? JSON.parse(raw) : { maxLevel: 1, levelStars: {} };
            } catch (e) { return { maxLevel: 1, levelStars: {} }; }
        }

        static saveAdventureProgress(levelId, stars) {
            const p = this.getAdventureProgress();
            if (levelId >= p.maxLevel) p.maxLevel = Math.min(levelId + 1, ADVENTURE_LEVELS.length);
            p.levelStars[levelId] = Math.max(p.levelStars[levelId] || 0, stars);
            try { localStorage.setItem(this.key('sopa_adv_progress'), JSON.stringify(p)); } catch (e) {}
            return p;
        }

        static getDailyState() {
            try {
                const raw = localStorage.getItem(this.key('sopa_daily_state'));
                return raw ? JSON.parse(raw) : { lastCompletedDate: null, lastGiftDate: null, streak: 0 };
            } catch (e) { return { lastCompletedDate: null, lastGiftDate: null, streak: 0 }; }
        }

        static saveDailyState(s) {
            try { localStorage.setItem(this.key('sopa_daily_state'), JSON.stringify(s)); } catch (e) {}
        }

        static getLeaderboard() {
            const profile = this.getProfile();
            const list = [...DEFAULT_LEADERBOARD];
            list.push({
                rank: 0,
                name: `${profile.name} (Tú)`,
                country: "🌎",
                points: profile.totalScore || 0,
                badge: profile.rank,
                avatar: profile.avatar,
                isUser: true
            });
            list.sort((a, b) => b.points - a.points);
            list.forEach((item, index) => { item.rank = index + 1; });
            return list;
        }
    }

    // ==========================================
    // 5. MULTIJUGADOR P2P (PÚBLICO SIN CLAVE + PRIVADO CON CLAVE)
    // ==========================================
    const PUBLIC_SLOTS = ['pm-pub-v2-1', 'pm-pub-v2-2', 'pm-pub-v2-3', 'pm-pub-v2-4', 'pm-pub-v2-5'];
    const PEER_CONFIG = {
        debug: 0,
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                { urls: 'stun:stun.cloudflare.com:3478' },
                {
                    urls: 'turn:openrelay.metered.ca:80',
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                },
                {
                    urls: 'turn:openrelay.metered.ca:443',
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                },
                {
                    urls: 'turn:openrelay.metered.ca:443?transport=tcp',
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                }
            ]
        }
    };

    class Multiplayer {
        constructor(handlers) {
            this.h = handlers;
            this.peer = null;
            this.conn = null;
            this.isHost = false;
            this.code = null;
            this.status = 'IDLE'; // IDLE | SCANNING | WAITING | PLAYING
            this.isPublic = false;
            this.rivalProfile = null;
            this.scanTimeout = null;
            this.joinTimeout = null;
            this.botOfferTimer = null;
            this.rescanTimer = null;
        }

        /**
         * Busca jugadores online en salas públicas sin necesidad de clave
         */
        findPublicMatch(puzzleFactory) {
            this.disconnect();
            if (!window.Peer) {
                this.h.onError('Sin conexión para multijugador.');
                return;
            }

            this.status = 'SCANNING';
            this.isPublic = true;
            this.h.onSearchStart();

            const scanPeerId = `pm-scan-${Date.now()}-${Math.floor(Math.random() * 99999)}`;
            const scanPeer = new window.Peer(scanPeerId, PEER_CONFIG);
            this.peer = scanPeer;

            const unavailableSlots = new Set();
            const probeConns = [];
            let matched = false;

            scanPeer.on('error', (err) => {
                if (err && err.type === 'peer-unavailable' && err.message) {
                    const slot = PUBLIC_SLOTS.find(s => err.message.includes(s));
                    if (slot) unavailableSlots.add(slot);
                }
            });

            scanPeer.on('open', () => {
                if (this.status !== 'SCANNING') return;

                // Sondear los 5 slots públicos en paralelo
                PUBLIC_SLOTS.forEach((slotId) => {
                    try {
                        const c = scanPeer.connect(slotId, { reliable: true });
                        probeConns.push(c);

                        c.on('data', (d) => {
                            if (matched || this.status !== 'SCANNING') {
                                try { c.close(); } catch (e) {}
                                return;
                            }
                            if (d && d.type === 'SLOT_STATUS') {
                                if (d.state === 'WAITING') {
                                    matched = true;
                                    clearTimeout(this.scanTimeout);
                                    this.status = 'PLAYING';
                                    this.isHost = false;
                                    this.conn = c;

                                    // Cerrar los demás sondeos
                                    probeConns.forEach(other => {
                                        if (other !== c) try { other.close(); } catch (e) {}
                                    });

                                    this.wire();
                                    c.send({ type: 'CLAIM_PUBLIC', profile: Storage.getProfile() });
                                } else {
                                    try { c.close(); } catch (e) {}
                                }
                            }
                        });
                    } catch (e) {}
                });

                // Esperar hasta 4.2s para dar tiempo a WebRTC/ICE en redes móviles
                this.scanTimeout = setTimeout(() => {
                    if (matched || this.status !== 'SCANNING') return;
                    probeConns.forEach(c => { try { c.close(); } catch (e) {} });
                    try { scanPeer.destroy(); } catch (e) {}

                    const freeSlot = PUBLIC_SLOTS.find(s => unavailableSlots.has(s)) || PUBLIC_SLOTS[0];
                    this.hostPublicSlot(freeSlot, puzzleFactory);
                }, 4200);
            });
        }

        hostPublicSlot(slotId, puzzleFactory) {
            if (this.status !== 'SCANNING') return;
            this.isHost = true;
            this.status = 'WAITING';
            this.isPublic = true;

            const hostPeer = new window.Peer(slotId, PEER_CONFIG);
            this.peer = hostPeer;

            hostPeer.on('open', () => {
                if (this.status !== 'WAITING') return;
                this.h.onSearchWaiting();
                this.botOfferTimer = setTimeout(() => {
                    if (this.status === 'WAITING') this.h.onBotOfferReady();
                }, 8000);

                // Si estamos en un slot > 0, revisar periódicamente si hay otro jugador esperando en un slot menor
                const myIdx = PUBLIC_SLOTS.indexOf(slotId);
                if (myIdx > 0) {
                    this.rescanTimer = setTimeout(() => {
                        if (this.status !== 'WAITING') return;
                        this.tryJoinLowerSlot(myIdx, puzzleFactory);
                    }, 3500);
                }
            });

            hostPeer.on('disconnected', () => {
                if (this.status === 'WAITING' && !hostPeer.destroyed) {
                    try { hostPeer.reconnect(); } catch (e) {}
                }
            });

            hostPeer.on('connection', (c) => {
                const sendStatus = () => {
                    if (this.status !== 'WAITING') {
                        try { c.send({ type: 'SLOT_STATUS', state: 'BUSY' }); } catch (e) {}
                        setTimeout(() => { try { c.close(); } catch (e) {} }, 200);
                        return;
                    }
                    try { c.send({ type: 'SLOT_STATUS', state: 'WAITING' }); } catch (e) {}
                };
                if (c.open) sendStatus();
                else c.on('open', sendStatus);

                c.on('data', (d) => {
                    if (d && d.type === 'CLAIM_PUBLIC') {
                        if (this.status !== 'WAITING') {
                            try { c.send({ type: 'SLOT_STATUS', state: 'BUSY' }); c.close(); } catch (e) {}
                            return;
                        }
                        clearTimeout(this.botOfferTimer);
                        clearTimeout(this.rescanTimer);
                        this.status = 'PLAYING';
                        this.conn = c;
                        this.rivalProfile = d.profile;
                        this.wire();

                        const puzzle = puzzleFactory();
                        this.startMatch(puzzle);
                    }
                });
            });

            hostPeer.on('error', (err) => {
                if (err.type === 'unavailable-id' && this.status === 'WAITING') {
                    clearTimeout(this.botOfferTimer);
                    clearTimeout(this.rescanTimer);
                    const idx = PUBLIC_SLOTS.indexOf(slotId);
                    const nextSlot = PUBLIC_SLOTS[(idx + 1) % PUBLIC_SLOTS.length];
                    try { hostPeer.destroy(); } catch (e) {}
                    this.status = 'SCANNING';
                    this.hostPublicSlot(nextSlot, puzzleFactory);
                }
            });
        }

        tryJoinLowerSlot(myIdx, puzzleFactory) {
            if (this.status !== 'WAITING' || !this.peer) return;
            const lowerSlots = PUBLIC_SLOTS.slice(0, myIdx);
            lowerSlots.forEach((targetSlot) => {
                if (this.status !== 'WAITING') return;
                try {
                    const c = this.peer.connect(targetSlot, { reliable: true });
                    c.on('data', (d) => {
                        if (this.status !== 'WAITING') {
                            try { c.close(); } catch (e) {}
                            return;
                        }
                        if (d && d.type === 'SLOT_STATUS' && d.state === 'WAITING') {
                            clearTimeout(this.botOfferTimer);
                            clearTimeout(this.rescanTimer);
                            this.status = 'PLAYING';
                            this.isHost = false;
                            this.conn = c;
                            this.wire();
                            c.send({ type: 'CLAIM_PUBLIC', profile: Storage.getProfile() });
                        } else {
                            try { c.close(); } catch (e) {}
                        }
                    });
                } catch (e) {}
            });
        }

        createRoom() {
            this.disconnect();
            const rawCode = Math.random().toString(36).substring(2, 6).toUpperCase().padEnd(4, 'X');
            this.code = rawCode;
            this.isHost = true;
            this.isPublic = false;
            this.status = 'WAITING';

            if (window.Peer) {
                this.peer = new window.Peer('sopa-match-' + this.code, PEER_CONFIG);
                this.peer.on('open', () => {
                    if (this.status === 'WAITING') this.h.onCreated(this.code);
                });
                this.peer.on('disconnected', () => {
                    if (this.status === 'WAITING' && this.peer && !this.peer.destroyed) {
                        try { this.peer.reconnect(); } catch (e) {}
                    }
                });
                this.peer.on('connection', (c) => {
                    if (this.conn && this.conn.open) {
                        try { c.close(); } catch (e) {}
                        return;
                    }
                    this.conn = c;
                    this.wire();
                });
                this.peer.on('error', (err) => {
                    if (err.type === 'unavailable-id') this.createRoom();
                    else this.h.onError('No se pudo crear la sala. Revisa tu conexión a internet.');
                });
            } else this.h.onError('Sin conexión para multijugador.');
        }

        joinRoom(code) {
            this.disconnect();
            this.code = code.trim().toUpperCase();
            if (!this.code) return;
            this.isHost = false;
            this.isPublic = false;
            this.status = 'WAITING';

            if (!window.Peer) {
                this.h.onError('Sin conexión para multijugador.');
                return;
            }

            if (this.h.onJoining) this.h.onJoining(this.code);

            this.peer = new window.Peer('sopa-guest-' + Date.now() + '-' + Math.floor(Math.random() * 999), PEER_CONFIG);

            this.joinTimeout = setTimeout(() => {
                if (this.status === 'WAITING' && (!this.conn || !this.conn.open)) {
                    this.disconnect();
                    this.h.onError('No se pudo conectar a la sala ' + this.code + '. Verifica el código e intenta de nuevo.');
                }
            }, 15000);

            this.peer.on('open', () => {
                if (this.status !== 'WAITING') return;
                this.conn = this.peer.connect('sopa-match-' + this.code, { reliable: true });
                this.wire();
            });
            this.peer.on('error', (err) => {
                clearTimeout(this.joinTimeout);
                const msg = (err && err.type === 'peer-unavailable')
                    ? 'No se encontró la sala ' + this.code + '. Verifica que el anfitrión siga dentro.'
                    : 'Error de conexión al unirse a la sala.';
                this.disconnect();
                this.h.onError(msg);
            });
        }

        wire() {
            if (!this.conn) return;
            const handleOpen = () => {
                clearTimeout(this.joinTimeout);
                if (!this.isPublic) {
                    if (this.isHost) {
                        this.h.onJoined();
                    } else {
                        this.send({ type: 'HELLO', profile: Storage.getProfile() });
                        if (this.h.onGuestConnected) this.h.onGuestConnected();
                    }
                }
            };
            if (this.conn.open) handleOpen();
            else this.conn.on('open', handleOpen);

            this.conn.on('data', (d) => {
                if (!d || !d.type) return;
                if (d.type === 'HELLO') {
                    this.rivalProfile = d.profile;
                    this.h.onJoined(d.profile);
                }
                if (d.type === 'START') {
                    this.status = 'PLAYING';
                    this.rivalProfile = d.hostProfile;
                    this.h.onStart(d);
                }
                if (d.type === 'WORD') this.h.onWord(d);
                if (d.type === 'EMOJI') this.h.onEmoji(d.emoji);
            });
            this.conn.on('close', () => {
                if (this.status !== 'IDLE') {
                    this.h.onLeave();
                }
            });
            this.conn.on('error', () => {
                if (this.status === 'WAITING') {
                    clearTimeout(this.joinTimeout);
                    this.disconnect();
                    this.h.onError('Se perdió la conexión con la sala.');
                }
            });
        }

        send(msg) { if (this.conn && this.conn.open) this.conn.send(msg); }
        startMatch(puzzle) {
            this.status = 'PLAYING';
            this.send({ type: 'START', puzzle, hostProfile: Storage.getProfile() });
            this.h.onStart({ puzzle, hostProfile: Storage.getProfile(), guestProfile: this.rivalProfile });
        }
        sendWord(word, cells) { this.send({ type: 'WORD', word, cells }); }
        disconnect() {
            clearTimeout(this.scanTimeout);
            clearTimeout(this.joinTimeout);
            clearTimeout(this.botOfferTimer);
            clearTimeout(this.rescanTimer);
            this.status = 'IDLE';
            this.rivalProfile = null;
            if (this.conn) {
                try { this.conn.off('close'); this.conn.close(); } catch (e) {}
            }
            if (this.peer) {
                try { this.peer.destroy(); } catch (e) {}
            }
            this.conn = null;
            this.peer = null;
            this.code = null;
        }
    }

    // ==========================================
    // 6. CONTROLADOR PRINCIPAL
    // ==========================================
    class AppController {
        constructor() {
            this.mode = 'adventure'; // 'adventure' | 'classic' | 'daily' | 'blitz' | 'mystery' | 'multi'
            this.currentLevel = null;
            this.classicCategory = null;
            this.classicDiff = 'medio';
            this.puzzle = null;
            this.found = new Map();
            this.timer = null;
            this.seconds = 0;
            this.blitzScore = 0;

            this.isBotMatch = false;
            this.botTimer = null;
            this.botName = '🤖 Bot';

            this.isDragging = false;
            this.startCell = null;
            this.selectedCells = [];
            this.colorIndex = 0;

            this.multiplayer = new Multiplayer({
                onSearchStart: () => {
                    document.getElementById('lobby-init').classList.add('hidden');
                    document.getElementById('lobby-wait').classList.add('hidden');
                    document.getElementById('lobby-searching').classList.remove('hidden');
                    document.getElementById('btn-play-vs-bot').classList.add('hidden');
                    document.getElementById('search-status-msg').textContent = 'Explorando salas públicas activas...';
                },
                onSearchWaiting: () => {
                    document.getElementById('search-status-msg').textContent = 'En cola pública. Esperando otro jugador online...';
                },
                onBotOfferReady: () => {
                    document.getElementById('search-status-msg').textContent = 'Pocos jugadores libres ahora. Puedes seguir esperando o enfrentar a un Bot:';
                    document.getElementById('btn-play-vs-bot').classList.remove('hidden');
                },
                onCreated: (code) => {
                    document.getElementById('lobby-init').classList.add('hidden');
                    document.getElementById('lobby-searching').classList.add('hidden');
                    document.getElementById('lobby-wait').classList.remove('hidden');
                    document.getElementById('code-display').textContent = code;
                    document.getElementById('wait-status-msg').textContent = 'Esperando al rival...';
                    document.getElementById('btn-launch-match').classList.add('hidden');
                },
                onJoined: (prof) => {
                    const name = prof && prof.name ? prof.name : 'Rival';
                    document.getElementById('wait-status-msg').textContent = `¡${name} conectado! Listo para empezar.`;
                    document.getElementById('btn-launch-match').classList.remove('hidden');
                },
                onJoining: (code) => {
                    document.getElementById('lobby-init').classList.add('hidden');
                    document.getElementById('lobby-wait').classList.add('hidden');
                    document.getElementById('lobby-searching').classList.remove('hidden');
                    document.getElementById('btn-play-vs-bot').classList.add('hidden');
                    document.getElementById('search-status-msg').textContent = `Conectando a la sala ${code}...`;
                },
                onGuestConnected: () => {
                    document.getElementById('search-status-msg').textContent = '¡Conectado! Esperando a que el anfitrión inicie la partida...';
                },
                onStart: (d) => this.startMultiGame(d),
                onWord: (d) => this.onRivalWord(d),
                onEmoji: () => {},
                onLeave: () => this.handleRivalLeft(),
                onError: (m) => {
                    this.showNotice({ icon: '⚠️', title: 'Aviso de Sala', message: m });
                    this.resetLobbyPanels();
                }
            });

            this.applyTheme(Storage.getTheme());
            this.bindUI();
            this.renderHubInfo();
            this.startDailyCountdownLoop();
            if (!AuthManager.getSession()) {
                this.nav('auth');
            } else {
                this.checkURL();
            }
            window.addEventListener('resize', () => {
                if (this.puzzle && !document.getElementById('screen-game').classList.contains('hidden')) {
                    this.resizeBoard();
                }
            });
        }

        showNotice(opts) {
            const cfg = typeof opts === 'string' ? { message: opts } : (opts || {});
            const modal = document.getElementById('modal-notice');
            if (!modal) return;
            document.getElementById('notice-modal-title').textContent = cfg.title || 'PalabraMania';
            document.getElementById('notice-modal-icon').textContent = cfg.icon || '✨';
            document.getElementById('notice-modal-message').textContent = cfg.message || '';
            const okBtn = document.getElementById('btn-close-notice-ok');
            const xBtn = document.getElementById('btn-close-notice-x');
            okBtn.textContent = cfg.buttonText || 'Entendido';

            const close = () => {
                modal.classList.add('hidden');
                if (typeof cfg.onClose === 'function') cfg.onClose();
            };
            okBtn.onclick = close;
            xBtn.onclick = close;
            modal.onclick = (e) => { if (e.target === modal) close(); };
            modal.classList.remove('hidden');
        }

        applyTheme(themeKey) {
            const t = BG_THEMES[themeKey] || BG_THEMES.montanas;
            Storage.saveTheme(themeKey);
            document.body.style.backgroundImage = `linear-gradient(180deg, rgba(15, 23, 42, 0.22) 0%, rgba(15, 23, 42, 0.08) 45%, rgba(15, 23, 42, 0.45) 100%), url('${t.url}')`;
        }

        bindUI() {
            // Barra inferior
            document.querySelectorAll('.bottom-nav-item').forEach(item => {
                item.onclick = () => {
                    const target = item.dataset.nav;
                    if (target === 'daily') this.renderDailyScreen();
                    if (target === 'ranking') this.renderLeaderboard();
                    if (target === 'album') this.renderAlbum();
                    if (target === 'menu') this.renderHubInfo();
                    this.nav(target);
                };
            });

            document.getElementById('btn-top-back').onclick = () => {
                this.exitMultiplayerToMenu();
            };

            // Botón Gigante "Jugar Nivel X"
            document.getElementById('btn-play-current-level').onclick = () => {
                const prog = Storage.getAdventureProgress();
                const lvl = ADVENTURE_LEVELS.find(l => l.id === prog.maxLevel) || ADVENTURE_LEVELS[0];
                this.startAdventureLevel(lvl);
            };

            // Accesos Hub
            document.getElementById('btn-hub-blitz').onclick = () => this.startBlitzMode();
            document.getElementById('btn-hub-mystery').onclick = () => this.startMysteryMode();
            document.getElementById('btn-hub-themes').onclick = () => this.openSettingsModal();
            document.getElementById('btn-shop-open').onclick = () => this.openSettingsModal();
            document.getElementById('btn-coins-pill').onclick = () => this.openSettingsModal();

            document.getElementById('btn-quick-levels').onclick = () => { this.renderAdventureMap(); this.nav('adventure'); };
            document.getElementById('btn-open-more-modes').onclick = () => this.nav('modes');
            document.getElementById('btn-open-daily-gift').onclick = () => this.openDailyGiftModal();

            // Pantalla Más Modos
            document.getElementById('btn-mode-classic').onclick = () => { this.renderClassicCategories(); this.nav('categories'); };
            document.getElementById('btn-mode-blitz').onclick = () => this.startBlitzMode();
            document.getElementById('btn-mode-mystery').onclick = () => this.startMysteryMode();
            document.getElementById('btn-mode-multi').onclick = () => {
                this.mode = 'multi';
                this.resetLobbyPanels();
                this.nav('lobby');
            };
            document.getElementById('btn-mode-creator').onclick = () => this.nav('creator');

            // Desafío Diario
            document.getElementById('btn-play-daily').onclick = () => this.startDailyChallenge();

            // Botones inferiores en Juego
            document.getElementById('btn-game-daily').onclick = () => { this.stopTimer(); this.renderDailyScreen(); this.nav('daily'); };
            document.getElementById('btn-game-modes').onclick = () => { this.stopTimer(); this.nav('modes'); };
            document.getElementById('btn-game-gift').onclick = () => this.openDailyGiftModal();
            document.getElementById('btn-hint').onclick = () => this.useLetterHint();
            document.getElementById('btn-power-bolt').onclick = () => this.useWordBolt();
            document.getElementById('btn-shuffle-board').onclick = () => this.regenerateCurrentBoard();

            // Selector Dificultad Clásico
            document.querySelectorAll('.classic-diff-pill').forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.classic-diff-pill').forEach(b => {
                        b.classList.remove('active', 'bg-emerald-500', 'text-white', 'shadow');
                        b.classList.add('text-slate-600');
                    });
                    btn.classList.add('active', 'bg-emerald-500', 'text-white', 'shadow');
                    btn.classList.remove('text-slate-600');
                    this.classicDiff = btn.dataset.diff;
                };
            });

            // Modal Ajustes, Fondos y Música
            const updateSettingsUI = () => {
                const curBg = Storage.getTheme();
                document.querySelectorAll('.bg-theme-btn').forEach(b => {
                    if (b.dataset.bg === curBg) b.classList.add('border-emerald-500', 'bg-emerald-50');
                    else b.classList.remove('border-emerald-500', 'bg-emerald-50');
                });
                document.querySelectorAll('.music-genre-btn').forEach(btn => {
                    if (btn.dataset.genre === sound.musicGenre) btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
                    else btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
                });
                const sfxBtn = document.getElementById('btn-toggle-sfx');
                sfxBtn.textContent = sound.enabled ? 'Activado' : 'Desactivado';
                sfxBtn.className = sound.enabled
                    ? 'px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-500 text-white shadow transition'
                    : 'px-3.5 py-1.5 rounded-full text-xs font-black bg-slate-300 text-slate-600 transition';
            };
            this.updateSettingsUI = updateSettingsUI;

            document.getElementById('btn-sound-toggle').onclick = () => this.openSettingsModal();
            document.getElementById('btn-close-audio-modal').onclick = () => document.getElementById('modal-audio-settings').classList.add('hidden');
            document.getElementById('btn-save-audio-modal').onclick = () => document.getElementById('modal-audio-settings').classList.add('hidden');

            document.querySelectorAll('.bg-theme-btn').forEach(btn => {
                btn.onclick = () => {
                    this.applyTheme(btn.dataset.bg);
                    updateSettingsUI();
                };
            });
            document.querySelectorAll('.music-genre-btn').forEach(btn => {
                btn.onclick = () => {
                    sound.setMusicGenre(btn.dataset.genre);
                    updateSettingsUI();
                };
            });
            document.getElementById('btn-toggle-sfx').onclick = () => { sound.toggleSfx(); updateSettingsUI(); };

            if (sound.musicGenre !== 'off' && !document.hidden) {
                sound.startMusic();
            }

            const unlockEvents = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];
            const unlockAudio = () => {
                if (document.hidden) return;
                sound.init();
                if (sound.musicGenre !== 'off' && !sound.isPlayingMusic) {
                    sound.startMusic();
                }
                if (sound.ctx && sound.ctx.state === 'running') {
                    unlockEvents.forEach(ev => window.removeEventListener(ev, unlockAudio, true));
                }
            };
            unlockEvents.forEach(ev => window.addEventListener(ev, unlockAudio, { capture: true, passive: true }));

            document.addEventListener('visibilitychange', () => {
                if (document.hidden) sound.pauseForBackground();
                else sound.resumeFromBackground();
            });
            window.addEventListener('pagehide', () => sound.pauseForBackground());
            window.addEventListener('blur', () => sound.pauseForBackground());
            window.addEventListener('pageshow', () => {
                if (!document.hidden) sound.resumeFromBackground();
            });
            window.addEventListener('focus', () => {
                if (!document.hidden) sound.resumeFromBackground();
            });

            // Regalo Diario
            document.getElementById('btn-close-gift-modal').onclick = () => document.getElementById('modal-daily-gift').classList.add('hidden');
            document.getElementById('btn-claim-gift-done').onclick = () => {
                document.getElementById('modal-daily-gift').classList.add('hidden');
                this.renderHubInfo();
            };
            document.querySelectorAll('.gift-box-btn').forEach(box => {
                box.onclick = () => this.claimDailyGiftBox();
            });

            // Multijugador (Partida Pública sin Clave + Salas Privadas + Salidas X)
            const makeRandomMultiPuzzle = () => {
                const cats = Object.values(CLASSIC_CATEGORIES);
                const randomCat = cats[Math.floor(Math.random() * cats.length)];
                return Generator.createRandom(randomCat.words, 'medio');
            };

            document.getElementById('btn-find-public-match').onclick = () => {
                this.multiplayer.findPublicMatch(makeRandomMultiPuzzle);
            };
            document.getElementById('btn-play-vs-bot').onclick = () => this.startBotMatch();
            document.getElementById('btn-cancel-search').onclick = () => this.exitMultiplayerToMenu();
            document.getElementById('btn-cancel-wait').onclick = () => this.exitMultiplayerToMenu();
            document.getElementById('btn-lobby-x').onclick = () => this.exitMultiplayerToMenu();
            document.getElementById('btn-exit-multi-match').onclick = () => this.exitMultiplayerToMenu();

            document.getElementById('btn-rival-left-exit').onclick = () => this.exitMultiplayerToMenu();
            document.getElementById('btn-rival-left-x').onclick = () => this.exitMultiplayerToMenu();
            document.getElementById('btn-rival-left-solo').onclick = () => {
                document.getElementById('modal-rival-left').classList.add('hidden');
                this.multiplayer.disconnect();
                this.mode = 'classic';
                this.classicCategory = Object.values(CLASSIC_CATEGORIES)[0];
                document.getElementById('game-hud-multi').classList.add('hidden');
                document.getElementById('top-hud-title').textContent = 'Modo Solitario';
            };

            document.getElementById('btn-host-room').onclick = () => this.multiplayer.createRoom();
            document.getElementById('btn-join-match').onclick = () => {
                const c = document.getElementById('room-input-code').value;
                if (c) this.multiplayer.joinRoom(c);
            };
            document.getElementById('btn-copy-link').onclick = () => {
                const url = window.location.origin + window.location.pathname + '?sala=' + this.multiplayer.code;
                navigator.clipboard.writeText(url).then(() => this.showNotice({
                    icon: '🔗',
                    title: '¡Enlace Copiado!',
                    message: 'El enlace de invitación se copió al portapapeles. Compártelo con tu amigo.'
                }));
            };
            document.getElementById('btn-launch-match').onclick = () => {
                this.multiplayer.startMatch(makeRandomMultiPuzzle());
            };

            // Autenticación (Login / Registro con Correo y Contraseña)
            let authMode = 'login';
            const switchAuthTab = (mode) => {
                authMode = mode;
                const tabLogin = document.getElementById('tab-auth-login');
                const tabReg = document.getElementById('tab-auth-register');
                const nameField = document.getElementById('auth-name-field');
                const btnSub = document.getElementById('btn-auth-submit');
                document.getElementById('auth-error-msg').classList.add('hidden');

                if (mode === 'register') {
                    tabReg.className = 'flex-1 py-2 rounded-lg text-xs font-extrabold bg-emerald-500 text-white shadow transition';
                    tabLogin.className = 'flex-1 py-2 rounded-lg text-xs font-extrabold text-slate-600 transition';
                    nameField.classList.remove('hidden');
                    btnSub.textContent = 'Crear mi Cuenta';
                } else {
                    tabLogin.className = 'flex-1 py-2 rounded-lg text-xs font-extrabold bg-emerald-500 text-white shadow transition';
                    tabReg.className = 'flex-1 py-2 rounded-lg text-xs font-extrabold text-slate-600 transition';
                    nameField.classList.add('hidden');
                    btnSub.textContent = 'Entrar a Jugar';
                }
            };
            document.getElementById('tab-auth-login').onclick = () => switchAuthTab('login');
            document.getElementById('tab-auth-register').onclick = () => switchAuthTab('register');
            document.getElementById('btn-toggle-pass-vis').onclick = () => {
                const inp = document.getElementById('auth-input-pass');
                inp.type = inp.type === 'password' ? 'text' : 'password';
            };
            document.getElementById('form-auth').onsubmit = (e) => {
                e.preventDefault();
                const email = document.getElementById('auth-input-email').value;
                const pass = document.getElementById('auth-input-pass').value;
                const nick = document.getElementById('auth-input-name').value;
                const errEl = document.getElementById('auth-error-msg');

                const res = authMode === 'register'
                    ? AuthManager.register(email, pass, nick)
                    : AuthManager.login(email, pass);

                if (!res.ok) {
                    errEl.textContent = res.error;
                    errEl.classList.remove('hidden');
                    return;
                }
                errEl.classList.add('hidden');
                this.renderHubInfo();
                this.nav('menu');
                this.checkURL();
            };
            document.getElementById('btn-auth-guest').onclick = () => {
                AuthManager.continueAsGuest();
                this.renderHubInfo();
                this.nav('menu');
                this.checkURL();
            };

            // Perfil Modal
            document.getElementById('btn-profile-card').onclick = () => {
                const p = Storage.getProfile();
                const session = AuthManager.getSession();
                document.getElementById('prof-current-email').textContent = (session && session !== 'guest') ? session : 'Modo Invitado';
                document.getElementById('prof-input-name').value = p.name;
                document.getElementById('prof-select-avatar').value = p.avatar;
                document.getElementById('modal-profile-edit').classList.remove('hidden');
            };
            document.getElementById('btn-logout-account').onclick = () => {
                AuthManager.logout();
                document.getElementById('modal-profile-edit').classList.add('hidden');
                document.getElementById('auth-input-pass').value = '';
                this.nav('auth');
            };
            document.getElementById('btn-close-prof-modal').onclick = () => document.getElementById('modal-profile-edit').classList.add('hidden');
            document.getElementById('form-edit-profile').onsubmit = (e) => {
                e.preventDefault();
                const p = Storage.getProfile();
                p.name = document.getElementById('prof-input-name').value.trim() || 'Cazapalabras';
                p.avatar = document.getElementById('prof-select-avatar').value;
                Storage.saveProfile(p);
                this.renderHubInfo();
                document.getElementById('modal-profile-edit').classList.add('hidden');
            };

            // Modal Recompensa
            document.getElementById('btn-close-reward-modal').onclick = () => {
                document.getElementById('modal-reward-card').classList.add('hidden');
                this.renderHubInfo();
                this.nav('menu');
            };
            document.getElementById('btn-next-level').onclick = () => {
                document.getElementById('modal-reward-card').classList.add('hidden');
                if (this.currentLevel && this.currentLevel.id < ADVENTURE_LEVELS.length) {
                    this.startAdventureLevel(ADVENTURE_LEVELS.find(l => l.id === this.currentLevel.id + 1));
                } else {
                    this.renderAdventureMap();
                    this.nav('adventure');
                }
            };

            // Creador
            document.getElementById('form-create-puzzle').onsubmit = (e) => {
                e.preventDefault();
                const name = document.getElementById('custom-title').value.trim();
                const raw = document.getElementById('custom-words').value.split(/[,\n]/);
                const words = raw.map(w => sanitizeWord(w)).filter(w => w.length >= 3 && w.length <= 12);
                if (words.length < 4) {
                    this.showNotice({
                        icon: '📝',
                        title: 'Faltan Palabras',
                        message: 'Introduce al menos 4 palabras válidas (mínimo 3 letras cada una).'
                    });
                    return;
                }

                this.mode = 'classic';
                this.puzzle = Generator.createFixed(words, 'medio');
                document.getElementById('game-hud-multi').classList.add('hidden');
                document.getElementById('top-hud-title').textContent = 'Sopa Propia';
                document.getElementById('game-theme-banner').textContent = name;
                this.resetGameRound();
                this.nav('game');
            };

            this.bindGridEvents();
        }

        openSettingsModal() {
            this.updateSettingsUI();
            document.getElementById('modal-audio-settings').classList.remove('hidden');
        }

        checkURL() {
            const params = new URLSearchParams(window.location.search);
            const sala = params.get('sala');
            if (sala) {
                this.mode = 'multi';
                this.resetLobbyPanels();
                this.nav('lobby');
                document.getElementById('room-input-code').value = sala.toUpperCase();
                setTimeout(() => this.multiplayer.joinRoom(sala), 500);
            }
        }

        nav(view) {
            if (view !== 'lobby' && view !== 'game') {
                this.stopBot();
                if (this.multiplayer.status !== 'IDLE') {
                    this.multiplayer.disconnect();
                    this.resetLobbyPanels();
                }
            }
            document.querySelectorAll('.app-screen').forEach(s => s.classList.add('hidden'));
            const target = document.getElementById('screen-' + view);
            if (target) target.classList.remove('hidden');

            const isGame = view === 'game';
            const isAuth = view === 'auth';
            const header = document.querySelector('header');
            const dock = document.getElementById('bottom-nav-dock');
            const topBack = document.getElementById('btn-top-back');
            const topLevelInfo = document.getElementById('top-hud-level-info');

            if (isAuth) {
                header.classList.add('hidden');
                dock.classList.add('hidden');
            } else if (isGame) {
                header.classList.remove('hidden');
                dock.classList.add('hidden');
                topBack.classList.remove('hidden');
                topLevelInfo.classList.remove('hidden');
                setTimeout(() => this.resizeBoard(), 20);
            } else {
                header.classList.remove('hidden');
                dock.classList.remove('hidden');
                if (view === 'menu') topBack.classList.add('hidden');
                else topBack.classList.remove('hidden');
                topLevelInfo.classList.add('hidden');
            }

            // En pantalla Desafío Diario usar fondo de hojas si está en pantalla diaria, o restaurar tema
            if (view === 'daily') {
                document.body.style.backgroundImage = `linear-gradient(180deg, rgba(10, 25, 15, 0.35), rgba(10, 25, 15, 0.55)), url('${BG_THEMES.hojas.url}')`;
            } else {
                this.applyTheme(Storage.getTheme());
            }

            document.querySelectorAll('.bottom-nav-item').forEach(item => {
                if (item.dataset.nav === view) item.classList.add('active');
                else item.classList.remove('active');
            });
        }

        renderHubInfo() {
            const p = Storage.getProfile();
            const prog = Storage.getAdventureProgress();
            const unlocked = Storage.getUnlockedCards();
            const daily = Storage.getDailyState();
            const today = getTodayDateKey();

            document.getElementById('header-score').textContent = (p.coins || 0).toLocaleString();
            document.getElementById('hub-avatar').textContent = p.avatar;
            document.getElementById('hub-player-name').textContent = p.name.toUpperCase();
            document.getElementById('hub-rank-badge').textContent = `Rango: ${p.rank || 'Novato'} • ${p.totalScore || 0} pts`;

            const curLvl = ADVENTURE_LEVELS.find(l => l.id === prog.maxLevel) || ADVENTURE_LEVELS[0];
            document.getElementById('hub-world-name').textContent = curLvl.world;
            document.getElementById('hub-world-bar').style.width = `${Math.round((prog.maxLevel / ADVENTURE_LEVELS.length) * 100)}%`;
            document.getElementById('hub-world-progress-text').textContent = `${prog.maxLevel} / ${ADVENTURE_LEVELS.length}`;

            document.getElementById('hub-cards-count').textContent = `${unlocked.length}/${ADVENTURE_LEVELS.length} Cartas Rescatadas`;
            document.getElementById('hub-streak-days').textContent = `${daily.streak || 0} DÍAS`;
            document.getElementById('btn-play-level-text').textContent = `Jugar nivel ${prog.maxLevel}`;

            // Indicador de regalo diario disponible
            const giftDot = document.getElementById('gift-ready-dot');
            if (daily.lastGiftDate !== today) giftDot.classList.remove('hidden');
            else giftDot.classList.add('hidden');

            // Indicador de desafío diario nuevo
            const dailyBadge = document.getElementById('daily-nav-badge');
            if (daily.lastCompletedDate !== today) dailyBadge.classList.remove('hidden');
            else dailyBadge.classList.add('hidden');

            this.updateHintBadgeUI();
        }

        updateHintBadgeUI() {
            const p = Storage.getProfile();
            const badge = document.getElementById('hint-count-badge');
            if ((p.freeHints || 0) > 0) badge.textContent = `${p.freeHints} gratis`;
            else badge.textContent = '100🪙';
        }

        // ==========================================
        // DESAFÍO DIARIO (CADA DÍA AL AZAR POR FECHA)
        // ==========================================
        getTodayQuoteData() {
            const key = getTodayDateKey();
            const seed = hashString(key);
            const idx = seed % DAILY_QUOTES.length;
            return { key, seed, quote: DAILY_QUOTES[idx] };
        }

        renderDailyScreen() {
            const { key, quote } = this.getTodayQuoteData();
            const daily = Storage.getDailyState();
            const isDone = daily.lastCompletedDate === key;

            const d = new Date();
            const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
            const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
            document.getElementById('daily-date-ribbon').textContent = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;

            const renderedQuote = quote.template.replace(/\{([A-Z]+)\}/g, (match, word) => {
                return isDone ? `<strong class="text-emerald-600">${word}</strong>` : '_'.repeat(word.length);
            });
            document.getElementById('daily-quote-text').innerHTML = renderedQuote;
            document.getElementById('daily-quote-author').textContent = quote.author;

            const badge = document.getElementById('daily-status-badge');
            if (isDone) badge.classList.remove('hidden');
            else badge.classList.add('hidden');
        }

        startDailyChallenge() {
            const { seed, quote } = this.getTodayQuoteData();
            const rng = createSeededRng(seed);

            this.mode = 'daily';
            this.puzzle = Generator.createFixed(quote.words, 'medio', rng);
            document.getElementById('game-hud-multi').classList.add('hidden');
            document.getElementById('top-hud-title').textContent = 'Desafío Diario';
            document.getElementById('game-theme-banner').textContent = `📅 Cita de ${quote.author}`;

            this.resetGameRound();
            this.nav('game');
        }

        startDailyCountdownLoop() {
            const update = () => {
                const now = new Date();
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
                const diff = Math.max(0, Math.floor((tomorrow - now) / 1000));
                const h = String(Math.floor(diff / 3600)).padStart(2, '0');
                const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
                const s = String(diff % 60).padStart(2, '0');
                const el = document.getElementById('daily-countdown');
                if (el) el.textContent = `${h}:${m}:${s}`;
            };
            update();
            setInterval(update, 1000);
        }

        // ==========================================
        // REGALO DIARIO (3 COFRES)
        // ==========================================
        openDailyGiftModal() {
            const daily = Storage.getDailyState();
            const today = getTodayDateKey();
            if (daily.lastGiftDate === today) {
                this.showNotice({
                    icon: '🎁',
                    title: 'Regalo Diario',
                    message: 'Ya abriste tu regalo de hoy.\n¡Vuelve mañana para reclamar otro cofre!',
                    buttonText: '¡Entendido!'
                });
                return;
            }
            document.getElementById('gift-streak-text').textContent = `Racha: ${daily.streak || 0} días`;
            document.getElementById('gift-streak-bar').style.width = `${Math.min(100, ((daily.streak || 1) / 7) * 100)}%`;
            document.getElementById('gift-boxes-area').classList.remove('hidden');
            document.getElementById('gift-result-area').classList.add('hidden');
            document.getElementById('modal-daily-gift').classList.remove('hidden');
        }

        claimDailyGiftBox() {
            const rewards = [100, 150, 200, 250];
            const bonus = rewards[Math.floor(Math.random() * rewards.length)];
            const daily = Storage.getDailyState();
            daily.lastGiftDate = getTodayDateKey();
            Storage.saveDailyState(daily);
            Storage.addScoreAndCoins(bonus, bonus);

            sound.playCardUnlock();
            if (window.confetti) window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });

            document.getElementById('gift-boxes-area').classList.add('hidden');
            document.getElementById('gift-result-area').classList.remove('hidden');
            document.getElementById('gift-reward-msg').textContent = `+${bonus} Monedas 🪙`;
            this.renderHubInfo();
        }

        // ==========================================
        // NUEVAS MODALIDADES: BLITZ (60s) & MISTERIO
        // ==========================================
        startBlitzMode() {
            this.mode = 'blitz';
            this.blitzScore = 0;
            this.seconds = 60;
            this.loadNextBlitzBoard();
            this.nav('game');
        }

        loadNextBlitzBoard() {
            const cats = Object.values(CLASSIC_CATEGORIES);
            const cat = cats[Math.floor(Math.random() * cats.length)];
            this.puzzle = Generator.createRandom(cat.words, 'blitz');
            document.getElementById('game-hud-multi').classList.add('hidden');
            document.getElementById('top-hud-title').textContent = `⚡ Blitz (${this.blitzScore} pts)`;
            document.getElementById('game-theme-banner').textContent = `${cat.icon} ${cat.name} • +8s por palabra`;
            this.found.clear();
            this.colorIndex = 0;
            this.renderBoard();
            this.renderWordChips();
            this.startBlitzTimer();
        }

        startBlitzTimer() {
            if (this.timer) clearInterval(this.timer);
            const disp = document.getElementById('hud-time-display');
            disp.textContent = `${this.seconds}s`;
            this.timer = setInterval(() => {
                this.seconds--;
                disp.textContent = `${this.seconds}s`;
                if (this.seconds <= 0) {
                    this.stopTimer();
                    sound.playCardUnlock();
                    const coins = Math.max(50, Math.floor(this.blitzScore / 2));
                    Storage.addScoreAndCoins(this.blitzScore, coins);
                    this.renderHubInfo();
                    this.showNotice({
                        icon: '⚡',
                        title: '¡Tiempo Agotado!',
                        message: `Puntuación Blitz: ${this.blitzScore} pts\nGanaste +${coins} 🪙`,
                        buttonText: 'Volver al Menú',
                        onClose: () => this.nav('menu')
                    });
                }
            }, 1000);
        }

        startMysteryMode() {
            this.mode = 'mystery';
            const cats = Object.values(CLASSIC_CATEGORIES);
            const cat = cats[Math.floor(Math.random() * cats.length)];
            this.classicCategory = cat;
            this.puzzle = Generator.createRandom(cat.words, 'medio');
            document.getElementById('game-hud-multi').classList.add('hidden');
            document.getElementById('top-hud-title').textContent = '🙈 Modo Misterio';
            document.getElementById('game-theme-banner').textContent = `${cat.icon} Tema: ${cat.name}`;
            this.resetGameRound();
            this.nav('game');
        }

        // ==========================================
        // MODO CLÁSICO & MODO AVENTURA
        // ==========================================
        renderClassicCategories() {
            const grid = document.getElementById('classic-categories-grid');
            grid.innerHTML = '';
            Object.values(CLASSIC_CATEGORIES).forEach(cat => {
                const el = document.createElement('div');
                el.className = 'casual-card p-3.5 cursor-pointer flex flex-col items-center text-center transition active:scale-95';
                el.innerHTML = `
                    <span class="text-4xl mb-1.5">${cat.icon}</span>
                    <h3 class="font-extrabold text-sm text-slate-800">${cat.name}</h3>
                    <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">🎲 Al Azar</span>
                `;
                el.onclick = () => this.startClassicGame(cat);
                grid.appendChild(el);
            });
        }

        startClassicGame(category) {
            this.mode = 'classic';
            this.classicCategory = category;
            this.puzzle = Generator.createRandom(category.words, this.classicDiff);
            document.getElementById('game-hud-multi').classList.add('hidden');
            document.getElementById('top-hud-title').textContent = 'Modo Clásico';
            document.getElementById('game-theme-banner').textContent = `${category.icon} ${category.name}`;
            this.resetGameRound();
            this.nav('game');
        }

        renderAdventureMap() {
            const list = document.getElementById('adventure-levels-list');
            list.innerHTML = '';
            const prog = Storage.getAdventureProgress();
            let lastWorld = '';

            ADVENTURE_LEVELS.forEach(lvl => {
                if (lvl.world !== lastWorld) {
                    lastWorld = lvl.world;
                    const hdr = document.createElement('div');
                    hdr.className = 'text-xs font-black uppercase tracking-wider text-white bg-black/45 px-3 py-1.5 rounded-xl backdrop-blur-sm';
                    hdr.textContent = lvl.world;
                    list.appendChild(hdr);
                }
                const isUnlocked = lvl.id <= prog.maxLevel;
                const stars = prog.levelStars[lvl.id] || 0;
                const card = document.createElement('div');
                card.className = `level-card-casual ${isUnlocked ? 'unlocked' : 'locked'}`;
                card.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shadow ${stars > 0 ? 'bg-emerald-500' : (isUnlocked ? 'bg-blue-500' : 'bg-slate-400')}">
                            ${stars > 0 ? '✓' : lvl.id}
                        </div>
                        <div>
                            <div class="font-extrabold text-sm text-slate-800">${lvl.title}</div>
                            <div class="text-[11px] text-slate-500 font-semibold">${lvl.biome} • ${lvl.reward.name}</div>
                            <div class="text-amber-400 text-xs">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
                        </div>
                    </div>
                    <div>
                        ${isUnlocked ? `<span class="btn-arcade-green px-3.5 py-1.5 rounded-full text-xs font-bold inline-block">Jugar</span>` : `<span class="text-lg">🔒</span>`}
                    </div>
                `;
                if (isUnlocked) card.onclick = () => this.startAdventureLevel(lvl);
                list.appendChild(card);
            });
        }

        startAdventureLevel(level) {
            this.mode = 'adventure';
            this.currentLevel = level;
            this.puzzle = Generator.createFixed(level.words, level.difficulty);
            document.getElementById('game-hud-multi').classList.add('hidden');
            document.getElementById('top-hud-title').textContent = `Nivel ${level.id}`;
            document.getElementById('game-theme-banner').textContent = level.title;
            this.resetGameRound();
            this.nav('game');
        }

        regenerateCurrentBoard() {
            if (this.mode === 'adventure' && this.currentLevel) this.startAdventureLevel(this.currentLevel);
            else if (this.mode === 'classic' && this.classicCategory) this.startClassicGame(this.classicCategory);
            else if (this.mode === 'mystery') this.startMysteryMode();
        }

        // ==========================================
        // ÁLBUM Y RANKING
        // ==========================================
        renderAlbum() {
            const grid = document.getElementById('album-grid');
            grid.innerHTML = '';
            const unlocked = Storage.getUnlockedCards();
            document.getElementById('album-count').textContent = `${unlocked.length}/${ADVENTURE_LEVELS.length}`;

            ADVENTURE_LEVELS.forEach(lvl => {
                const r = lvl.reward;
                const isUnlocked = unlocked.includes(r.id);
                const item = document.createElement('div');
                item.className = `album-card-casual ${isUnlocked ? 'unlocked' : 'locked'}`;
                item.innerHTML = `
                    <div class="album-card-img-wrap">
                        <img src="${r.image}" alt="${r.name}" class="album-card-img ${isUnlocked ? '' : 'grayscale brightness-50'}">
                        ${!isUnlocked ? '<div class="album-lock-overlay">🔒</div>' : ''}
                    </div>
                    <div class="p-2.5">
                        <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full" style="background:${r.rarityColor}20; color:${r.rarityColor}">${r.rarity}</span>
                        <h4 class="font-extrabold text-xs text-slate-800 truncate mt-1">${isUnlocked ? r.name : '??? Bloqueado'}</h4>
                    </div>
                `;
                if (isUnlocked) item.onclick = () => this.showCardDetailModal(r);
                grid.appendChild(item);
            });
        }

        showCardDetailModal(reward) {
            document.getElementById('reward-modal-title').textContent = '📖 Ficha del Museo';
            document.getElementById('reward-card-img').src = reward.image;
            document.getElementById('reward-card-name').textContent = reward.name;
            document.getElementById('reward-card-scientific').textContent = reward.scientific;
            document.getElementById('reward-card-desc').textContent = reward.context;
            document.getElementById('reward-card-rarity').textContent = reward.rarity;
            document.getElementById('reward-card-rarity').style.color = reward.rarityColor;
            document.getElementById('reward-stars-container').classList.add('hidden');
            document.getElementById('btn-next-level').classList.add('hidden');
            document.getElementById('modal-reward-card').classList.remove('hidden');
        }

        renderLeaderboard() {
            const list = Storage.getLeaderboard();
            const container = document.getElementById('ranking-list');
            container.innerHTML = '';
            list.forEach(item => {
                const el = document.createElement('div');
                el.className = `casual-card p-3 flex items-center justify-between ${item.isUser ? 'border-2 border-emerald-500 bg-emerald-50' : ''}`;
                const medal = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`;
                el.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <span class="text-sm font-black w-7 text-center text-slate-700">${medal}</span>
                        <span class="text-2xl">${item.avatar}</span>
                        <div>
                            <div class="font-extrabold text-xs text-slate-800">${item.name} ${item.country}</div>
                            <div class="text-[10px] font-bold text-slate-500">${item.badge}</div>
                        </div>
                    </div>
                    <div class="text-amber-600 font-black text-xs font-mono">${item.points.toLocaleString()} pts</div>
                `;
                container.appendChild(el);
            });
        }

        // ==========================================
        // TABLERO RECTANGULAR FULL-SIZE + POWER-UPS
        // ==========================================
        resetGameRound() {
            this.found.clear();
            this.colorIndex = 0;
            this.updateHintBadgeUI();
            this.renderBoard();
            this.renderWordChips();
            this.startTimer();
        }

        renderBoard() {
            const gridEl = document.getElementById('puzzle-board');
            const svgEl = document.getElementById('board-svg-overlay');
            gridEl.innerHTML = '';
            svgEl.innerHTML = '';

            const { rows, cols } = this.puzzle;
            svgEl.setAttribute('viewBox', `0 0 ${cols * 100} ${rows * 100}`);

            const dragLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            dragLine.setAttribute('id', 'active-drag-line');
            dragLine.setAttribute('stroke', 'rgba(59, 130, 246, 0.72)');
            dragLine.setAttribute('stroke-width', '74');
            dragLine.setAttribute('stroke-linecap', 'round');
            dragLine.setAttribute('visibility', 'hidden');
            svgEl.appendChild(dragLine);

            gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            gridEl.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const tile = document.createElement('div');
                    tile.className = 'board-tile';
                    tile.textContent = this.puzzle.grid[r][c];
                    tile.dataset.r = r;
                    tile.dataset.c = c;
                    gridEl.appendChild(tile);
                }
            }
            this.resizeBoard();
        }

        resizeBoard() {
            const stage = document.getElementById('board-stage');
            const wrap = document.getElementById('puzzle-board-wrap');
            if (!stage || !wrap || !this.puzzle) return;

            const availW = stage.clientWidth;
            const availH = stage.clientHeight;
            if (availW <= 0 || availH <= 0) return;

            const { cols, rows } = this.puzzle;
            const cellSize = Math.floor(Math.min((availW - 18) / cols, (availH - 18) / rows));

            wrap.style.width = `${cellSize * cols + 16}px`;
            wrap.style.height = `${cellSize * rows + 16}px`;

            const fontSize = Math.max(16, Math.floor(cellSize * 0.56));
            document.querySelectorAll('.board-tile').forEach(tile => {
                tile.style.fontSize = `${fontSize}px`;
            });
        }

        renderWordChips() {
            const container = document.getElementById('word-chips-container');
            container.innerHTML = '';
            this.puzzle.wordsToFind.forEach(w => {
                const chip = document.createElement('div');
                chip.className = 'word-chip-casual';
                chip.id = 'chip-' + w;
                if (this.mode === 'mystery') {
                    chip.textContent = `${w[0]}${'_'.repeat(w.length - 1)} (${w.length})`;
                } else {
                    chip.textContent = w;
                }
                container.appendChild(chip);
            });
        }

        useLetterHint() {
            const missing = this.puzzle.placedWords.filter(p => !this.found.has(p.word));
            if (missing.length === 0) return;

            const p = Storage.getProfile();
            if ((p.freeHints || 0) > 0) {
                p.freeHints--;
                Storage.saveProfile(p);
            } else {
                if (!Storage.spendCoins(100)) {
                    this.showNotice({
                        icon: '💡',
                        title: 'Monedas Insuficientes',
                        message: 'Necesitas 100 monedas 🪙 para usar una pista.'
                    });
                    return;
                }
            }
            this.renderHubInfo();

            const target = missing[Math.floor(Math.random() * missing.length)];
            const tile = document.querySelector(`.board-tile[data-r="${target.start.r}"][data-c="${target.start.c}"]`);
            if (tile) {
                sound.playHint();
                tile.classList.add('tile-hint-flash');
                setTimeout(() => tile.classList.remove('tile-hint-flash'), 3500);
            }
        }

        useWordBolt() {
            const missing = this.puzzle.placedWords.filter(p => !this.found.has(p.word));
            if (missing.length === 0) return;
            if (!Storage.spendCoins(200)) {
                this.showNotice({
                    icon: '⚡',
                    title: 'Monedas Insuficientes',
                    message: 'Necesitas 200 monedas 🪙 para usar el Rayo Revelador.'
                });
                return;
            }
            this.renderHubInfo();
            sound.playWordSuccess();
            const target = missing[Math.floor(Math.random() * missing.length)];
            this.claim(target.word, target.cells, 'me');
            this.checkGameOver();
        }

        bindGridEvents() {
            const board = document.getElementById('puzzle-board');
            const getTile = (x, y) => {
                const el = document.elementFromPoint(x, y);
                if (el && el.classList.contains('board-tile')) return { r: parseInt(el.dataset.r), c: parseInt(el.dataset.c) };
                return null;
            };
            const onStart = (x, y) => {
                const t = getTile(x, y);
                if (!t) return;
                this.isDragging = true; this.startCell = t; this.selectedCells = [t];
                this.paintLiveDragLine(t, t); sound.playSelect();
            };
            const onMove = (x, y) => {
                if (!this.isDragging || !this.startCell) return;
                const cur = getTile(x, y);
                if (!cur) return;
                if (cur.r === this.startCell.r && cur.c === this.startCell.c) {
                    this.selectedCells = [this.startCell]; this.paintLiveDragLine(this.startCell, this.startCell); return;
                }
                const line = Generator.getLineCells(this.startCell.r, this.startCell.c, cur.r, cur.c);
                if (line) {
                    const prevCount = this.selectedCells.length;
                    this.selectedCells = line;
                    if (line.length !== prevCount) sound.playSelect();
                    this.paintLiveDragLine(this.startCell, cur);
                }
            };
            const onEnd = () => {
                if (!this.isDragging) return;
                this.isDragging = false; this.hideLiveDragLine(); this.checkSelectedWord();
                this.startCell = null; this.selectedCells = [];
            };

            board.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(e.clientX, e.clientY); });
            window.addEventListener('mousemove', (e) => { if (this.isDragging) { e.preventDefault(); onMove(e.clientX, e.clientY); } });
            window.addEventListener('mouseup', () => { if (this.isDragging) onEnd(); });

            board.addEventListener('touchstart', (e) => { if (e.touches.length === 1) { e.preventDefault(); onStart(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });
            window.addEventListener('touchmove', (e) => { if (this.isDragging && e.touches.length === 1) { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY); } }, { passive: false });
            window.addEventListener('touchend', () => { if (this.isDragging) onEnd(); });
        }

        paintLiveDragLine(cellA, cellB) {
            const dragLine = document.getElementById('active-drag-line');
            if (!dragLine) return;
            dragLine.setAttribute('x1', cellA.c * 100 + 50); dragLine.setAttribute('y1', cellA.r * 100 + 50);
            dragLine.setAttribute('x2', cellB.c * 100 + 50); dragLine.setAttribute('y2', cellB.r * 100 + 50);
            dragLine.setAttribute('visibility', 'visible');

            document.querySelectorAll('.board-tile.is-selecting').forEach(t => t.classList.remove('is-selecting'));
            this.selectedCells.forEach(c => {
                const el = document.querySelector(`.board-tile[data-r="${c.r}"][data-c="${c.c}"]`);
                if (el) el.classList.add('is-selecting');
            });
        }

        hideLiveDragLine() {
            const dragLine = document.getElementById('active-drag-line');
            if (dragLine) dragLine.setAttribute('visibility', 'hidden');
            document.querySelectorAll('.board-tile.is-selecting').forEach(t => t.classList.remove('is-selecting'));
        }

        drawPermanentCapsule(cells, colorHex) {
            const svgEl = document.getElementById('board-svg-overlay');
            const dragLine = document.getElementById('active-drag-line');
            if (!svgEl || !cells || cells.length === 0) return;

            const start = cells[0], end = cells[cells.length - 1];
            const pill = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            pill.setAttribute('x1', start.c * 100 + 50); pill.setAttribute('y1', start.r * 100 + 50);
            pill.setAttribute('x2', end.c * 100 + 50); pill.setAttribute('y2', end.r * 100 + 50);
            pill.setAttribute('stroke', colorHex); pill.setAttribute('stroke-width', '74'); pill.setAttribute('stroke-linecap', 'round');
            svgEl.insertBefore(pill, dragLine);
        }

        checkSelectedWord() {
            if (!this.selectedCells || this.selectedCells.length < 2) return;
            let fwd = '';
            this.selectedCells.forEach(c => { fwd += this.puzzle.grid[c.r][c.c]; });
            const bwd = fwd.split('').reverse().join('');

            let matched = null;
            if (this.puzzle.wordsToFind.includes(fwd) && !this.found.has(fwd)) matched = fwd;
            else if (this.puzzle.wordsToFind.includes(bwd) && !this.found.has(bwd)) matched = bwd;

            if (matched) {
                sound.playWordSuccess();
                this.claim(matched, this.selectedCells, 'me');
                if (this.mode === 'multi') this.multiplayer.sendWord(matched, this.selectedCells);
                if (this.mode === 'blitz') {
                    this.seconds += 8;
                    this.blitzScore += 50;
                    document.getElementById('top-hud-title').textContent = `⚡ Blitz (${this.blitzScore} pts)`;
                }
                this.checkGameOver();
            } else {
                sound.playError();
            }
        }

        claim(word, cells, who) {
            this.found.set(word, { who, cells });
            const color = who === 'me' ? PASTEL_CAPSULE_COLORS[this.colorIndex % PASTEL_CAPSULE_COLORS.length] : '#fbbf24';
            this.colorIndex++;
            this.drawPermanentCapsule(cells, color);

            const chip = document.getElementById('chip-' + word);
            if (chip) {
                chip.textContent = word; // Revela si era modo misterio
                chip.classList.add(who === 'me' ? 'found-me' : 'found-rival');
            }
            if (this.mode === 'multi') this.updateMultiScore();
        }

        checkGameOver() {
            if (this.found.size >= this.puzzle.wordsToFind.length) {
                if (this.mode === 'blitz') {
                    this.seconds += 15;
                    this.blitzScore += 150;
                    setTimeout(() => this.loadNextBlitzBoard(), 300);
                    return;
                }

                this.stopTimer();
                if (window.confetti) window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

                if (this.mode === 'adventure' && this.currentLevel) {
                    const stars = this.seconds <= 45 ? 3 : (this.seconds <= 90 ? 2 : 1);
                    const scoreGained = this.currentLevel.reward.basePoints + Math.max(0, 200 - this.seconds * 2);
                    const coinsEarned = 100 + (stars * 25);

                    Storage.unlockCard(this.currentLevel.reward.id);
                    Storage.saveAdventureProgress(this.currentLevel.id, stars);
                    Storage.addScoreAndCoins(scoreGained, coinsEarned);
                    this.renderHubInfo();

                    sound.playCardUnlock();
                    this.showLevelRewardModal(this.currentLevel.reward, stars, coinsEarned);
                } else if (this.mode === 'daily') {
                    sound.playCardUnlock();
                    const daily = Storage.getDailyState();
                    const today = getTodayDateKey();
                    if (daily.lastCompletedDate !== today) {
                        daily.lastCompletedDate = today;
                        daily.streak = (daily.streak || 0) + 1;
                        Storage.saveDailyState(daily);
                        Storage.addScoreAndCoins(600, 500);
                        this.renderHubInfo();
                        this.showNotice({
                            icon: '🎉',
                            title: '¡Desafío Completado!',
                            message: 'Ganaste +500 Monedas 🪙\ny aumentaste tu Racha Diaria 🔥.',
                            buttonText: '¡Genial!',
                            onClose: () => {
                                this.renderDailyScreen();
                                this.nav('daily');
                            }
                        });
                    } else {
                        this.renderHubInfo();
                        this.showNotice({
                            icon: '✅',
                            title: '¡Desafío Repasado!',
                            message: 'Completaste el desafío de hoy nuevamente con éxito.',
                            onClose: () => {
                                this.renderDailyScreen();
                                this.nav('daily');
                            }
                        });
                    }
                } else if (this.mode === 'mystery') {
                    sound.playCardUnlock();
                    Storage.addScoreAndCoins(600, 300);
                    this.renderHubInfo();
                    setTimeout(() => {
                        this.showNotice({
                            icon: '🙈',
                            title: '¡Misterio Resuelto!',
                            message: `Completado en ${this.fmtTime(this.seconds)}\n+600 pts y +300 🪙`,
                            buttonText: 'Siguiente Misterio',
                            onClose: () => this.startMysteryMode()
                        });
                    }, 350);
                } else if (this.mode === 'classic') {
                    sound.playWordSuccess();
                    const coins = this.classicDiff === 'dificil' ? 180 : (this.classicDiff === 'medio' ? 120 : 80);
                    Storage.addScoreAndCoins(coins * 2, coins);
                    this.renderHubInfo();
                    setTimeout(() => {
                        this.showNotice({
                            icon: '🎲',
                            title: '¡Sopa Completada!',
                            message: `Tiempo: ${this.fmtTime(this.seconds)}\nGanaste +${coins} 🪙`,
                            buttonText: 'Jugar Otra',
                            onClose: () => this.startClassicGame(this.classicCategory)
                        });
                    }, 350);
                } else if (this.mode === 'multi') {
                    this.stopBot();
                    sound.playWordSuccess();
                    let my = 0, riv = 0;
                    this.found.forEach(v => { if (v.who === 'me') my++; else riv++; });
                    const won = my > riv;
                    if (won) Storage.addScoreAndCoins(500, 250);
                    this.renderHubInfo();
                    setTimeout(() => {
                        const title = won ? '¡Victoria!' : (my === riv ? '¡Empate!' : 'Fin de Partida');
                        const icon = won ? '👑' : (my === riv ? '🤝' : '🥈');
                        const message = won
                            ? `Ganaste ${my} - ${riv}\n+250 Monedas 🪙`
                            : (my === riv
                                ? `Empataron ${my} - ${riv}`
                                : `Ganó ${this.isBotMatch ? this.botName : 'tu rival'} (${riv} - ${my})`);
                        this.showNotice({
                            icon,
                            title,
                            message,
                            buttonText: 'Continuar',
                            onClose: () => this.exitMultiplayerToMenu()
                        });
                    }, 350);
                }
            }
        }

        showLevelRewardModal(reward, stars, coins) {
            document.getElementById('reward-modal-title').textContent = '🎉 ¡NIVEL SUPERADO!';
            document.getElementById('reward-card-img').src = reward.image;
            document.getElementById('reward-card-name').textContent = reward.name;
            document.getElementById('reward-card-scientific').textContent = reward.scientific;
            document.getElementById('reward-card-desc').textContent = reward.context;
            document.getElementById('reward-card-rarity').textContent = reward.rarity;
            document.getElementById('reward-card-rarity').style.color = reward.rarityColor;
            document.getElementById('reward-points-badge').textContent = `+${coins} 🪙`;

            const starWrap = document.getElementById('reward-stars-container');
            starWrap.classList.remove('hidden');
            starWrap.innerHTML = '★'.repeat(stars) + '☆'.repeat(3 - stars);

            document.getElementById('btn-next-level').classList.remove('hidden');
            document.getElementById('modal-reward-card').classList.remove('hidden');
        }

        resetLobbyPanels() {
            document.getElementById('lobby-init').classList.remove('hidden');
            document.getElementById('lobby-searching').classList.add('hidden');
            document.getElementById('lobby-wait').classList.add('hidden');
            document.getElementById('btn-play-vs-bot').classList.add('hidden');
            document.getElementById('btn-launch-match').classList.add('hidden');
        }

        exitMultiplayerToMenu() {
            this.stopBot();
            this.stopTimer();
            this.isBotMatch = false;
            this.multiplayer.disconnect();
            this.resetLobbyPanels();
            document.getElementById('modal-rival-left').classList.add('hidden');
            this.renderHubInfo();
            this.nav('menu');
        }

        handleRivalLeft() {
            if (this.isBotMatch) return;
            const inGame = !document.getElementById('screen-game').classList.contains('hidden');
            const inLobby = !document.getElementById('screen-lobby').classList.contains('hidden');

            if (inGame && this.mode === 'multi') {
                this.stopTimer();
                document.getElementById('modal-rival-left').classList.remove('hidden');
            } else if (inLobby) {
                document.getElementById('wait-status-msg').textContent = 'El rival se desconectó. Esperando de nuevo...';
                document.getElementById('btn-launch-match').classList.add('hidden');
            }
        }

        startBotMatch() {
            this.multiplayer.disconnect();
            this.stopBot();
            this.isBotMatch = true;
            this.mode = 'multi';

            const bots = ['🤖 Sofía_IA', '🤖 Relámpago_IA', '🤖 Maestro_CPU'];
            this.botName = bots[Math.floor(Math.random() * bots.length)];

            const cats = Object.values(CLASSIC_CATEGORIES);
            const randomCat = cats[Math.floor(Math.random() * cats.length)];
            this.puzzle = Generator.createRandom(randomCat.words, 'medio');

            document.getElementById('game-hud-multi').classList.remove('hidden');
            document.getElementById('top-hud-title').textContent = 'Duelo vs Bot';
            document.getElementById('game-theme-banner').textContent = `${randomCat.icon} ${randomCat.name}`;

            const p = Storage.getProfile();
            document.getElementById('hud-player-name').textContent = p.name;
            document.getElementById('hud-rival-name').textContent = this.botName;
            this.updateMultiScore();
            this.resetGameRound();
            this.nav('game');

            const scheduleNextBotWord = () => {
                if (!this.isBotMatch || this.mode !== 'multi') return;
                const delay = 5500 + Math.floor(Math.random() * 4500);
                this.botTimer = setTimeout(() => {
                    if (!this.isBotMatch || this.mode !== 'multi') return;
                    const missing = this.puzzle.placedWords.filter(w => !this.found.has(w.word));
                    if (missing.length > 0) {
                        const pick = missing[Math.floor(Math.random() * missing.length)];
                        sound.playSelect();
                        this.claim(pick.word, pick.cells, 'rival');
                        this.checkGameOver();
                        if (this.found.size < this.puzzle.wordsToFind.length) {
                            scheduleNextBotWord();
                        }
                    }
                }, delay);
            };
            scheduleNextBotWord();
        }

        stopBot() {
            this.isBotMatch = false;
            if (this.botTimer) {
                clearTimeout(this.botTimer);
                this.botTimer = null;
            }
        }

        startMultiGame(data) {
            this.stopBot();
            this.isBotMatch = false;
            this.mode = 'multi';
            this.puzzle = data.puzzle;
            document.getElementById('game-hud-multi').classList.remove('hidden');
            document.getElementById('top-hud-title').textContent = 'Duelo 1 vs 1';
            document.getElementById('game-theme-banner').textContent = '⚔️ EN VIVO';

            const p = Storage.getProfile();
            const rivalProf = this.multiplayer.isHost ? data.guestProfile : data.hostProfile;
            document.getElementById('hud-player-name').textContent = p.name;
            document.getElementById('hud-rival-name').textContent = (rivalProf && rivalProf.name) ? rivalProf.name : 'Rival';
            this.updateMultiScore();
            this.resetGameRound();
            this.nav('game');
        }

        onRivalWord(d) {
            sound.playSelect();
            this.claim(d.word, d.cells, 'rival');
            this.checkGameOver();
        }

        updateMultiScore() {
            let my = 0, riv = 0;
            this.found.forEach(v => { if (v.who === 'me') my++; else riv++; });
            document.getElementById('hud-player-pts').textContent = my;
            document.getElementById('hud-rival-pts').textContent = riv;
        }

        startTimer() {
            this.seconds = 0;
            const disp = document.getElementById('hud-time-display');
            disp.textContent = '00:00';
            const start = Date.now();
            if (this.timer) clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.seconds = Math.floor((Date.now() - start) / 1000);
                disp.textContent = this.fmtTime(this.seconds);
            }, 1000);
        }

        stopTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
        fmtTime(s) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }
    }

    window.addEventListener('DOMContentLoaded', () => {
        window.app = new AppController();
    });
})();
