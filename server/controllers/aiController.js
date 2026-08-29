const { GoogleGenAI } = require("@google/genai");
const Chat = require("../models/Chat");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    console.log("AI REQUEST:", message);
    console.log("USER ID:", req.user.id);

    const prompt = `
You are HorizonX AI, an intelligent NASA and astronomy assistant.

Rules:
- Answer only questions related to astronomy, space, NASA, planets, stars, galaxies, astronauts, missions, telescopes, cosmology, and the universe.
- Keep answers concise, around 100–200 words unless the user asks for more.
- Use simple English.
- Be helpful and educational.
- If the question is outside astronomy or NASA, reply:
"I am HorizonX AI and I can only answer astronomy and NASA-related questions."

User Question:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const aiReply = response.text;

    console.log("AI RESPONSE:", aiReply);

    // Save chat history
    const chat = await Chat.create({
      user: req.user.id,
      question: message,
      answer: aiReply,
    });

    return res.status(200).json({
      success: true,
      reply: aiReply,
      chat,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI service is temporarily unavailable. Please try again.",
      error: error.message,
    });
  }
};