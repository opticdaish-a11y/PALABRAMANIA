# 🧩 PalabraMania - Sopa de Letras Online (Multijugador 1v1 y Solitario)

Una aplicación web moderna, responsiva e interactiva de **Sopa de Letras** que permite jugar en solitario con diversas categorías temáticas o retar a amigos en partidas multijugador 1 vs 1 en tiempo real directamente desde el navegador.

---

## ✨ Características Principales

1. **Multijugador 1 vs 1 en Tiempo Real (WebRTC / PeerJS)**:
   - Crea una sala con un clic y obtén un código de 4 caracteres o un enlace directo (`?sala=XXXX`).
   - Conexión P2P (Peer-to-Peer) sin necesidad de configurar un servidor backend.
   - Ambos jugadores compiten en el mismo tablero en tiempo real.
   - Marcador en vivo y resaltado simultáneo de palabras encontradas por cada jugador.
   - Envío de reacciones con emojis en vivo (🔥, 🎉, 🚀, 😱, 👏).

2. **Modo Solitario y Categorías**:
   - Categorías predefinidas: *Animales, Países, Tecnología, Comida, Deportes y Cosmos*.
   - 3 Niveles de dificultad:
     - **Fácil**: Cuadrícula de 10x10, palabras horizontales y verticales.
     - **Medio**: Cuadrícula de 12x12, incluye diagonales.
     - **Difícil**: Cuadrícula de 15x15, todas las direcciones (incluye palabras escritas al revés).

3. **Creador de Sopas Personalizadas**:
   - Permite ingresar palabras propias para generar una sopa a medida.

4. **Perfil, Estadísticas y Récords**:
   - Personalización de nombre y avatar con emojis.
   - Seguimiento de partidas jugadas, palabras encontradas, racha de victorias y balance 1v1.
   - Registro de los mejores tiempos en un ranking local (`LocalStorage`).

5. **Interactividad y Sonido**:
   - Selección fluida con ratón (arrastrar) y pantallas táctiles (deslizar el dedo).
   - Efectos de sonido sintetizados en tiempo real con la Web Audio API (sin archivos de audio pesados).
   - Animación de confeti al completar el tablero.

---

## 🚀 Cómo Jugar en Tu Computadora

1. Abre la carpeta del proyecto:
   ```
   C:\Users\compras\.gemini\antigravity\scratch\sopa-de-letras-online\
   ```
2. Haz doble clic en el archivo **`index.html`** para abrirlo en tu navegador favorito (Google Chrome, Microsoft Edge, Firefox, etc.).
3. ¡Listo! Puedes jugar de inmediato.

---

## 🌐 Cómo Publicarla en Internet Gratis (1 minuto)

Al ser una aplicación web pura (HTML5, Tailwind CSS y JavaScript modular):

### Opción 1: GitHub Pages (Recomendada y 100% gratuita)
1. Crea un repositorio en [GitHub](https://github.com).
2. Sube los archivos de esta carpeta (`index.html`, `css/` y `js/`).
3. Ve a **Settings** > **Pages** > selecciona la rama `main` y guarda.
4. Tu juego estará disponible públicamente en `https://tu-usuario.github.io/sopa-de-letras/`.

### Opción 2: Vercel o Netlify
- Solo arrastra la carpeta `sopa-de-letras-online` a [Netlify Drop](https://app.netlify.com/drop) y obtendrás un enlace público al instante.

---

## 📁 Estructura del Proyecto

```
sopa-de-letras-online/
├── index.html           # Interfaz gráfica principal y vistas
├── README.md            # Documentación del proyecto
├── css/
│   └── styles.css       # Estilos visuales, cuadrícula y animaciones
└── js/
    ├── app.js           # Controlador maestro de la interfaz y eventos
    ├── audio.js         # Efectos de sonido sintetizados (Web Audio API)
    ├── engine.js        # Algoritmo generador de sopas y cálculo de trayectorias
    ├── multiplayer.js   # Comunicación P2P en tiempo real con PeerJS
    ├── storage.js       # Guardado de perfiles, estadísticas y récords
    └── words.js         # Banco temático de palabras en español
```
