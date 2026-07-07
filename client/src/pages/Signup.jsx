import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/auth";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the terms to continue.");
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);

      alert("Registration successful!");

      // Optional: Clear the form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setAgreed(false);

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#a78bfa] to-[#f472b6] items-center justify-center p-12 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-md text-white">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              S
            </span>
            <span className="text-xl font-semibold">Sukoon</span>
          </Link>
          <h2 className="text-3xl font-semibold leading-snug mb-4">
            A quiet place to check in with yourself, from day one.
          </h2>
          <p className="text-white/80 leading-relaxed mb-8">
            Track your mood, talk to an AI companion that remembers context, and
            find a community that gets it. Free to start.
          </p>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Free forever, no credit card
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Private by default, anonymous if you want
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Built for the Indian context
            </li>
          </ul>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#faf9fc] p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white font-bold shadow-[0_6px_14px_-4px_rgba(167,139,250,0.55)]">
              S
            </span>
            <span className="text-lg font-semibold text-[#2d2a3d]">Sukoon</span>
          </div>

          <h1 className="text-2xl font-semibold text-[#2d2a3d] mb-2">
            Create your account
          </h1>
          <p className="text-sm text-[#7a7488] mb-8">
            Already have one?{" "}
            <Link
              to="/login"
              className="text-[#f472b6] font-medium hover:underline"
            >
              Log in
            </Link>
          </p>

          {error && (
            <div className="mb-5 px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#2d2a3d] mb-1.5"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ananya Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none transition focus:border-[#a78bfa] focus:ring-4 focus:ring-[#a78bfa]/15"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#2d2a3d] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none transition focus:border-[#a78bfa] focus:ring-4 focus:ring-[#a78bfa]/15"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2d2a3d] mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none transition focus:border-[#a78bfa] focus:ring-4 focus:ring-[#a78bfa]/15"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#2d2a3d] mb-1.5"
                >
                  Confirm
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  minLength={8}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none transition focus:border-[#a78bfa] focus:ring-4 focus:ring-[#a78bfa]/15"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-[#7a7488] cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-black/20 text-[#a78bfa] focus:ring-[#a78bfa]/30"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-[#f472b6] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#f472b6] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2.75 rounded-xl text-white font-semibold text-sm bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_16px_-6px_rgba(167,139,250,0.6),inset_0_1px_1px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-6px_rgba(244,114,182,0.5)] active:translate-y-0"
            >
              Create account
            </button>
          </form>

          <div className="flex items-center gap-3 my-7">
            <div className="h-px flex-1 bg-black/10" />
            <span className="text-xs text-[#a29cb3]">or</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>

          <button
            type="button"
            className="w-full py-2.5 rounded-xl border border-black/10 bg-white text-sm font-medium text-[#2d2a3d] flex items-center justify-center gap-2 transition hover:bg-[#faf9fc]"
          >
            <span className="text-base">G</span>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}