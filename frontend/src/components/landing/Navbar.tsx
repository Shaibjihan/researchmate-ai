"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white tracking-wide"
        >
           ResearchMate AI
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <a href="#features" className="hover:text-white transition">
            Features
          </a>

          <a href="#how" className="hover:text-white transition">
            How It Works
          </a>

          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link
            href="/login"
            className="px-5 py-2 rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Get Started
          </Link>

        </div>

      </div>
    </motion.nav>
  );
}