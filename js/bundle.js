// js/bundle.js - Motor Casual Móvil con Cápsulas SVG, Aventura, Modo Clásico Al Azar, Multijugador y Ranking

(function () {
    'use strict';

    // ==========================================
    // 1. BANCO DE NIVELES DEL MODO AVENTURA
    // ==========================================
    const SPANISH_LETTER_FREQUENCY = 'AAAAAAAAAEEEEEEEEEEIIIIIIOOOOOOOUUUUUUBBCDDEEEFFGGHHIIJKLLLMNNNÑÑOOOPQRRRSSSTTTUVXYZ';

    const PASTEL_CAPSULE_COLORS = [
        '#5eead4', // Turquesa menta
        '#fca5a5', // Salmón coral
        '#86efac', // Verde lima suave
        '#f0abfc', // Lavanda rosa
        '#a5b4fc', // Índigo pastel
        '#fde047', // Amarillo cálido
        '#fdba74', // Naranja melocotón
        '#93c5fd'  // Azul cielo
    ];

    const ADVENTURE_LEVELS = [
        {
            id: 1,
            title: "El Rey de la Sabana",
            biome: "Sabana Africana",
            words: ["LEON", "MELENA", "RUGIDO", "SABANA", "CAZA", "MANADA"],
            difficulty: "facil",
            reward: {
                id: "card_leon",
                name: "León Africano",
                scientific: "Panthera leo",
                rarity: "Raro",
                rarityColor: "#3b82f6",
                image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
                context: "Conocido como el Rey de la Selva, es el único felino que vive en manadas familiares. Su rugido se escucha a más de 8 km.",
                basePoints: 600
            }
        },
        {
            id: 2,
            title: "Guardianes de la Selva",
            biome: "Selva Tropical",
            words: ["TIGRE", "RAYAS", "SELVA", "GARRA", "SIGILO", "AGIL"],
            difficulty: "facil",
            reward: {
                id: "card_tigre",
                name: "Tigre de Bengala",
                scientific: "Panthera tigris",
                rarity: "Épico",
                rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800&auto=format&fit=crop&q=80",
                context: "Excelente nadador y cazador solitario. Sus rayas son únicas en cada individuo, como las huellas dactilares humanas.",
                basePoints: 750
            }
        },
        {
            id: 3,
            title: "Gigantes Nobles",
            biome: "Planicie Africana",
            words: ["ELEFANTE", "TROMPA", "MARFIL", "MEMORIA", "OREJAS", "GIGANTE", "AGUA"],
            difficulty: "medio",
            reward: {
                id: "card_elefante",
                name: "Elefante de la Sabana",
                scientific: "Loxodonta africana",
                rarity: "Raro",
                rarityColor: "#3b82f6",
                image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&auto=format&fit=crop&q=80",
                context: "Memoria prodigiosa capaz de recordar rutas de agua durante décadas. Su trompa tiene más de 40.000 músculos.",
                basePoints: 900
            }
        },
        {
            id: 4,
            title: "Señores del Cielo",
            biome: "Cumbres Rocosas",
            words: ["AGUILA", "PLUMAS", "VUELO", "NIDO", "PICO", "GARRA", "ALTURA"],
            difficulty: "medio",
            reward: {
                id: "card_aguila",
                name: "Águila Real",
                scientific: "Aquila chrysaetos",
                rarity: "Épico",
                rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800&auto=format&fit=crop&q=80",
                context: "Puede divisar presas a más de 3 km de distancia mientras planea. Al descender en picado supera los 240 km/h.",
                basePoints: 1050
            }
        },
        {
            id: 5,
            title: "Océano Inteligente",
            biome: "Mar Abierto",
            words: ["DELFIN", "OCEANO", "ECO", "SALTO", "ALETA", "SONAR", "CORAL", "AZUL"],
            difficulty: "medio",
            reward: {
                id: "card_delfin",
                name: "Delfín Mular",
                scientific: "Tursiops truncatus",
                rarity: "Raro",
                rarityColor: "#3b82f6",
                image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=800&auto=format&fit=crop&q=80",
                context: "Utilizan ecolocalización de alta precisión para 'ver' bajo el agua mediante el sonido. Duermen con un hemisferio cerebral a la vez.",
                basePoints: 1200
            }
        },
        {
            id: 6,
            title: "Espíritu de la Nieve",
            biome: "Bosque Boreal",
            words: ["LOBO", "AULLIDO", "BOSQUE", "ALFA", "NIEVE", "MANADA", "NOCHE", "LUNA"],
            difficulty: "medio",
            reward: {
                id: "card_lobo",
                name: "Lobo Ártico",
                scientific: "Canis lupus arctos",
                rarity: "Épico",
                rarityColor: "#8b5cf6",
                image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=800&auto=format&fit=crop&q=80",
                context: "Sobrevive a temperaturas de hasta -50 °C. Su aullido sirve para cohesionar la manada y marcar territorio en la tundra helada.",
                basePoints: 1350
            }
        },
        {
            id: 7,
            title: "El Pacifista de Bambú",
            biome: "Montañas de Niebla",
            words: ["PANDA", "BAMBU", "CHINA", "OSO", "BLANCO", "NEGRO", "BOSQUE", "RAMA"],
            difficulty: "dificil",
            reward: {
                id: "card_panda",
                name: "Oso Panda Gigante",
                scientific: "Ailuropoda melanoleuca",
                rarity: "Legendario",
                rarityColor: "#f59e0b",
                image: "https://images.unsplash.com/photo-1527118732049-c88155f2107c?w=800&auto=format&fit=crop&q=80",
                context: "Pasa de 12 a 16 horas diarias comiendo bambú. Posee un 'falso pulgar' que le ayuda a sostener los tallos con destreza.",
                basePoints: 1500
            }
        },
        {
            id: 8,
            title: "El Leviatán del Abismo",
            biome: "Gran Fosa Marina",
            words: ["BALLENA", "AZUL", "MARES", "CANTO", "GIGANTE", "ABISMO", "KRILL", "PROFUNDO", "PULMON"],
            difficulty: "dificil",
            reward: {
                id: "card_ballena",
                name: "Ballena Azul",
                scientific: "Balaenoptera musculus",
                rarity: "Legendario",
                rarityColor: "#f59e0b",
                image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&auto=format&fit=crop&q=80",
                context: "Su corazón es del tamaño de un coche pequeño y su lengua pesa tanto como un elefante. Su canto viaja cientos de kilómetros.",
                basePoints: 2000
            }
        }
    ];

    // ==========================================
    // 2. CATEGORÍAS MODO CLÁSICO (100% AL AZAR)
    // ==========================================
    const CLASSIC_CATEGORIES = {
        animales: {
            id: 'animales', name: 'Reino Animal', icon: '🦁',
            words: ['LEON', 'TIGRE', 'ELEFANTE', 'JIRAFA', 'DELFIN', 'BALLENA', 'AGUILA', 'HALCON', 'PINGUINO', 'CANGURO', 'KOALA', 'LEOPARDO', 'PANDA', 'CEBRA', 'CAMALEON', 'COLIBRI', 'LOBO', 'ZORRO', 'JAGUAR', 'TORTUGA', 'RINOCERONTE', 'HIPOPOTAMO', 'COCODRILO', 'PANTERA', 'FLAMENCO', 'GORILA']
        },
        paises: {
            id: 'paises', name: 'Países del Mundo', icon: '🌎',
            words: ['MEXICO', 'ESPANA', 'ARGENTINA', 'COLOMBIA', 'CHILE', 'PERU', 'BRASIL', 'CANADA', 'FRANCIA', 'ITALIA', 'ALEMANIA', 'JAPON', 'AUSTRALIA', 'PORTUGAL', 'URUGUAY', 'ECUADOR', 'GRECIA', 'EGIPTO', 'SUIZA', 'NORUEGA', 'SUECIA', 'HOLANDA', 'TURQUIA', 'FINLANDIA']
        },
        tecnologia: {
            id: 'tecnologia', name: 'Mundo Tech', icon: '💻',
            words: ['ALGORITMO', 'INTERNET', 'ROBOT', 'SATELITE', 'SOFTWARE', 'HARDWARE', 'CODIGO', 'PROGRAMA', 'DATOS', 'SERVIDOR', 'PANTALLA', 'CELULAR', 'NUBE', 'DATABASE', 'CONEXION', 'PROCESADOR', 'MEMORIA', 'SISTEMA', 'TECLADO', 'ROUTER', 'BITCOIN', 'ARCHIVO']
        },
        gastronomia: {
            id: 'gastronomia', name: 'Gastronomía', icon: '🍕',
            words: ['MANZANA', 'PLATANO', 'FRESA', 'NARANJA', 'AGUACATE', 'SANDIA', 'CEREZA', 'CHOCOLATE', 'PIZZA', 'PASTA', 'BURGUER', 'TACO', 'MANGO', 'LIMON', 'VAINILLA', 'CANELA', 'GALLETA', 'QUESO', 'PIÑA', 'PASTEL', 'HELADO', 'SUSHI', 'ARROZ', 'PAN', 'TORTILLA']
        },
        deportes: {
            id: 'deportes', name: 'Deportes', icon: '⚽',
            words: ['FUTBOL', 'BASKET', 'NATACION', 'CICLISMO', 'TENIS', 'VOLEIBOL', 'ATLETISMO', 'BOXEO', 'KARATE', 'BEISBOL', 'GOLF', 'PATINAJE', 'ESQUI', 'RUGBY', 'GIMNASIA', 'AJEDREZ', 'SURF', 'MARATON', 'REMO', 'ESGRIMA', 'HOCKEY', 'JUDO']
        },
        universo: {
            id: 'universo', name: 'Cosmos', icon: '🚀',
            words: ['GALAXIA', 'PLANETA', 'ESTRELLA', 'COMETA', 'ASTEROIDE', 'ORBITA', 'GRAVEDAD', 'TELESCOPIO', 'ASTRONAUTA', 'MARTE', 'JUPITER', 'SATURNO', 'NEBULOSA', 'LUNA', 'SOL', 'ECLIPSE', 'COSMOS', 'UNIVERSO', 'METEORITO', 'SUPERNOVA']
        }
    };

    function sanitizeWord(w) {
        return w.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-ZÑ]/g, '').trim();
    }

    // ==========================================
    // 3. SISTEMA DE AUDIO
    // ==========================================
    class SoundEngine {
        constructor() {
            this.ctx = null;
            this.enabled = localStorage.getItem('sopa_sound') !== 'false';
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
        }

        toggle() {
            this.enabled = !this.enabled;
            localStorage.setItem('sopa_sound', this.enabled);
            return this.enabled;
        }

        playSelect() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const now = this.ctx.currentTime;
                osc.type = 'sine';
                osc.frequency.setValueAtTime(540, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
            } catch (e) {}
        }

        playWordSuccess() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const now = this.ctx.currentTime;
                [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const t = now + (i * 0.06);
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(f, t);
                    gain.gain.setValueAtTime(0.12, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(t);
                    osc.stop(t + 0.32);
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
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    const t = now + (i * 0.08);
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(f, t);
                    gain.gain.setValueAtTime(0.15, t);
                    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(t);
                    osc.stop(t + 0.4);
                });
            } catch (e) {}
        }

        playHint() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } catch (e) {}
        }

        playError() {
            if (!this.enabled) return;
            this.init();
            if (!this.ctx) return;
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.linearRampToValueAtTime(120, now + 0.15);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.15);
            } catch (e) {}
        }
    }
    const sound = new SoundEngine();

    // ==========================================
    // 4. GENERADOR DE CUADRÍCULA
    // ==========================================
    const DIRECTIONS = {
        H_LR: [0, 1], H_RL: [0, -1], V_TB: [1, 0], V_BT: [-1, 0],
        D_DR: [1, 1], D_DL: [1, -1], D_UR: [-1, 1], D_UL: [-1, -1]
    };

    const PRESETS = {
        facil: { size: 9, count: 6, dirs: [DIRECTIONS.H_LR, DIRECTIONS.V_TB] },
        medio: { size: 11, count: 8, dirs: [DIRECTIONS.H_LR, DIRECTIONS.V_TB, DIRECTIONS.D_DR, DIRECTIONS.D_UR] },
        dificil: { size: 13, count: 10, dirs: Object.values(DIRECTIONS) }
    };

    class Generator {
        static createRandom(fullWordList, difficulty = 'medio') {
            const config = PRESETS[difficulty] || PRESETS.medio;
            const cleaned = fullWordList
                .map(w => sanitizeWord(w))
                .filter(w => w.length >= 3 && w.length <= config.size);

            const shuffled = [...cleaned].sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, config.count);
            return this.buildBoard(selected, difficulty);
        }

        static createFixed(words, difficulty = 'medio') {
            const cleaned = words.map(w => sanitizeWord(w));
            return this.buildBoard(cleaned, difficulty);
        }

        static buildBoard(words, difficulty) {
            const config = PRESETS[difficulty] || PRESETS.medio;
            const size = config.size;
            const dirs = config.dirs;

            const sorted = [...words].sort((a, b) => b.length - a.length);
            const grid = Array.from({ length: size }, () => Array(size).fill(''));
            const placed = [];

            for (const word of sorted) {
                const res = this.placeWord(grid, word, size, dirs);
                if (res) placed.push(res);
            }

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    if (grid[r][c] === '') {
                        const idx = Math.floor(Math.random() * SPANISH_LETTER_FREQUENCY.length);
                        grid[r][c] = SPANISH_LETTER_FREQUENCY[idx];
                    }
                }
            }

            return {
                grid,
                size,
                difficulty,
                wordsToFind: placed.map(p => p.word),
                placedWords: placed
            };
        }

        static placeWord(grid, word, size, dirs) {
            const len = word.length;
            for (let attempt = 0; attempt < 150; attempt++) {
                const dir = dirs[Math.floor(Math.random() * dirs.length)];
                const [dr, dc] = dir;

                let minR = 0, maxR = size - 1;
                let minC = 0, maxC = size - 1;

                if (dr > 0) maxR = size - len;
                else if (dr < 0) minR = len - 1;
                if (dc > 0) maxC = size - len;
                else if (dc < 0) minC = len - 1;

                if (minR > maxR || minC > maxC) continue;

                const sr = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
                const sc = Math.floor(Math.random() * (maxC - minC + 1)) + minC;

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
    // 5. STORAGE Y RANKING
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

    class Storage {
        static getProfile() {
            try {
                const raw = localStorage.getItem('sopa_pro_profile');
                return raw ? JSON.parse(raw) : { name: 'Cazapalabras', avatar: '🦊', rank: 'Novato', totalScore: 0 };
            } catch (e) {
                return { name: 'Cazapalabras', avatar: '🦊', rank: 'Novato', totalScore: 0 };
            }
        }

        static saveProfile(p) {
            try { localStorage.setItem('sopa_pro_profile', JSON.stringify(p)); } catch (e) {}
        }

        static addScore(pts) {
            const p = this.getProfile();
            p.totalScore = (p.totalScore || 0) + pts;
            if (p.totalScore >= 7500) p.rank = 'Maestro Supremo';
            else if (p.totalScore >= 4500) p.rank = 'Cazador Legendario';
            else if (p.totalScore >= 2000) p.rank = 'Experto Táctico';
            else if (p.totalScore >= 800) p.rank = 'Explorador';
            this.saveProfile(p);
            return p.totalScore;
        }

        static getUnlockedCards() {
            try {
                const raw = localStorage.getItem('sopa_unlocked_cards');
                return raw ? JSON.parse(raw) : [];
            } catch (e) { return []; }
        }

        static unlockCard(cardId) {
            const list = this.getUnlockedCards();
            if (!list.includes(cardId)) {
                list.push(cardId);
                try { localStorage.setItem('sopa_unlocked_cards', JSON.stringify(list)); } catch (e) {}
            }
            return list;
        }

        static getAdventureProgress() {
            try {
                const raw = localStorage.getItem('sopa_adv_progress');
                return raw ? JSON.parse(raw) : { maxLevel: 1, levelStars: {} };
            } catch (e) { return { maxLevel: 1, levelStars: {} }; }
        }

        static saveAdventureProgress(levelId, stars) {
            const p = this.getAdventureProgress();
            if (levelId >= p.maxLevel) {
                p.maxLevel = Math.min(levelId + 1, ADVENTURE_LEVELS.length);
            }
            p.levelStars[levelId] = Math.max(p.levelStars[levelId] || 0, stars);
            try { localStorage.setItem('sopa_adv_progress', JSON.stringify(p)); } catch (e) {}
            return p;
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
    // 6. MULTIJUGADOR P2P
    // ==========================================
    class Multiplayer {
        constructor(handlers) {
            this.h = handlers;
            this.peer = null;
            this.conn = null;
            this.isHost = false;
            this.code = null;
        }

        createRoom() {
            this.code = Math.random().toString(36).substring(2, 6).toUpperCase();
            this.isHost = true;
            if (window.Peer) {
                this.peer = new window.Peer('sopa-match-' + this.code, { config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } });
                this.peer.on('open', () => this.h.onCreated(this.code));
                this.peer.on('connection', (c) => { this.conn = c; this.wire(); });
                this.peer.on('error', (err) => {
                    if (err.type === 'unavailable-id') this.createRoom();
                    else this.h.onError('Error creando la sala');
                });
            } else { this.h.onError('Sin conexión para multijugador.'); }
        }

        joinRoom(code) {
            this.code = code.trim().toUpperCase();
            this.isHost = false;
            if (window.Peer) {
                this.peer = new window.Peer('sopa-guest-' + Date.now(), { config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } });
                this.peer.on('open', () => {
                    this.conn = this.peer.connect('sopa-match-' + this.code, { reliable: true });
                    this.wire();
                });
                this.peer.on('error', () => this.h.onError('No se encontró la sala.'));
            }
        }

        wire() {
            if (!this.conn) return;
            this.conn.on('open', () => {
                if (this.isHost) this.h.onJoined();
                else this.send({ type: 'HELLO', profile: Storage.getProfile() });
            });
            this.conn.on('data', (d) => {
                if (d.type === 'HELLO') this.h.onJoined(d.profile);
                if (d.type === 'START') this.h.onStart(d);
                if (d.type === 'WORD') this.h.onWord(d);
                if (d.type === 'EMOJI') this.h.onEmoji(d.emoji);
            });
            this.conn.on('close', () => this.h.onLeave());
        }

        send(msg) { if (this.conn && this.conn.open) this.conn.send(msg); }
        startMatch(puzzle) {
            this.send({ type: 'START', puzzle, hostProfile: Storage.getProfile() });
            this.h.onStart({ puzzle, hostProfile: Storage.getProfile() });
        }
        sendWord(word, cells) { this.send({ type: 'WORD', word, cells }); }
        sendEmoji(emoji) { this.send({ type: 'EMOJI', emoji }); }
        disconnect() {
            if (this.conn) try { this.conn.close(); } catch (e) {}
            if (this.peer) try { this.peer.destroy(); } catch (e) {}
            this.conn = null; this.peer = null; this.code = null;
        }
    }

    // ==========================================
    // 7. CONTROLADOR PRINCIPAL CASUAL MÓVIL
    // ==========================================
    class AppController {
        constructor() {
            this.mode = 'adventure';
            this.currentLevel = null;
            this.classicCategory = null;
            this.classicDiff = 'medio';
            this.puzzle = null;
            this.found = new Map();
            this.hintsLeft = 3;
            this.timer = null;
            this.seconds = 0;

            // Arrastre
            this.isDragging = false;
            this.startCell = null;
            this.selectedCells = [];
            this.colorIndex = 0;

            this.multiplayer = new Multiplayer({
                onCreated: (code) => {
                    document.getElementById('lobby-init').classList.add('hidden');
                    document.getElementById('lobby-wait').classList.remove('hidden');
                    document.getElementById('code-display').textContent = code;
                },
                onJoined: () => {
                    document.getElementById('wait-status-msg').textContent = '¡Rival conectado! Listo para empezar.';
                    document.getElementById('btn-launch-match').classList.remove('hidden');
                },
                onStart: (d) => this.startMultiGame(d),
                onWord: (d) => this.onRivalWord(d),
                onEmoji: (e) => this.spawnEmoji(e, false),
                onLeave: () => { alert('El rival abandonó la partida.'); this.stopTimer(); this.nav('menu'); },
                onError: (m) => alert(m)
            });

            this.bindUI();
            this.renderHubInfo();
        }

        bindUI() {
            // Navegación barra inferior (Bottom Dock)
            document.querySelectorAll('.bottom-nav-item').forEach(item => {
                item.onclick = () => {
                    const target = item.dataset.nav;
                    if (target === 'categories') this.renderClassicCategories();
                    if (target === 'ranking') this.renderLeaderboard();
                    if (target === 'album') this.renderAlbum();
                    if (target === 'menu') this.renderHubInfo();
                    this.nav(target);
                };
            });

            // Botón Superior Volver
            document.getElementById('btn-top-back').onclick = () => {
                this.stopTimer();
                this.renderHubInfo();
                this.nav('menu');
            };

            // Botón Gigante "Jugar Nivel X" en el Hub
            document.getElementById('btn-play-current-level').onclick = () => {
                const prog = Storage.getAdventureProgress();
                const lvl = ADVENTURE_LEVELS.find(l => l.id === prog.maxLevel) || ADVENTURE_LEVELS[0];
                this.startAdventureLevel(lvl);
            };

            // Botones rápidos del Hub
            document.getElementById('btn-quick-levels').onclick = () => {
                this.renderAdventureMap();
                this.nav('adventure');
            };
            document.getElementById('btn-quick-custom').onclick = () => this.nav('creator');

            // Botones inferiores durante el juego (Thumb Dock)
            document.getElementById('btn-game-levels').onclick = () => {
                this.stopTimer();
                this.renderAdventureMap();
                this.nav('adventure');
            };
            document.getElementById('btn-game-classic').onclick = () => {
                this.stopTimer();
                this.renderClassicCategories();
                this.nav('categories');
            };
            document.getElementById('btn-game-album').onclick = () => {
                this.stopTimer();
                this.renderAlbum();
                this.nav('album');
            };
            document.getElementById('btn-hint').onclick = () => this.useHint();
            document.getElementById('btn-shuffle-board').onclick = () => {
                if (this.mode === 'adventure' && this.currentLevel) {
                    this.startAdventureLevel(this.currentLevel);
                } else if (this.mode === 'classic' && this.classicCategory) {
                    this.startClassicGame(this.classicCategory);
                }
            };

            // Selector de dificultad en Modo Clásico
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

            // Sonido
            document.getElementById('btn-sound-toggle').onclick = () => {
                const on = sound.toggle();
                document.getElementById('sound-icon').textContent = on ? '🔊' : '🔇';
            };

            // Multijugador Lobby
            document.getElementById('btn-host-room').onclick = () => this.multiplayer.createRoom();
            document.getElementById('btn-join-match').onclick = () => {
                const c = document.getElementById('room-input-code').value;
                if (c) this.multiplayer.joinRoom(c);
            };
            document.getElementById('btn-copy-link').onclick = () => {
                const url = window.location.origin + window.location.pathname + '?sala=' + this.multiplayer.code;
                navigator.clipboard.writeText(url).then(() => alert('¡Enlace de invitación copiado!'));
            };
            document.getElementById('btn-launch-match').onclick = () => {
                const cats = Object.values(CLASSIC_CATEGORIES);
                const randomCat = cats[Math.floor(Math.random() * cats.length)];
                const p = Generator.createRandom(randomCat.words, 'medio');
                this.multiplayer.startMatch(p);
            };

            // Perfil Modal
            document.getElementById('btn-profile-card').onclick = () => {
                const p = Storage.getProfile();
                document.getElementById('prof-input-name').value = p.name;
                document.getElementById('prof-select-avatar').value = p.avatar;
                document.getElementById('modal-profile-edit').classList.remove('hidden');
            };

            document.getElementById('btn-close-prof-modal').onclick = () => {
                document.getElementById('modal-profile-edit').classList.add('hidden');
            };

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
                    const nextLvl = ADVENTURE_LEVELS.find(l => l.id === this.currentLevel.id + 1);
                    if (nextLvl) this.startAdventureLevel(nextLvl);
                } else {
                    this.renderAdventureMap();
                    this.nav('adventure');
                }
            };

            // Creador personalizado
            document.getElementById('form-create-puzzle').onsubmit = (e) => {
                e.preventDefault();
                const name = document.getElementById('custom-title').value.trim();
                const raw = document.getElementById('custom-words').value.split(/[,\n]/);
                const words = raw.map(w => sanitizeWord(w)).filter(w => w.length >= 3 && w.length <= 13);
                if (words.length < 4) { alert('Introduce al menos 4 palabras válidas.'); return; }

                this.mode = 'classic';
                this.puzzle = Generator.createFixed(words, 'medio');
                this.hintsLeft = 3;
                document.getElementById('game-hud-multi').classList.add('hidden');
                document.getElementById('top-hud-title').textContent = 'Sopa Propia';
                document.getElementById('game-theme-banner').textContent = name;
                this.resetGameRound();
                this.nav('game');
            };

            this.bindGridEvents();
        }

        nav(view) {
            document.querySelectorAll('.app-screen').forEach(s => s.classList.add('hidden'));
            const target = document.getElementById('screen-' + view);
            if (target) target.classList.remove('hidden');

            const isGame = view === 'game';
            const dock = document.getElementById('bottom-nav-dock');
            const topBack = document.getElementById('btn-top-back');
            const topLevelInfo = document.getElementById('top-hud-level-info');

            if (isGame) {
                dock.classList.add('hidden');
                topBack.classList.remove('hidden');
                topLevelInfo.classList.remove('hidden');
            } else {
                dock.classList.remove('hidden');
                if (view === 'menu') topBack.classList.add('hidden');
                else topBack.classList.remove('hidden');
                topLevelInfo.classList.add('hidden');
            }

            // Actualizar estado activo de la barra inferior
            document.querySelectorAll('.bottom-nav-item').forEach(item => {
                if (item.dataset.nav === view) item.classList.add('active');
                else item.classList.remove('active');
            });
        }

        renderHubInfo() {
            const p = Storage.getProfile();
            const prog = Storage.getAdventureProgress();
            const unlocked = Storage.getUnlockedCards();

            // Header
            document.getElementById('header-avatar').textContent = p.avatar;
            document.getElementById('header-score').textContent = (p.totalScore || 0).toLocaleString();

            // Hub Central Card
            document.getElementById('hub-avatar').textContent = p.avatar;
            document.getElementById('hub-player-name').textContent = p.name.toUpperCase();
            document.getElementById('hub-rank-badge').textContent = `Rango: ${p.rank || 'Novato'}`;

            const pct = Math.round((prog.maxLevel / ADVENTURE_LEVELS.length) * 100);
            document.getElementById('hub-world-bar').style.width = `${pct}%`;
            document.getElementById('hub-world-progress-text').textContent = `${prog.maxLevel} / ${ADVENTURE_LEVELS.length}`;

            document.getElementById('hub-cards-count').textContent = `${unlocked.length}/${ADVENTURE_LEVELS.length} Cartas Rescatadas`;
            document.getElementById('hub-streak-badge').textContent = `Nivel ${prog.maxLevel}`;
            document.getElementById('btn-play-level-text').textContent = `Jugar nivel ${prog.maxLevel}`;
        }

        // ==========================================
        // MODO CLÁSICO (AL AZAR)
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
            this.hintsLeft = 3;

            document.getElementById('game-hud-multi').classList.add('hidden');
            document.getElementById('top-hud-title').textContent = 'Modo Clásico';
            document.getElementById('game-theme-banner').textContent = `${category.icon} ${category.name}`;

            this.resetGameRound();
            this.nav('game');
        }

        // ==========================================
        // MODO AVENTURA (NIVELES)
        // ==========================================
        renderAdventureMap() {
            const list = document.getElementById('adventure-levels-list');
            list.innerHTML = '';
            const prog = Storage.getAdventureProgress();

            ADVENTURE_LEVELS.forEach(lvl => {
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
                        ${isUnlocked 
                            ? `<span class="btn-arcade-green px-3.5 py-1.5 rounded-full text-xs font-bold inline-block">Jugar</span>`
                            : `<span class="text-lg">🔒</span>`}
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
            this.hintsLeft = 3;

            document.getElementById('game-hud-multi').classList.add('hidden');
            document.getElementById('top-hud-title').textContent = `Nivel ${level.id}`;
            document.getElementById('game-theme-banner').textContent = level.title;

            this.resetGameRound();
            this.nav('game');
        }

        // ==========================================
        // ÁLBUM DE CARTAS
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
                        <span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full" style="background:${r.rarityColor}20; color:${r.rarityColor}">
                            ${r.rarity}
                        </span>
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

        // ==========================================
        // RANKING GLOBAL
        // ==========================================
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
                    <div class="text-amber-600 font-black text-xs font-mono">${item.points.toLocaleString()} 🪙</div>
                `;
                container.appendChild(el);
            });
        }

        // ==========================================
        // TABLERO BLANCO + CÁPSULAS SVG CONTINUAS
        // ==========================================
        resetGameRound() {
            this.found.clear();
            this.colorIndex = 0;
            document.getElementById('hint-count-badge').textContent = this.hintsLeft;
            this.renderBoard();
            this.renderWordChips();
            this.startTimer();
        }

        renderBoard() {
            const gridEl = document.getElementById('puzzle-board');
            const svgEl = document.getElementById('board-svg-overlay');
            gridEl.innerHTML = '';
            svgEl.innerHTML = '';

            const size = this.puzzle.size;
            svgEl.setAttribute('viewBox', `0 0 ${size * 100} ${size * 100}`);

            // Línea de arrastre en vivo (inicialmente oculta)
            const dragLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            dragLine.setAttribute('id', 'active-drag-line');
            dragLine.setAttribute('stroke', 'rgba(59, 130, 246, 0.72)');
            dragLine.setAttribute('stroke-width', '74');
            dragLine.setAttribute('stroke-linecap', 'round');
            dragLine.setAttribute('visibility', 'hidden');
            svgEl.appendChild(dragLine);

            gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
            gridEl.style.gridTemplateRows = `repeat(${size}, 1fr)`;

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const tile = document.createElement('div');
                    tile.className = 'board-tile';
                    tile.textContent = this.puzzle.grid[r][c];
                    tile.dataset.r = r;
                    tile.dataset.c = c;
                    gridEl.appendChild(tile);
                }
            }
        }

        renderWordChips() {
            const container = document.getElementById('word-chips-container');
            container.innerHTML = '';
            this.puzzle.wordsToFind.forEach(w => {
                const chip = document.createElement('div');
                chip.className = 'word-chip-casual';
                chip.id = 'chip-' + w;
                chip.textContent = w;
                container.appendChild(chip);
            });
        }

        useHint() {
            if (this.hintsLeft <= 0) { alert('No te quedan pistas en esta partida.'); return; }
            const missing = this.puzzle.placedWords.filter(p => !this.found.has(p.word));
            if (missing.length === 0) return;

            const target = missing[Math.floor(Math.random() * missing.length)];
            const tile = document.querySelector(`.board-tile[data-r="${target.start.r}"][data-c="${target.start.c}"]`);
            if (tile) {
                sound.playHint();
                this.hintsLeft--;
                document.getElementById('hint-count-badge').textContent = this.hintsLeft;
                tile.classList.add('tile-hint-flash');
                setTimeout(() => tile.classList.remove('tile-hint-flash'), 3000);
            }
        }

        bindGridEvents() {
            const board = document.getElementById('puzzle-board');

            const getTile = (x, y) => {
                const el = document.elementFromPoint(x, y);
                if (el && el.classList.contains('board-tile')) {
                    return { r: parseInt(el.dataset.r), c: parseInt(el.dataset.c) };
                }
                return null;
            };

            const onStart = (x, y) => {
                const t = getTile(x, y);
                if (!t) return;
                this.isDragging = true;
                this.startCell = t;
                this.selectedCells = [t];
                this.paintLiveDragLine(t, t);
                sound.playSelect();
            };

            const onMove = (x, y) => {
                if (!this.isDragging || !this.startCell) return;
                const cur = getTile(x, y);
                if (!cur) return;

                if (cur.r === this.startCell.r && cur.c === this.startCell.c) {
                    this.selectedCells = [this.startCell];
                    this.paintLiveDragLine(this.startCell, this.startCell);
                    return;
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
                this.isDragging = false;
                this.hideLiveDragLine();
                this.checkSelectedWord();
                this.startCell = null;
                this.selectedCells = [];
            };

            board.addEventListener('mousedown', (e) => { e.preventDefault(); onStart(e.clientX, e.clientY); });
            window.addEventListener('mousemove', (e) => { if (this.isDragging) { e.preventDefault(); onMove(e.clientX, e.clientY); } });
            window.addEventListener('mouseup', () => { if (this.isDragging) onEnd(); });

            board.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    e.preventDefault();
                    onStart(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: false });

            window.addEventListener('touchmove', (e) => {
                if (this.isDragging && e.touches.length === 1) {
                    e.preventDefault();
                    onMove(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: false });

            window.addEventListener('touchend', () => { if (this.isDragging) onEnd(); });
        }

        paintLiveDragLine(cellA, cellB) {
            const dragLine = document.getElementById('active-drag-line');
            if (!dragLine) return;

            dragLine.setAttribute('x1', cellA.c * 100 + 50);
            dragLine.setAttribute('y1', cellA.r * 100 + 50);
            dragLine.setAttribute('x2', cellB.c * 100 + 50);
            dragLine.setAttribute('y2', cellB.r * 100 + 50);
            dragLine.setAttribute('visibility', 'visible');

            // Resaltar texto blanco sobre línea azul
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

            const start = cells[0];
            const end = cells[cells.length - 1];

            const pill = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            pill.setAttribute('x1', start.c * 100 + 50);
            pill.setAttribute('y1', start.r * 100 + 50);
            pill.setAttribute('x2', end.c * 100 + 50);
            pill.setAttribute('y2', end.r * 100 + 50);
            pill.setAttribute('stroke', colorHex);
            pill.setAttribute('stroke-width', '74');
            pill.setAttribute('stroke-linecap', 'round');

            // Insertar debajo de la línea de arrastre activa
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
                this.checkGameOver();
            } else {
                sound.playError();
            }
        }

        claim(word, cells, who) {
            this.found.set(word, { who, cells });

            // Dibujar cápsula pastel continua
            const color = who === 'me'
                ? PASTEL_CAPSULE_COLORS[this.colorIndex % PASTEL_CAPSULE_COLORS.length]
                : '#fbbf24';
            this.colorIndex++;
            this.drawPermanentCapsule(cells, color);

            const chip = document.getElementById('chip-' + word);
            if (chip) chip.classList.add(who === 'me' ? 'found-me' : 'found-rival');

            if (this.mode === 'multi') this.updateMultiScore();
        }

        checkGameOver() {
            if (this.found.size >= this.puzzle.wordsToFind.length) {
                this.stopTimer();
                if (window.confetti) window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

                if (this.mode === 'adventure' && this.currentLevel) {
                    const timeBonus = Math.max(0, 300 - (this.seconds * 3));
                    const hintBonus = this.hintsLeft * 50;
                    const stars = this.seconds <= 45 ? 3 : (this.seconds <= 90 ? 2 : 1);
                    const totalGained = this.currentLevel.reward.basePoints + timeBonus + hintBonus;

                    Storage.unlockCard(this.currentLevel.reward.id);
                    Storage.saveAdventureProgress(this.currentLevel.id, stars);
                    Storage.addScore(totalGained);
                    this.renderHubInfo();

                    sound.playCardUnlock();
                    this.showLevelRewardModal(this.currentLevel.reward, stars, totalGained);
                } else if (this.mode === 'classic') {
                    sound.playWordSuccess();
                    const earned = this.classicDiff === 'dificil' ? 450 : (this.classicDiff === 'medio' ? 300 : 200);
                    Storage.addScore(earned);
                    this.renderHubInfo();
                    setTimeout(() => {
                        alert(`🎉 ¡Sopa completada en ${this.fmtTime(this.seconds)}!\n+${earned} monedas para tu Ranking.`);
                        this.startClassicGame(this.classicCategory);
                    }, 400);
                } else if (this.mode === 'multi') {
                    sound.playWordSuccess();
                    let my = 0, riv = 0;
                    this.found.forEach(v => { if (v.who === 'me') my++; else riv++; });
                    const won = my > riv;
                    if (won) Storage.addScore(500);
                    this.renderHubInfo();
                    setTimeout(() => {
                        alert(won ? `👑 ¡Victoria! Ganaste ${my} a ${riv} (+500 pts)` : `¡Buen intento! Resultado: ${my} a ${riv}`);
                        this.nav('menu');
                    }, 400);
                }
            }
        }

        showLevelRewardModal(reward, stars, points) {
            document.getElementById('reward-modal-title').textContent = '🎉 ¡NIVEL SUPERADO!';
            document.getElementById('reward-card-img').src = reward.image;
            document.getElementById('reward-card-name').textContent = reward.name;
            document.getElementById('reward-card-scientific').textContent = reward.scientific;
            document.getElementById('reward-card-desc').textContent = reward.context;
            document.getElementById('reward-card-rarity').textContent = reward.rarity;
            document.getElementById('reward-card-rarity').style.color = reward.rarityColor;
            document.getElementById('reward-points-badge').textContent = `+${points.toLocaleString()} 🪙`;

            const starWrap = document.getElementById('reward-stars-container');
            starWrap.classList.remove('hidden');
            starWrap.innerHTML = '★'.repeat(stars) + '☆'.repeat(3 - stars);

            document.getElementById('btn-next-level').classList.remove('hidden');
            document.getElementById('modal-reward-card').classList.remove('hidden');
        }

        startMultiGame(data) {
            this.mode = 'multi';
            this.puzzle = data.puzzle;
            this.hintsLeft = 1;
            document.getElementById('game-hud-multi').classList.remove('hidden');
            document.getElementById('top-hud-title').textContent = 'Duelo 1 vs 1';
            document.getElementById('game-theme-banner').textContent = '⚔️ EN VIVO';

            const p = Storage.getProfile();
            document.getElementById('hud-player-name').textContent = p.name;
            document.getElementById('hud-rival-name').textContent = this.multiplayer.isHost ? 'Rival' : 'Anfitrión';
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

        spawnEmoji(emoji, fromMe) {
            const el = document.createElement('div');
            el.className = 'floating-emoji';
            el.textContent = emoji;
            el.style.left = fromMe ? '30vw' : '65vw';
            el.style.top = '45vh';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 2100);
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

        stopTimer() {
            if (this.timer) { clearInterval(this.timer); this.timer = null; }
        }

        fmtTime(s) {
            const m = Math.floor(s / 60).toString().padStart(2, '0');
            const sec = (s % 60).toString().padStart(2, '0');
            return `${m}:${sec}`;
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        window.app = new AppController();
    });
})();
