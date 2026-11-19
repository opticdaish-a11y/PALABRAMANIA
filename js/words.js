// js/words.js - Banco de categorías y palabras en español

export const WORD_CATEGORIES = {
    animales: {
        id: 'animales',
        name: 'Animales del Mundo',
        icon: '🦁',
        description: 'Fauna salvaje y doméstica de todos los continentes',
        words: [
            'LEON', 'TIGRE', 'ELEFANTE', 'JIRAFA', 'DELFIN', 'BALLENA',
            'AGUILA', 'HALCON', 'PENGUINO', 'CANGURO', 'KOALA', 'LEOPARDO',
            'PANDA', 'RINOCERONTE', 'HIPOPOTAMO', 'CEBRA', 'CAMALEON',
            'COLIBRI', 'LOBO', 'ZORRO', 'JAGUAR', 'FLAMENCO', 'TORTUGA'
        ]
    },
    paises: {
        id: 'paises',
        name: 'Países y Ciudades',
        icon: '🌎',
        description: 'Geografía y naciones de América, Europa y el mundo',
        words: [
            'MEXICO', 'ESPANA', 'ARGENTINA', 'COLOMBIA', 'CHILE', 'PERU',
            'BRASIL', 'CANADA', 'FRANCIA', 'ITALIA', 'ALEMANIA', 'JAPON',
            'AUSTRALIA', 'PORTUGAL', 'URUGUAY', 'ECUADOR', 'COSTA RICA',
            'GRECIA', 'EGIPTO', 'SUIZA', 'HOLANDA', 'TURQUIA', 'NORUEGA'
        ]
    },
    tecnologia: {
        id: 'tecnologia',
        name: 'Tecnología e Internet',
        icon: '💻',
        description: 'Términos del mundo digital, informática y ciencia',
        words: [
            'ALGORITMO', 'INTERNET', 'ROBOT', 'SATELITE', 'SOFTWARE', 'HARDWARE',
            'CODIGO', 'PROGRAMA', 'DATOS', 'SERVIDOR', 'PANTALLA', 'CELULAR',
            'NUBE', 'DATABASE', 'REDES', 'INTELIGENCIA', 'CONEXION', 'PROCESADOR',
            'MEMORIA', 'SISTEMA', 'TECLADO', 'ARCHIVO', 'VENTANA'
        ]
    },
    comida: {
        id: 'comida',
        name: 'Frutas y Delicias',
        icon: '🍎',
        description: 'Frutas, comidas ricas y gastronomía',
        words: [
            'MANZANA', 'PLATANO', 'FRESA', 'NARANJA', 'AGUACATE', 'SANDIA',
            'CEREZA', 'CHOCOLATE', 'PIZZA', 'PASTA', 'BURGUER', 'TACO',
            'MANGO', 'LIMON', 'VAINILLA', 'CANELA', 'GALLETA', 'QUESO',
            'PIÑA', 'ARROZ', 'PAN', 'TORTILLA', 'PASTEL'
        ]
    },
    deportes: {
        id: 'deportes',
        name: 'Deportes y Juegos',
        icon: '⚽',
        description: 'Disciplinas deportivas y actividades atléticas',
        words: [
            'FUTBOL', 'BASKET', 'NATACION', 'CICLISMO', 'TENIS', 'VOLEIBOL',
            'ATLETISMO', 'BOXEO', 'KARATE', 'BEISBOL', 'GOLF', 'PATINAJE',
            'ESQUI', 'RUGBY', 'GIMNASIA', 'AJEDREZ', 'SURF', 'MARATON'
        ]
    },
    ciencias: {
        id: 'ciencias',
        name: 'Espacio y Universo',
        icon: '🚀',
        description: 'Planetas, estrellas y misterios del cosmos',
        words: [
            'GALAXIA', 'PLANETA', 'ESTRELLA', 'COMETA', 'ASTEROIDE', 'ORBITA',
            'GRAVEDAD', 'TELESCOPIO', 'ASTRONAUTA', 'MARTE', 'JUPITER', 'SATURNO',
            'NEBULOSA', 'LUNA', 'SOL', 'ECLIPSE', 'COSMOS', 'UNIVERSO', 'METEORO'
        ]
    }
};

/**
 * Normaliza una palabra eliminando acentos, espacios y convirtiéndola a mayúsculas.
 */
export function sanitizeWord(word) {
    return word
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quita tildes
        .replace(/[^A-ZÑ]/g, '')        // Solo letras y Ñ
        .trim();
}

/**
 * Letras comunes en español para relleno balanceado (ponderadas por frecuencia de uso)
 */
export const SPANISH_LETTER_FREQUENCY = 'AAAAAAAAAEEEEEEEEEEIIIIIIOOOOOOOUUUUUUBBCDDEEEFFGGHHIIJKLLLMNNNÑÑOOOPQRRRSSSTTTUVXYZ';
