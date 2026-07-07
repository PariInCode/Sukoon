import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TABS = ["Overview", "Account settings", "Privacy", "Notifications"];

const BADGES = [
  { icon: "🔥", label: "12-day streak" },
  { icon: "🌱", label: "First check-in" },
  { icon: "💬", label: "10 AI chats" },
  { icon: "🫂", label: "Community member" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bio: user.bio || "No bio added yet.",
      });
    }
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  return (
    <div className="min-h-screen bg-[#faf9fc] px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header card */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 sm:p-8 shadow-[0_15px_40px_-25px_rgba(167,139,250,0.35)] mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-[0_12px_28px_-10px_rgba(167,139,250,0.5)]">
              {formData.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-[#2d2a3d]">{formData.name}</h1>
              <p className="text-sm text-[#7a7488] mt-0.5">{formData.email}</p>
              <p className="text-sm text-[#2d2a3d] mt-2 leading-relaxed">{formData.bio}</p>
            </div>
            <button className="px-4 py-2 rounded-xl border border-black/10 text-sm font-medium text-[#2d2a3d] hover:bg-[#faf9fc] transition shrink-0 h-fit">
              Edit profile
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/[0.05]">
            {[
              { label: "Day streak", value: "12" },
              { label: "Check-ins", value: "34" },
              { label: "Community posts", value: "6" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-semibold text-[#2d2a3d]">{stat.value}</p>
                <p className="text-xs text-[#7a7488] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)] mb-6">
          <h2 className="text-sm font-semibold text-[#2d2a3d] mb-4">Badges earned</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#faf9fc] border border-black/[0.05]"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-xs font-medium text-[#2d2a3d] text-center">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-[0_10px_30px_-22px_rgba(167,139,250,0.3)] overflow-hidden">
          <div className="flex overflow-x-auto border-b border-black/[0.06]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-5 py-3.5 text-sm font-medium border-b-2 transition ${activeTab === tab
                  ? "border-[#f472b6] text-[#2d2a3d]"
                  : "border-transparent text-[#7a7488] hover:text-[#2d2a3d]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "Overview" && (
              <p className="text-sm text-[#7a7488]">
                You've been checking in consistently for 12 days — your longest streak yet.
                Keep it up.
              </p>
            )}

            {activeTab === "Account settings" && (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-[#2d2a3d] mb-1.5">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-[#faf9fc] text-sm text-[#2d2a3d] outline-none focus:ring-2 focus:ring-[#a78bfa]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2a3d] mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-[#faf9fc] text-sm text-[#2d2a3d] outline-none focus:ring-2 focus:ring-[#a78bfa]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2a3d] mb-1.5">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none px-4 py-2.5 rounded-xl border border-black/10 bg-[#faf9fc] text-sm text-[#2d2a3d] outline-none focus:ring-2 focus:ring-[#a78bfa]/20"
                  />
                </div>
                <button className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_14px_-4px_rgba(167,139,250,0.55)] transition hover:-translate-y-0.5">
                  Save changes
                </button>
              </div>
            )}

            {activeTab === "Privacy" && (
              <div className="space-y-3 max-w-md">
                {[
                  "Show my name in Community posts",
                  "Allow AI chat to reference my mood history",
                  "Make my profile discoverable to others",
                ].map((label) => (
                  <label
                    key={label}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#faf9fc] cursor-pointer"
                  >
                    <span className="text-sm text-[#2d2a3d]">{label}</span>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-black/20 text-[#a78bfa]"
                    />
                  </label>
                ))}
              </div>
            )}

            {activeTab === "Notifications" && (
              <div className="space-y-3 max-w-md">
                {[
                  "Daily mood check-in reminder",
                  "Community replies",
                  "New resources & articles",
                ].map((label) => (
                  <label
                    key={label}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#faf9fc] cursor-pointer"
                  >
                    <span className="text-sm text-[#2d2a3d]">{label}</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-black/20 text-[#a78bfa]"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <button   onClick={handleLogout} className="mt-6 text-sm text-red-500 font-medium hover:underline">
          Log out
        </button>
      </div>
    </div>
  );
}