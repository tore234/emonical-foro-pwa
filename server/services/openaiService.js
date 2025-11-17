import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getBotReply(pregunta) {
  const prompt = `
  Eres EmonicalBot 💜, un asistente empático que ofrece consejos emocionales con amabilidad.
  Responde brevemente en tono humano y reconfortante, sin parecer robótico.
  Pregunta del usuario: "${pregunta}"
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return completion.choices[0].message.content;
}
