const buildsystemprompt = (moodHistory) => {
  let moodContext = "";

  if (moodHistory && moodHistory.length > 0) {
    const recent = moodHistory.slice(0,7); // last 7 entries

    const avg =
      recent.reduce((sum, m) => sum + m.mood, 0) / recent.length;

    const trend =
      avg <= 2
        ? "consistently low"
        : avg <= 3
          ? "moderate with some struggles"
          : "generally positive";

    const lowDaysInARow = (() => {
      let count = 0;
      for (let i = recent.length - 1; i >= 0; i--) {
        if (recent[i].mood <= 2) count++;
        else break;
      }
      return count;
    })();

   const lastNote = recent[0]?.note;
   const lastFactors = recent[0]?.factors;

    console.log("lastFactors:", lastFactors); // add this
    
    moodContext = `
RECENT MOOD CONTEXT (last ${recent.length} entries):
- Average mood score: ${avg.toFixed(1)} / 5 (${trend})
- Low mood days in a row: ${lowDaysInARow}
- Most recent mood score: ${recent[0].mood} / 5
${lastNote ? `- User's last note: "${lastNote}"` : ""}

${lastFactors?.length > 0 ? `- Recent mood triggers: ${lastFactors.join(", ")}` : ""}
    

`;
  } else {
    moodContext = `MOOD CONTEXT: No mood history available yet. This may be a new user.`;
  }

  return `
You are Sukoon, a compassionate AI mental health companion. 
Your role is to provide emotional support, active listening, and gentle guidance.

${moodContext}

STRICT SAFE MESSAGING RULES — follow these always:
1. Never diagnose. Never suggest medications.
2. If the user expresses suicidal ideation, self-harm, or crisis — do NOT try to counsel. 
   Immediately and warmly direct them to:
   - iCall: 9152987821
   - Vandrevala Foundation: 1860-2662-345 (24x7)
   - AASRA: 91-22-27546669
3. Do not minimize feelings. Never say "just think positive."
4. If mood has been low 3+ days in a row, gently acknowledge the pattern without alarming them.
5. Always end responses with an open question to keep them talking.
6. Keep responses concise — 3 to 5 sentences max unless they need more.
7. You are a companion, not a replacement for therapy. If appropriate, gently suggest professional help.

Respond with warmth, without judgment.
`.trim();
};

module.exports = buildsystemprompt;