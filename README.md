# Emonical Foro · PWA 💜

Emonical Foro es una aplicación web progresiva (PWA) pensada para cuidar el bienestar emocional de las personas.  
Permite compartir experiencias en un foro seguro, recibir respuestas de un bot empático y descubrir recursos sobre salud mental.

> 🌐 Demo: https://emonical-foro-pwa.vercel.app/

---

## ✨ Características principales

- 🫧 **Foro emocional**  
  Publica experiencias, dudas o pensamientos y recibe respuestas visualmente cuidadas.

- 🤖 **Emonical Bot integrado**  
  El bot responde a tus publicaciones usando una API propia (`/chat` en tu backend de Render), con mensajes cálidos y acompañamiento emocional.

- 👤 **Autenticación con Firebase**  
  - Correo y contraseña  
  - Google  
  - Modo invitado/anónimo  
  Gestión de sesión y vista de perfil en la sección **Perfil**.

- 💟 **Avatar emocional personalizable**  
  El usuario puede elegir su **estado emocional** (ansiedad, estrés, enojo, tristeza, miedo, neutral) como avatar de perfil, usando las burbujas ilustradas de Emonical.

- 📰 **Noticias & Tips de bienestar**  
  - Tips diarios de psicólogo.  
  - Noticias externas sobre salud mental.  
  - Sección de videos relajantes y meditaciones guiadas.

- 📱 **Sección “Descubrir App”**  
  Presentación de la app móvil / AR, con mockups y botón para descargar el APK o instalar como PWA.

- 📲 **Diseño responsive & PWA**  
  - UI pensada para móvil primero.  
  - Gradientes suaves, iconografía amigable y animaciones con Framer Motion.  
  - Instalación como app en el dispositivo.

---

## 🧱 Stack Tecnológico

- **Frontend**
  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Heroicons](https://heroicons.com/)

- **Backend / Servicios**
  - [Firebase Authentication](https://firebase.google.com/docs/auth)  
  - [Firebase Firestore](https://firebase.google.com/docs/firestore) (posts del foro)
  - API propia desplegada en Render (`/chat`) para la lógica del bot.

- **Deploy**
  - [Vercel](https://vercel.com/) para el frontend.

---

## 📂 Estructura del proyecto (simplificada)

```bash
src/
  api/
    forumAPI.js         # Llamadas al backend (bot / foro)
    openaiClient.js     # Cliente para API de chat (backend)
  assets/
    emociones/          # Avatares emocionales (burbujas Emonical)
  components/
    Bot/
      AutoReplyHandler.js
      BotMessage.jsx
      ChatBotService.js
      WakeBotButton.jsx
    Foro/
      ForoForm.jsx       # Formulario de publicación + llamada al bot
      ForoList.jsx       # Tarjetas de posts y respuestas
    Noticias/
      NoticiasCard.jsx
      PsicologoCard.jsx
    Usuario/
      Login.jsx          # Login / registro / invitado
      PerfilCard.jsx     # Tarjeta de perfil + selector de emoción
    Links/
      LinksCard.jsx
    context/
      AuthContext.jsx    # Contexto de autenticación Firebase
  pages/
    Home.jsx
    Descubrir.jsx
    Foro.jsx
    Noticias.jsx
    Perfil.jsx
  firebase.js            # Configuración de Firebase
  App.jsx
  main.jsx
