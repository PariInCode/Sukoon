import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMoods } from "../services/mood";





const QUICK_LINKS = [
  { label: "AI Chat", desc: "Talk it through", path: "/ai-chat", icon: "💬" },
  { label: "Mood Tracker", desc: "Log today", path: "/mood-tracker", icon: "📊" },
  { label: "Community", desc: "See what's new", path: "/community", icon: "🫂" },
  { label: "Resources", desc: "Browse articles", path: "/resources", icon: "📚" },
];

const RECENT_ACTIVITY = [
  { text: "Logged mood: Good", time: "Today, 9:14 AM" },
  { text: "Completed a 5-min breathing exercise", time: "Yesterday, 8:02 PM" },
  { text: "Posted in Community · Anxiety", time: "Yesterday, 6:40 PM" },
  { text: "Logged mood: Okay", time: "2 days ago" },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [moods, setMoods] = useState([])
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await getMoods();
      setMoods(res.data.moods);
    } catch (err) {
      console.log(err);
    }
  };
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : "Good evening";
  const maxMood = 5;

  const averageMood =
    moods.length > 0
      ? (
        moods.reduce((sum, item) => sum + item.mood, 0) /
        moods.length
      ).toFixed(1)
      : "0.0";

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const moodWeek = weekDays.map((day) => {
    const moodsForDay = moods.filter((m) => {
      return weekDays[new Date(m.createdAt).getDay()] === day;
    });

    const average =
      moodsForDay.length > 0
        ? moodsForDay.reduce((sum, m) => sum + m.mood, 0) /
        moodsForDay.length
        : 0;

    return {
      day,
      value: average,
    };
  });

  return (
    <div className="min-h-screen bg-[#faf9fc] px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#2d2a3d]">
              {greeting}, {user?.name || "Friend"} 👋
            </h1>
            <p className="text-sm text-[#7a7488] mt-1">
              Here's how the last week has looked.
            </p>
          </div>
          <Link
            to="/mood-tracker"
            className="w-fit px-5 py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_16px_-6px_rgba(167,139,250,0.6)] transition hover:-translate-y-0.5"
          >
            + Log today's mood
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[

            {

              label: "Highest Mood",
              value: moods.length
                ? `${Math.max(...moods.map((m) => m.mood))}/5`
                : "--",
              accent: "😊",

            },
            { label: "Check-ins", value: moods.length, accent: "✓" },
            { label: "Avg. mood", value: `${averageMood}/5`, accent: "📈" },
            { label: "Community posts", value: "--", accent: "🫂" },

          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{stat.accent}</span>
              </div>
              <p className="text-2xl font-semibold text-[#2d2a3d]">{stat.value}</p>
              <p className="text-xs text-[#7a7488] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* Mood chart */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-[#2d2a3d]">This week's mood</h2>
                <p className="text-xs text-[#7a7488] mt-0.5">1 = tough day, 5 = great day</p>
              </div>
            </div>
            <div className="flex items-end justify-between gap-3 h-40">
              {moodWeek.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end h-32 rounded-xl bg-[#faf9fc] overflow-hidden">
                    <div
                      className="w-full rounded-xl bg-gradient-to-t from-[#a78bfa] to-[#f472b6] transition-all"
                      style={{ height: `${(d.value / maxMood) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#7a7488] font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 text-sm text-[#7a7488]">
            {averageMood >= 4
              ? "😊 You've been feeling pretty good this week."
              : averageMood >= 3
                ? "🙂 A balanced week overall."
                : "💜 Tough week. Remember to take care of yourself."}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)]">
            <h2 className="text-base font-semibold text-[#2d2a3d] mb-4">Quick actions</h2>
            <div className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#faf9fc] transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a78bfa]/15 to-[#f472b6]/15 flex items-center justify-center text-lg">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2d2a3d]">{link.label}</p>
                    <p className="text-xs text-[#7a7488]">{link.desc}</p>
                  </div>
                  <span className="text-[#a29cb3] group-hover:text-[#f472b6] group-hover:translate-x-0.5 transition">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 mt-6 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)]">
          <h2 className="text-base font-semibold text-[#2d2a3d] mb-4">Recent activity</h2>
          <div className="space-y-4">
            {moods.slice(0, 5).map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shrink-0" />

                <p className="text-sm text-[#2d2a3d] flex-1">
                  Logged mood: {item.mood}/5
                  {item.note && ` - ${item.note}`}
                </p>

                <p className="text-xs text-[#a29cb3] shrink-0">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}