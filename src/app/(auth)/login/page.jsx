"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  RiMailLine, 
  RiLock2Line, 
  RiGoogleFill,
  RiAlertLine,
  RiCheckboxCircleLine
} from "react-icons/ri";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [notification, setNotification] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: "", message: "" }), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Logging in user:", formData);

      showNotification("success", "Login successful! Welcoming you back...");
      
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (error) {
      showNotification("error", error.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Initiating Google Login...");
      
      showNotification("success", "Google Login Successful! Welcome.");
      
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      showNotification("error", "Google Sign-In failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center pt-24 pb-16 transition-colors duration-300 px-4">
      
      {notification.message && (
        <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl backdrop-blur-md animate-bounce ${
          notification.type === "success" 
            ? "bg-green-500/10 border-green-500/20 text-green-500" 
            : "bg-red-500/10 border-red-500/20 text-red-500"
        }`}>
          {notification.type === "success" ? <RiCheckboxCircleLine className="text-xl" /> : <RiAlertLine className="text-xl" />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      <div className="w-full max-w-md bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-100/50 dark:shadow-none">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">
            Welcome <span className="text-[#f97316]">Back</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
            Log in to manage your bookings and explore fleets.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-white/70 uppercase tracking-wider block">
                Password
              </label>
              <Link href="#" className="text-xs text-gray-400 hover:text-[#f97316] transition-colors">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <RiLock2Line className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:border-[#f97316] dark:focus:border-[#f97316] outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-[#f97316]/10 text-sm mt-2"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-white/[0.06]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            {/* <span className="bg-white dark:bg-[#121212] px-3 text-gray-400">Or continue with</span> */}
            <span className=" px-3 text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2.5 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/[0.06] text-gray-900 dark:text-white border border-gray-200 dark:border-white/[0.08] py-3 rounded-xl font-medium text-sm transition-colors"
        >
          <RiGoogleFill className="text-lg text-red-500" />
          Sign in with Google
        </button>

        <p className="text-center text-xs text-gray-500 dark:text-white/40 mt-6">
          Don't have an account yet?{" "}
          <Link href="/register" className="text-[#f97316] font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}