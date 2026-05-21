"use client";

import Link from "next/link";
import { RiErrorWarningLine, RiArrowLeftLine } from "react-icons/ri";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#f97316]/10 flex items-center justify-center">
          <RiErrorWarningLine className="text-5xl text-[#f97316]" />
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white/90 mb-3">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-white/50 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold rounded-xl transition shadow-lg shadow-[#f97316]/20"
        >
          <RiArrowLeftLine className="text-lg" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}