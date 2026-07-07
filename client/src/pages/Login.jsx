import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/auth";
import {  useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    try {
  const response = await loginUser({
    email: formData.email,
    password: formData.password,
  });

  console.log(response.data);

  alert("Login successful!");
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));



  
   navigate("/dashboard");

} catch (err) {
  console.log(err.response?.data);

  alert(
    err.response?.data?.message || "Email or Password is incorrect"
  );
}
  };


  return (
    <div className="min-h-screen w-full flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#a78bfa] to-[#f472b6] items-center justify-center p-12 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-md text-white">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              S
            </span>
            <span className="text-xl font-semibold">Sukoon</span>
          </Link>
          <h2 className="text-3xl font-semibold leading-snug mb-4">
            Welcome back. Your check-ins missed you.
          </h2>
          <p className="text-white/80 leading-relaxed">
            Log in to pick up where you left off — your mood history, your chats,
            and your community are all right where you left them.
          </p>
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
            Log in to your account
          </h1>
          <p className="text-sm text-[#7a7488] mb-8">
            New here?{" "}
            <Link
              to="/signup"
              className="text-[#f472b6] font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2d2a3d]"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#f472b6] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-black/10 bg-white text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none transition focus:border-[#a78bfa] focus:ring-4 focus:ring-[#a78bfa]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#7a7488] hover:text-[#2d2a3d]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-[#7a7488] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-black/20 text-[#a78bfa] focus:ring-[#a78bfa]/30"
              />
              Keep me logged in
            </label>

            <button
              type="submit"
              className="w-full py-2.75 rounded-xl text-white font-semibold text-sm bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_16px_-6px_rgba(167,139,250,0.6),inset_0_1px_1px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_20px_-6px_rgba(244,114,182,0.5)] active:translate-y-0"
            >
              Log in
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