"use client";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 py-10">

      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h2 className="text-white font-bold text-xl">
            ResearchMate AI
          </h2>

          <p className="text-sm mt-2">
            AI-powered document research assistant built with
            Next.js, FastAPI, PostgreSQL and Gemini AI.
          </p>
        </div>

        <div className="text-sm">
          Built by Shahib Hasan Jihan
        </div>

      </div>

    </footer>
  );
}