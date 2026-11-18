// js/engine.js - Motor generador de Sopas de Letras

import { sanitizeWord, SPANISH_LETTER_FREQUENCY } from './words.js';

export const DIRECTIONS = {
    // [deltaRow, deltaCol]
    HORIZONTAL_LR: [0, 1],   // Izquierda a Derecha
    HORIZONTAL_RL: [0, -1],  // Derecha a Izquierda (Invertida)
    VERTICAL_TB:   [1, 0],   // Arriba a Abajo
    VERTICAL_BT:   [-1, 0],  // Abajo a Arriba (Invertida)
    DIAG_DOWN_R:   [1, 1],   // Diagonal Abajo-Derecha
    DIAG_DOWN_L:   [1, -1],  // Diagonal Abajo-Izquierda
    DIAG_UP_R:     [-1, 1],  // Diagonal Arriba-Derecha
    DIAG_UP_L:     [-1, -1]  // Diagonal Arriba-Izquierda
};

export const DIFFICULTY_PRESETS = {
    facil: {
        id: 'facil',
        name: 'Fácil',
        size: 10,
        wordCount: 6,
        directions: [
            DIRECTIONS.HORIZONTAL_LR,
            DIRECTIONS.VERTICAL_TB
        ],
        description: '10x10 • Palabras horizontales y verticales hacia adelante'
    },
    medio: {
        id: 'medio',
        name: 'Medio',
        size: 12,
        wordCount: 8,
        directions: [
            DIRECTIONS.HORIZONTAL_LR,
            DIRECTIONS.VERTICAL_TB,
            DIRECTIONS.DIAG_DOWN_R,
            DIRECTIONS.DIAG_UP_R
        ],
        description: '12x12 • Incluye diagonales'
    },
    dificil: {
        id: 'dificil',
        name: 'Difícil',
        size: 15,
        wordCount: 12,
        directions: Object.values(DIRECTIONS),
        description: '15x15 • Todas las direcciones (incluye palabras al revés)'
    }
};

export class WordSearchEngine {
    /**
     * Genera un tablero completo con palabras colocadas y letras de relleno.
     * @param {string[]} rawWords - Lista de palabras disponibles
     * @param {string} difficultyId - 'facil' | 'medio' | 'dificil'
     * @param {number|null} customSize - Tamaño de cuadrícula personalizado opcional
     */
    static generate(rawWords, difficultyId = 'medio', customSize = null) {
        const config = DIFFICULTY_PRESETS[difficultyId] || DIFFICULTY_PRESETS.medio;
        const size = customSize || config.size;
        const directions = config.directions;

        // Limpiar y preparar palabras
        const cleaned = rawWords
            .map(w => sanitizeWord(w))
            .filter(w => w.length >= 3 && w.length <= size);

        // Barajar y tomar la cantidad configurada
        const shuffled = [...cleaned].sort(() => Math.random() - 0.5);
        const selectedWords = shuffled.slice(0, config.wordCount);

        // Ordenar de más largas a más cortas para maximizar éxito de colocación
        selectedWords.sort((a, b) => b.length - a.length);

        // Inicializar cuadrícula vacía
        const grid = Array.from({ length: size }, () => Array(size).fill(''));
        const placedWords = [];

        for (const word of selectedWords) {
            const placement = this.tryPlaceWord(grid, word, size, directions);
            if (placement) {
                placedWords.push(placement);
            }
        }

        // Rellenar espacios vacíos con letras aleatorias balanceadas
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (grid[r][c] === '') {
                    const randIdx = Math.floor(Math.random() * SPANISH_LETTER_FREQUENCY.length);
                    grid[r][c] = SPANISH_LETTER_FREQUENCY[randIdx];
                }
            }
        }

        return {
            grid,
            size,
            difficulty: difficultyId,
            wordsToFind: placedWords.map(p => p.word),
            placedWords // Contiene coordenadas exactas para verificación
        };
    }

    /**
     * Intenta colocar una palabra en una posición y dirección válida.
     */
    static tryPlaceWord(grid, word, size, allowedDirections) {
        const maxAttempts = 150;
        const wordLen = word.length;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const dir = allowedDirections[Math.floor(Math.random() * allowedDirections.length)];
            const [dr, dc] = dir;

            // Calcular rangos válidos para la posición inicial
            let minR = 0, maxR = size - 1;
            let minC = 0, maxC = size - 1;

            if (dr > 0) maxR = size - wordLen;
            else if (dr < 0) minR = wordLen - 1;

            if (dc > 0) maxC = size - wordLen;
            else if (dc < 0) minC = wordLen - 1;

            if (minR > maxR || minC > maxC) continue;

            const startR = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
            const startC = Math.floor(Math.random() * (maxC - minC + 1)) + minC;

            // Verificar si cabe sin colisiones inválidas
            let canPlace = true;
            const cells = [];

            for (let i = 0; i < wordLen; i++) {
                const r = startR + (i * dr);
                const c = startC + (i * dc);
                const char = word[i];

                if (grid[r][c] !== '' && grid[r][c] !== char) {
                    canPlace = false;
                    break;
                }
                cells.push({ r, c, char });
            }

            if (canPlace) {
                // Colocar la palabra en la cuadrícula
                cells.forEach(cell => {
                    grid[cell.r][cell.c] = cell.char;
                });

                return {
                    word,
                    start: { r: startR, c: startC },
                    end: { r: startR + ((wordLen - 1) * dr), c: startC + ((wordLen - 1) * dc) },
                    cells: cells.map(c => ({ r: c.r, c: c.c })),
                    direction: dir
                };
            }
        }

        return null; // No pudo ser colocada en el número máximo de intentos
    }

    /**
     * Determina las celdas en línea recta entre dos puntos (A y B) si es una dirección válida (horizontal, vertical o diagonal 45°).
     */
    static getLineCells(r1, c1, r2, c2) {
        const dr = r2 - r1;
        const dc = c2 - c1;

        // Comprobar si es horizontal, vertical o diagonal exacta (ángulo de 45 grados)
        const isHorizontal = dr === 0 && dc !== 0;
        const isVertical = dc === 0 && dr !== 0;
        const isDiagonal = Math.abs(dr) === Math.abs(dc) && dr !== 0;

        if (!isHorizontal && !isVertical && !isDiagonal) {
            return null; // No es una línea recta permitida
        }

        const stepR = dr === 0 ? 0 : (dr > 0 ? 1 : -1);
        const stepC = dc === 0 ? 0 : (dc > 0 ? 1 : -1);
        const steps = Math.max(Math.abs(dr), Math.abs(dc));

        const cells = [];
        for (let i = 0; i <= steps; i++) {
            cells.push({
                r: r1 + (i * stepR),
                c: c1 + (i * stepC)
            });
        }

        return cells;
    }
}
