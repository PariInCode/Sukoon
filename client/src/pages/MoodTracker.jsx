import { useState, useEffect } from "react";
import { addMood, getMoods, deleteMood } from "../services/mood";

const MOODS = [
  { emoji: "😔", label: "Awful", value: 1 },
  { emoji: "😕", label: "Bad", value: 2 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😄", label: "Great", value: 5 },
];

const FACTORS = [
  "Sleep", "Work/Study", "Family", "Friends", "Health",
  "Exercise", "Diet", "Social media", "Weather", "Money",
];

const PAST_ENTRIES = [
  { date: "Today", mood: 4, note: "Good session with the AI chat, felt lighter after." },
  { date: "Yesterday", mood: 3, note: "Average day, a bit tired from low sleep." },
  { date: "2 days ago", mood: 2, note: "Rough day at college, exam stress building up." },
  { date: "3 days ago", mood: 4, note: "Went for a walk in the evening, helped a lot." },
  { date: "4 days ago", mood: 5, note: "Really good day, hung out with friends." },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pastEntries, setPastEntries] = useState([]);
  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await getMoods();
      setPastEntries(res.data.moods);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFactor = (factor) => {
    setSelectedFactors((prev) =>
      prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    try {
      await addMood({
        mood: selectedMood,
        note,
        factors: selectedFactors,
      });

      setSubmitted(true);

      setSelectedMood(null);
      setSelectedFactors([]);
      setNote("");

      fetchMoods();

      setTimeout(() => setSubmitted(false), 2500);

    } catch (err) {
      console.log(err);
      alert("Couldn't save mood.");
    }

  };

  return (
    <div className="min-h-screen bg-[#faf9fc] px-4 sm:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#2d2a3d]">Mood Tracker</h1>
          <p className="text-sm text-[#7a7488] mt-1">
            A few seconds a day builds a pattern worth seeing.
          </p>
        </div>

        {/* Check-in card */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 shadow-[0_15px_40px_-25px_rgba(167,139,250,0.35)] mb-8">
          <h2 className="text-sm font-semibold text-[#2d2a3d] mb-5">
            How are you feeling right now?
          </h2>

          <div className="flex justify-between gap-2 mb-8">
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border transition ${selectedMood === mood.value
                  ? "border-transparent bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_10px_24px_-8px_rgba(167,139,250,0.5)] scale-105"
                  : "border-black/[0.06] bg-[#faf9fc] hover:border-[#a78bfa]/30"
                  }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span
                  className={`text-xs font-medium ${selectedMood === mood.value ? "text-white" : "text-[#7a7488]"
                    }`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-[#2d2a3d] mb-3">
            What's influencing this? <span className="text-[#a29cb3] font-normal">(optional)</span>
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {FACTORS.map((factor) => (
              <button
                key={factor}
                onClick={() => toggleFactor(factor)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${selectedFactors.includes(factor)
                  ? "border-transparent text-white bg-gradient-to-br from-[#a78bfa] to-[#f472b6]"
                  : "border-black/[0.08] text-[#7a7488] bg-[#faf9fc] hover:border-[#a78bfa]/30"
                  }`}
              >
                {factor}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-[#2d2a3d] mb-3">
            Add a note <span className="text-[#a29cb3] font-normal">(optional)</span>
          </h3>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What happened today? What's on your mind?"
            rows={3}
            className="w-full resize-none bg-[#faf9fc] rounded-xl px-4 py-3 text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none focus:ring-2 focus:ring-[#a78bfa]/20 mb-6"
          />

          <button
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_16px_-6px_rgba(167,139,250,0.6),inset_0_1px_1px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {submitted ? "Saved ✓" : "Save check-in"}
          </button>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)]">
          <h2 className="text-sm font-semibold text-[#2d2a3d] mb-5">Past check-ins</h2>
          <div className="space-y-4">
            {pastEntries.map((entry, i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-4 border-b border-black/[0.05] last:border-0 last:pb-0"
              >
                <span className="text-2xl shrink-0">{MOODS[entry.mood - 1].emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium text-[#2d2a3d]">
                      {MOODS[entry.mood - 1].label}
                    </p>
                    <span className="text-xs text-[#a29cb3]">{new Date(entry.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-[#7a7488] leading-relaxed">{entry.note}</p>
                  {entry.factors?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {entry.factors.map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#f3f0ff] text-[#a78bfa]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}