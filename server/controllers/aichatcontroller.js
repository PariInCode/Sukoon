require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const Mood = require("../models/Mood");
const buildsystemprompt = require("../utils/buildsystemprompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// crisis keywords — triggers helpline response
const CRISIS_KEYWORDS = [
  "kill myself", "want to die", "end my life", "suicide",
  "self harm", "cut myself", "not worth living", "no reason to live",
  "hurt myself",
];

const hasCrisisSignal = (message) => {
  const lower = message.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
};

module.exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id; // assumes your auth middleware sets req.user

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // 1. Crisis check — handle before even calling Gemini
    if (hasCrisisSignal(message)) {
      return res.status(200).json({
        success: true,
        reply: `I hear you, and I'm really glad you reached out. 💙
What you're feeling matters, and you don't have to face this alone.
Please consider reaching out to someone who can truly support you right now:

📞 iCall: 9152987821  
📞 Vandrevala Foundation: 1860-2662-345 (24x7)  
📞 AASRA: 91-22-27546669  

I'm still here with you. Would you like to talk about what's been going on?`,
        isCrisis: true,
      });
    }

    // 2. Fetch mood history if user is logged in
    let moodHistory = [];
    if (userId) {
      moodHistory = await Mood.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(7)
        .lean();
    }
    
    // 3. Build context-aware system prompt
    const systemPrompt = buildsystemprompt(moodHistory);
    console.log("systemPrompt:", systemPrompt);

    // 4. Call Gemini with system prompt + user message
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.status(200).json({
      success: true,
      reply: response.text,
      isCrisis: false,
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};