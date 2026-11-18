// js/app.js - Controlador principal de la interfaz y lógica del juego

import { WORD_CATEGORIES, sanitizeWord } from './words.js';
import { WordSearchEngine, DIFFICULTY_PRESETS } from './engine.js';
import { sounds } from './audio.js';
import { StorageManager } from './storage.js';
import { MultiplayerManager } from './multiplayer.js';

class SopaApp {
    constructor() {
        this.currentView = 'view-menu';
        this.gameMode = 'solo'; // 'solo' | 'multiplayer'
        this.currentCategory = null;
        this.currentDifficulty = 'medio';
        this.puzzle = null;
        
        // Estado de la partida actual
        this.foundWords = new Map(); // word -> { by: 'me'|'rival', cells: [...] }
        this.timerInterval = null;
        this.startTime = null;
        this.elapsedSeconds = 0;

        // Selección por arrastre (touch y mouse)
        this.isSelecting = false;
        this.startCell = null;
        this.currentSelectionCells = [];

        // Inicializar multijugador
        this.multiplayer = new MultiplayerManager({
            onRoomCreated: (code) => this.handleRoomCreated(code),
            onPlayerJoined: (data) => this.handlePlayerJoined(data),
            onGameStart: (data) => this.handleMultiplayerStart(data),
            onRivalWordFound: (data) => this.handleRivalWordFound(data),
            onReactionReceived: (emoji) => this.showFloatingReaction(emoji, false),
            onPlayerLeft: () => this.handleRivalDisconnected(),
            onError: (msg) => alert(msg)
        });

        this.initDOM();
        this.initEvents();
        this.loadProfile();
        this.checkUrlParams();
    }

    initDOM() {
        // Vistas
        this.views = {
            menu: document.getElementById('view-menu'),
            categories: document.getElementById('view-categories'),
            lobby: document.getElementById('view-lobby'),
            game: document.getElementById('view-game'),
            leaderboard: document.getElementById('view-leaderboard'),
            creator: document.getElementById('view-creator'),
            profileModal: document.getElementById('modal-profile')
        };

        // Elementos del tablero
        this.gridContainer = document.getElementById('grid-container');
        this.wordListContainer = document.getElementById('word-list');
        this.timerDisplay = document.getElementById('timer-display');
        this.categoryTitle = document.getElementById('game-category-title');
        this.foundCounter = document.getElementById('found-counter');

        // Elementos multijugador HUD
        this.multiplayerHud = document.getElementById('multiplayer-hud');
        this.p1Score = document.getElementById('hud-p1-score');
        this.p2Score = document.getElementById('hud-p2-score');
        this.p1Name = document.getElementById('hud-p1-name');
        this.p2Name = document.getElementById('hud-p2-name');

        // Modal de victoria
        this.victoryModal = document.getElementById('modal-victory');
    }

