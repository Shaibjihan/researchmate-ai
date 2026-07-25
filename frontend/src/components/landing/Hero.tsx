"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white flex items-center overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm mb-6">
             AI-Powered Research Assistant
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Chat With
            <br />
            Your PDFs
            <span className="text-blue-500"> Using AI</span>
          </h1>

          <p className="mt-8 text-xl text-gray-300 max-w-xl leading-8">
            Upload research papers, books, lecture notes, or documents.
            Generate instant summaries, ask intelligent questions, and search
            across all your knowledge with ResearchMate AI.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition"
            >
              Get Started Free
            </Link>

            <Link
              href="/login"
              className="border border-gray-500 hover:border-white px-8 py-4 rounded-xl transition"
            >
              Login
            </Link>

          </div>

          <div className="mt-12 flex gap-8 text-gray-400 text-sm">

            <div>
              <h3 className="text-3xl font-bold text-white">100%</h3>
              <p>Private Workspace</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">AI</h3>
              <p>Powered Summaries</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">24/7</h3>
              <p>Available Anytime</p>
            </div>

          </div>
        </motion.div>

        {/* Right Side Preview */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                ResearchMate AI
              </h2>

              <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                Online
              </span>
            </div>

            <div className="space-y-4">

              <div className="bg-gray-800 p-4 rounded-xl">
                 Machine Learning Notes.pdf
              </div>

              <div className="bg-blue-600/20 p-4 rounded-xl border border-blue-500/20">
                 Summarizing document...
              </div>

              <div className="bg-gray-800 p-4 rounded-xl">
                 What is Gradient Descent?
              </div>

              <div className="bg-green-600/20 p-4 rounded-xl border border-green-500/20">
                AI: Gradient Descent is an optimization algorithm used to
                minimize a function by iteratively moving toward the steepest
                descent...
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}