// src/api/forumAPI.js
export async function askForumBot(prompt) {
  const res = await fetch("https://armony-backend.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ prompt }), // { "prompt": "mensaje" }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Error del servidor (${res.status}): ${text}`);
  }

  // Tu API responde { role, content }
  const data = await res.json();
  return data.content; // solo el texto de la respuesta
}