    initEvents() {
        // Navegación menú principal
        document.getElementById('btn-play-solo').addEventListener('click', () => {
            this.gameMode = 'solo';
            this.showView('categories');
        });

        document.getElementById('btn-play-multi').addEventListener('click', () => {
            this.gameMode = 'multiplayer';
            this.showView('lobby');
        });

        document.getElementById('btn-custom').addEventListener('click', () => {
            this.showView('creator');
        });

        document.getElementById('btn-leaderboard').addEventListener('click', () => {
            this.renderLeaderboard();
            this.showView('leaderboard');
        });

        document.getElementById('btn-profile').addEventListener('click', () => {
            this.openProfileModal();
        });

        // Botones de retroceso al menú
        document.querySelectorAll('.btn-back-menu').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.multiplayer.status !== 'DISCONNECTED') {
                    if (confirm('¿Deseas salir y abandonar la sala?')) {
                        this.multiplayer.disconnect();
                        this.stopTimer();
                        this.showView('menu');
                    }
                } else {
                    this.stopTimer();
                    this.showView('menu');
                }
            });
        });

        // Toggle sonido
        const soundBtn = document.getElementById('btn-toggle-sound');
        soundBtn.addEventListener('click', () => {
            const enabled = sounds.toggle();
            soundBtn.innerHTML = enabled ? '🔊' : '🔇';
        });

        // Selección de dificultad
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('bg-indigo-600', 'text-white'));
                btn.classList.add('bg-indigo-600', 'text-white');
                this.currentDifficulty = btn.dataset.difficulty;
            });
        });

        // Generar categorías en vista de selección
        this.renderCategoryCards();

        // Multijugador Lobby
        document.getElementById('btn-create-room').addEventListener('click', () => {
            this.multiplayer.createRoom();
        });

        document.getElementById('btn-join-room').addEventListener('click', () => {
            const codeInput = document.getElementById('input-room-code');
            const code = codeInput.value.trim().toUpperCase();
            if (code) {
                this.multiplayer.joinRoom(code);
            } else {
                alert('Ingresa el código de la sala');
            }
        });

        document.getElementById('btn-copy-link').addEventListener('click', () => {
            const code = this.multiplayer.roomCode;
            const url = `${window.location.origin}${window.location.pathname}?sala=${code}`;
            navigator.clipboard.writeText(url).then(() => {
                alert('¡Enlace de invitación copiado al portapapeles!');
            }).catch(() => {
                prompt('Copia este enlace para compartir:', url);
            });
        });

        document.getElementById('btn-start-multiplayer-match').addEventListener('click', () => {
            this.startMultiplayerHostMatch();
        });

        // Reacciones multijugador
        document.querySelectorAll('.reaction-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const emoji = btn.dataset.emoji;
                this.multiplayer.sendReaction(emoji);
                this.showFloatingReaction(emoji, true);
            });
        });

        // Formulario de perfil
        document.getElementById('form-profile').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('profile-name-input').value.trim() || 'Jugador';
            const avatar = document.getElementById('profile-avatar-select').value;
            StorageManager.saveProfile({ name, avatar });
            this.loadProfile();
            this.views.profileModal.classList.add('hidden');
        });

        document.getElementById('btn-close-profile').addEventListener('click', () => {
            this.views.profileModal.classList.add('hidden');
        });

        // Guardar lista personalizada
        document.getElementById('form-custom-words').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSaveCustomList();
        });

        // Botón revancha / jugar de nuevo
        document.getElementById('btn-play-again').addEventListener('click', () => {
            this.victoryModal.classList.add('hidden');
            if (this.gameMode === 'solo') {
                this.startSoloGame(this.currentCategory);
            } else if (this.multiplayer.isHost) {
                this.startMultiplayerHostMatch();
            }
        });

        // Eventos táctiles y ratón en el tablero
        this.setupBoardInteraction();
    }

    showView(viewName) {
        Object.keys(this.views).forEach(key => {
            if (this.views[key]) {
                this.views[key].classList.add('hidden');
            }
        });
        if (this.views[viewName]) {
            this.views[viewName].classList.remove('hidden');
            this.currentView = viewName;
        }
    }

    loadProfile() {
        const profile = StorageManager.getProfile();
        const display = document.getElementById('user-profile-display');
        if (display) {
            display.textContent = `${profile.avatar} ${profile.name}`;
        }
    }

    openProfileModal() {
        const profile = StorageManager.getProfile();
        document.getElementById('profile-name-input').value = profile.name;
        document.getElementById('profile-avatar-select').value = profile.avatar;
        this.views.profileModal.classList.remove('hidden');
    }

    checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const roomCode = params.get('sala');
        if (roomCode) {
            this.gameMode = 'multiplayer';
            this.showView('lobby');
            document.getElementById('input-room-code').value = roomCode.toUpperCase();
            // Intentar unirse automáticamente
            setTimeout(() => {
                this.multiplayer.joinRoom(roomCode);
            }, 600);
        }
    }

    renderCategoryCards() {
        const container = document.getElementById('categories-container');
        container.innerHTML = '';

        // Categorías estándar
        Object.values(WORD_CATEGORIES).forEach(cat => {
            const card = document.createElement('div');
            card.className = 'bg-slate-800 hover:bg-slate-700/80 p-5 rounded-2xl border border-slate-700 transition cursor-pointer flex flex-col items-center text-center group transform hover:-translate-y-1 shadow-lg';
            card.innerHTML = `
                <div class="text-4xl mb-3 group-hover:scale-110 transition duration-200">${cat.icon}</div>
                <h3 class="text-xl font-bold text-white mb-1">${cat.name}</h3>
                <p class="text-xs text-slate-400 mb-4">${cat.description}</p>
                <span class="text-xs font-semibold px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
                    ${cat.words.length} palabras
                </span>
            `;
            card.addEventListener('click', () => {
                this.startSoloGame(cat);
            });
            container.appendChild(card);
        });

        // Listas personalizadas guardadas
        const customLists = StorageManager.getCustomLists();
        customLists.forEach(list => {
            const card = document.createElement('div');
            card.className = 'bg-slate-800 hover:bg-slate-700/80 p-5 rounded-2xl border border-amber-500/40 transition cursor-pointer flex flex-col items-center text-center group transform hover:-translate-y-1 shadow-lg';
            card.innerHTML = `
                <div class="text-4xl mb-3 group-hover:scale-110 transition duration-200">⭐</div>
                <h3 class="text-xl font-bold text-amber-300 mb-1">${list.name}</h3>
                <p class="text-xs text-slate-400 mb-4">${list.description}</p>
                <span class="text-xs font-semibold px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
                    Personalizada
                </span>
            `;
            card.addEventListener('click', () => {
                this.startSoloGame(list);
            });
            container.appendChild(card);
        });
    }

    /**
     * Inicia una partida en solitario
     */
    startSoloGame(category) {
        this.currentCategory = category;
        this.gameMode = 'solo';
        this.multiplayerHud.classList.add('hidden');
        document.getElementById('multiplayer-reactions').classList.add('hidden');

        // Generar sopa
        this.puzzle = WordSearchEngine.generate(category.words, this.currentDifficulty);
        this.categoryTitle.textContent = `${category.icon || '📝'} ${category.name}`;

        this.setupNewGame();
        this.showView('game');
    }

    /**
     * Inicia una partida Multijugador como anfitrión
     */
    startMultiplayerHostMatch() {
        const categories = Object.values(WORD_CATEGORIES);
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        this.currentCategory = randomCat;

        // Generar sopa idéntica para ambos
        this.puzzle = WordSearchEngine.generate(randomCat.words, this.currentDifficulty);
        this.multiplayer.startMatch(this.puzzle);
    }

    handleRoomCreated(code) {
        document.getElementById('lobby-waiting-state').classList.remove('hidden');
        document.getElementById('lobby-form-state').classList.add('hidden');
        document.getElementById('display-room-code').textContent = code;
    }

    handlePlayerJoined(data) {
        document.getElementById('lobby-waiting-msg').textContent = '¡Rival conectado! Listo para empezar.';
        const btnStart = document.getElementById('btn-start-multiplayer-match');
        btnStart.classList.remove('hidden');
    }

    handleMultiplayerStart(data) {
        this.gameMode = 'multiplayer';
        this.puzzle = data.puzzle;
        this.currentCategory = { name: 'Duelo 1 vs 1', icon: '⚔️' };
        this.categoryTitle.textContent = '⚔️ Duelo 1 vs 1 en Vivo';

        // Configurar HUD de ambos jugadores
        this.multiplayerHud.classList.remove('hidden');
        document.getElementById('multiplayer-reactions').classList.remove('hidden');

        const myProfile = StorageManager.getProfile();
        this.p1Name.textContent = `Tú (${myProfile.name})`;
        this.p2Name.textContent = this.multiplayer.isHost ? 'Rival' : 'Anfitrión';

        this.updateMultiplayerScore();
        this.setupNewGame();
        this.showView('game');
    }

    setupNewGame() {
        this.foundWords.clear();
        this.stopTimer();
        this.startTimer();
        this.renderBoard();
        this.renderWordList();
        this.updateCounter();
    }

    renderBoard() {
        this.gridContainer.innerHTML = '';
        const size = this.puzzle.size;

        // Configurar columnas de CSS grid
        this.gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        this.gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.textContent = this.puzzle.grid[r][c];
                cell.dataset.row = r;
                cell.dataset.col = c;
                this.gridContainer.appendChild(cell);
            }
        }
    }

    renderWordList() {
        this.wordListContainer.innerHTML = '';
        this.puzzle.wordsToFind.forEach(word => {
            const badge = document.createElement('div');
            badge.className = 'word-badge px-3 py-1.5 rounded-lg text-sm font-semibold border border-slate-700 bg-slate-800 text-slate-200 text-center select-none shadow-sm';
            badge.id = `badge-${word}`;
            badge.textContent = word;
            this.wordListContainer.appendChild(badge);
        });
    }

    updateCounter() {
        const found = this.foundWords.size;
        const total = this.puzzle.wordsToFind.length;
        this.foundCounter.textContent = `${found}/${total}`;
    }

    updateMultiplayerScore() {
        let myCount = 0;
        let rivalCount = 0;
        this.foundWords.forEach(val => {
            if (val.by === 'me') myCount++;
            else if (val.by === 'rival') rivalCount++;
        });

        this.p1Score.textContent = myCount;
        this.p2Score.textContent = rivalCount;
    }

    /**
     * Interacción táctil y ratón para seleccionar palabras
     */
    setupBoardInteraction() {
        const getCellFromCoords = (clientX, clientY) => {
            const elem = document.elementFromPoint(clientX, clientY);
            if (elem && elem.classList.contains('grid-cell')) {
                return {
                    row: parseInt(elem.dataset.row),
                    col: parseInt(elem.dataset.col),
                    elem
                };
            }
            return null;
        };

        const handleStart = (clientX, clientY) => {
            const cell = getCellFromCoords(clientX, clientY);
            if (!cell) return;

            this.isSelecting = true;
            this.startCell = cell;
            this.currentSelectionCells = [cell];
            this.highlightSelection();
            sounds.playLetterSelect();
        };

        const handleMove = (clientX, clientY) => {
            if (!this.isSelecting || !this.startCell) return;

            const targetCell = getCellFromCoords(clientX, clientY);
            if (!targetCell) return;

            // Obtener celdas en línea recta permitida (H, V, Diagonal)
            const line = WordSearchEngine.getLineCells(
                this.startCell.row, this.startCell.col,
                targetCell.row, targetCell.col
            );

            if (line) {
                const prevLength = this.currentSelectionCells.length;
                this.currentSelectionCells = line;
                if (line.length !== prevLength) {
                    sounds.playLetterSelect();
                }
                this.highlightSelection();
            }
        };

        const handleEnd = () => {
            if (!this.isSelecting) return;
            this.isSelecting = false;
            this.validateSelection();
            this.clearSelectionHighlights();
            this.startCell = null;
            this.currentSelectionCells = [];
        };

        // Eventos Mouse
        this.gridContainer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            handleStart(e.clientX, e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isSelecting) {
                e.preventDefault();
                handleMove(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mouseup', () => {
            if (this.isSelecting) {
                handleEnd();
            }
        });

        // Eventos Touch (Móviles / Tablets)
        this.gridContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                handleStart(touch.clientX, touch.clientY);
            }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            if (this.isSelecting && e.touches.length === 1) {
                const touch = e.touches[0];
                handleMove(touch.clientX, touch.clientY);
            }
        }, { passive: false });

        window.addEventListener('touchend', () => {
            if (this.isSelecting) {
                handleEnd();
            }
        });
    }

    highlightSelection() {
        // Limpiar selección previa
        document.querySelectorAll('.grid-cell.selecting').forEach(el => {
            el.classList.remove('selecting');
        });

        // Añadir a las celdas actuales
        this.currentSelectionCells.forEach(pos => {
            const el = this.gridContainer.querySelector(`[data-row="${pos.r !== undefined ? pos.r : pos.row}"][data-col="${pos.c !== undefined ? pos.c : pos.col}"]`);
            if (el) {
                el.classList.add('selecting');
            }
        });
    }

    clearSelectionHighlights() {
        document.querySelectorAll('.grid-cell.selecting').forEach(el => {
            el.classList.remove('selecting');
        });
    }

    /**
     * Valida si las celdas seleccionadas forman una de las palabras pendientes
     */
    validateSelection() {
        if (!this.currentSelectionCells || this.currentSelectionCells.length < 2) return;

        // Extraer texto
        let wordForward = '';
        this.currentSelectionCells.forEach(pos => {
            const r = pos.r !== undefined ? pos.r : pos.row;
            const c = pos.c !== undefined ? pos.c : pos.col;
            wordForward += this.puzzle.grid[r][c];
        });
        const wordBackward = wordForward.split('').reverse().join('');

        let matchedWord = null;
        if (this.puzzle.wordsToFind.includes(wordForward) && !this.foundWords.has(wordForward)) {
            matchedWord = wordForward;
        } else if (this.puzzle.wordsToFind.includes(wordBackward) && !this.foundWords.has(wordBackward)) {
            matchedWord = wordBackward;
        }

        if (matchedWord) {
            // ¡Palabra correcta encontrada por el jugador!
            sounds.playWordFound();
            StorageManager.recordWordFound();

            this.claimWord(matchedWord, this.currentSelectionCells, 'me');

            if (this.gameMode === 'multiplayer') {
                this.multiplayer.notifyWordFound(matchedWord, this.currentSelectionCells);
            }

            this.checkGameCompletion();
        } else {
            sounds.playWrongWord();
        }
    }

    /**
     * Marca una palabra como encontrada (ya sea por mí o por el rival)
     */
    claimWord(word, cells, player) {
        this.foundWords.set(word, { by: player, cells });

        // Pintar celdas en el tablero
        cells.forEach(pos => {
            const r = pos.r !== undefined ? pos.r : pos.row;
            const c = pos.c !== undefined ? pos.c : pos.col;
            const el = this.gridContainer.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (el) {
                if (player === 'me') {
                    if (el.classList.contains('found-rival')) {
                        el.classList.remove('found-rival');
                        el.classList.add('found-shared');
                    } else {
                        el.classList.add('found-mine');
                    }
                } else {
                    if (el.classList.contains('found-mine')) {
                        el.classList.remove('found-mine');
                        el.classList.add('found-shared');
                    } else {
                        el.classList.add('found-rival');
                    }
                }
            }
        });

        // Actualizar etiqueta de palabra
        const badge = document.getElementById(`badge-${word}`);
        if (badge) {
            badge.classList.remove('bg-slate-800', 'text-slate-200');
            badge.classList.add(player === 'me' ? 'found-mine' : 'found-rival');
        }

        this.updateCounter();
        if (this.gameMode === 'multiplayer') {
            this.updateMultiplayerScore();
        }
    }

    handleRivalWordFound(data) {
        if (!data || !data.word) return;
        sounds.playRivalWord();
        this.claimWord(data.word, data.cells, 'rival');
        this.checkGameCompletion();
    }

    checkGameCompletion() {
        if (this.foundWords.size >= this.puzzle.wordsToFind.length) {
            this.stopTimer();
            sounds.playVictory();
            this.triggerConfetti();

            let title = '¡Felicidades!';
            let desc = `Has completado la sopa de letras en ${this.formatTime(this.elapsedSeconds)}.`;

            if (this.gameMode === 'solo') {
                StorageManager.recordGameCompletion(
                    this.currentCategory.id || 'custom',
                    this.currentDifficulty,
                    this.elapsedSeconds,
                    true
                );
            } else {
                let myCount = 0;
                let rivalCount = 0;
                this.foundWords.forEach(val => {
                    if (val.by === 'me') myCount++;
                    else if (val.by === 'rival') rivalCount++;
                });

                const won = myCount > rivalCount;
                StorageManager.recordMultiplayerResult(won);

                if (won) {
                    title = '👑 ¡VICTORIA!';
                    desc = `Ganaste con ${myCount} palabras vs ${rivalCount} de tu rival.`;
                } else if (myCount < rivalCount) {
                    title = '🥈 ¡Buen intento!';
                    desc = `Tu rival ganó con ${rivalCount} palabras vs ${myCount}.`;
                } else {
                    title = '🤝 ¡EMPATE!';
                    desc = `Ambos encontraron ${myCount} palabras.`;
                }
            }

            document.getElementById('victory-title').textContent = title;
            document.getElementById('victory-desc').textContent = desc;
            document.getElementById('victory-time').textContent = this.formatTime(this.elapsedSeconds);

            setTimeout(() => {
                this.victoryModal.classList.remove('hidden');
            }, 500);
        }
    }

    handleRivalDisconnected() {
        alert('El rival se ha desconectado de la partida.');
        this.stopTimer();
        this.showView('menu');
    }

    showFloatingReaction(emoji, fromMe) {
        const span = document.createElement('span');
        span.className = 'floating-reaction';
        span.textContent = emoji;
        span.style.left = fromMe ? '25vw' : '70vw';
        span.style.top = '50vh';
        document.body.appendChild(span);
        setTimeout(() => span.remove(), 2300);
    }

    startTimer() {
        this.elapsedSeconds = 0;
        this.timerDisplay.textContent = '00:00';
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            this.timerDisplay.textContent = this.formatTime(this.elapsedSeconds);
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    formatTime(sec) {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    triggerConfetti() {
        if (window.confetti) {
            window.confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    renderLeaderboard() {
        const stats = StorageManager.getStats();
        const profile = StorageManager.getProfile();
        const lb = StorageManager.getLeaderboard();

        document.getElementById('stats-played').textContent = stats.gamesPlayed || 0;
        document.getElementById('stats-words').textContent = stats.wordsFound || 0;
        document.getElementById('stats-streak').textContent = `${stats.currentStreak || 0} 🔥`;
        document.getElementById('stats-multi').textContent = `${stats.multiplayerWins || 0}V - ${stats.multiplayerLosses || 0}D`;

        const listContainer = document.getElementById('leaderboard-list');
        listContainer.innerHTML = '';

        if (lb.length === 0) {
            listContainer.innerHTML = '<div class="text-center text-slate-400 py-6">Aún no hay partidas registradas. ¡Sé el primero en jugar!</div>';
            return;
        }

        lb.slice(0, 10).forEach((entry, idx) => {
            const item = document.createElement('div');
            item.className = 'flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-2';
            const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`;
            item.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="font-bold text-lg w-8 text-center">${medal}</span>
                    <div>
                        <div class="font-bold text-white text-sm">${entry.playerName}</div>
                        <div class="text-xs text-slate-400 capitalize">${entry.category} • ${entry.difficulty}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-indigo-400 font-bold font-mono text-sm">${this.formatTime(entry.time)}</div>
                    <div class="text-[10px] text-slate-500">${entry.date}</div>
                </div>
            `;
            listContainer.appendChild(item);
        });
    }

    handleSaveCustomList() {
        const titleInput = document.getElementById('custom-list-name');
        const wordsInput = document.getElementById('custom-words-input');

        const title = titleInput.value.trim() || 'Mi Sopa';
        const raw = wordsInput.value.split(/[,\n]/);
        const cleaned = raw.map(w => sanitizeWord(w)).filter(w => w.length >= 3 && w.length <= 15);

        if (cleaned.length < 4) {
            alert('Por favor introduce al menos 4 palabras válidas (mínimo 3 letras cada una).');
            return;
        }

        const saved = StorageManager.saveCustomList(title, cleaned);
        this.renderCategoryCards();
        titleInput.value = '';
        wordsInput.value = '';
        alert(`¡Lista "${saved.name}" creada con éxito!`);
        this.showView('categories');
    }
}

// Inicializar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
    window.app = new SopaApp();
});
