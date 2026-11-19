# 🚀 Guía Paso a Paso: Subir a GitHub y Publicar en Google Play Store

Esta guía te explica de forma clara y sencilla cómo llevar **PalabraMania** a **GitHub**, activarla gratis en la web con **GitHub Pages**, y convertirla en una aplicación nativa para **Android** lista para subir a **Google Play Store**.

---

## 📦 PASO 1: Subir el Proyecto a GitHub (en 2 minutos)

No necesitas usar comandos de terminal si no tienes Git instalado. La forma más fácil es usando la interfaz web de GitHub:

1. Ve a [github.com](https://github.com) e inicia sesión con tu cuenta (o crea una gratis si aún no tienes).
2. Haz clic en el botón verde **"New"** (Nuevo repositorio) en la esquina superior izquierda.
3. Configuración del repositorio:
   - **Repository name**: `palabramania` (o el nombre que prefieras).
   - Marca la casilla **"Public"** (Público).
   - Deja las demás casillas desmarcadas y haz clic en **"Create repository"**.
4. En la pantalla que aparece, busca la opción que dice:  
   👉 **"uploading an existing file"** (subir archivos existentes).
5. Abre la carpeta del juego en tu computadora:
   `C:\Users\compras\.gemini\antigravity\scratch\sopa-de-letras-online`
6. **Arrastra todos los archivos y carpetas** (`index.html`, `manifest.json`, `icon.svg`, `sw.js`, las carpetas `css` y `js`) a la ventana de GitHub.
7. Al terminar de cargar, haz clic abajo en el botón verde **"Commit changes"**.

¡Listo! Tu código ya está guardado en la nube de GitHub.

---

## 🌐 PASO 2: Activar tu Juego Online Gratis (GitHub Pages)

Con esto tu juego tendrá un enlace público en internet (ej: `https://tu-usuario.github.io/palabramania/`):

1. En tu repositorio de GitHub, haz clic en la pestaña **"Settings"** (Configuración, arriba a la derecha).
2. En el menú de la izquierda, haz clic en **"Pages"**.
3. En la sección **"Build and deployment"**:
   - En **Source**, selecciona: **"Deploy from a branch"**.
   - En **Branch**, selecciona la rama **`main`** (y carpeta `/ (root)`).
   - Haz clic en **"Save"**.
4. Espera 1 minuto y recarga la página. Verás un enlace en verde que dice:  
   *"Your site is live at https://tu-usuario.github.io/palabramania/"*.

---

## 📱 PASO 3: Convertir a App de Android (.AAB) para Google Play

Ya hemos preparado el juego con los archivos estándar de Android (`manifest.json`, `sw.js`, `icon.svg`).

Para generar el archivo **Android App Bundle (.aab)** que exige Google Play Store sin necesidad de instalar programas pesados:

1. Ve al sitio oficial: **[PWABuilder.com](https://www.pwabuilder.com)** (herramienta respaldada por Google y Microsoft).
2. Pega la URL de tu juego de GitHub Pages:  
   `https://tu-usuario.github.io/palabramania/`
3. Haz clic en **"Start"**.
4. PWABuilder analizará tu app y te mostrará una puntuación verde perfecta (ya que incluimos manifest, icons y service worker).
5. Haz clic en el botón **"Package for Stores"** y selecciona **"Android"**.
6. En el formulario:
   - **Package ID**: ej. `com.tuusuario.palabramania`
   - **App Name**: `PalabraMania`
7. Haz clic en **"Generate Package"**.
8. Se descargará un archivo `.zip` que contiene tu archivo **`.aab` firmado y listo para Google Play**.

---

## 🛒 PASO 4: Publicar en Google Play Console

1. Entra a [Google Play Console](https://play.google.com/console).
2. Necesitas una cuenta de desarrollador de Google (pago único de $25 USD que pide Google para poder publicar apps de por vida).
3. Haz clic en **"Crear aplicación"**:
   - Nombre: `PalabraMania - Sopa de Letras`
   - Idioma: Español
   - Tipo: Juego / Gratuito
4. Ve a la sección **"Producción"** > **"Crear nueva versión"**.
5. Sube el archivo **`.aab`** que descargaste de PWABuilder.
6. Rellena la ficha de Play Store (descripción, capturas de pantalla del juego y el icono).
7. Haz clic en **"Enviar a revisión"**. Google revisará la app en 1 a 3 días y aparecerá disponible para descargar en todo el mundo en Google Play.
