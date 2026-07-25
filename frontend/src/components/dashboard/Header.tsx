"use client";

import { Upload, Search } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      <div>

        <p className="text-gray-500 text-sm">
          Welcome back 
        </p>

        <h1 className="text-4xl font-bold mt-2 text-gray-900">
          ResearchMate AI Workspace
        </h1>

        <p className="text-gray-500 mt-3 max-w-xl">
          Upload PDFs, chat with AI, summarize research papers,
          and search across your entire knowledge base.
        </p>

      </div>

      <div className="flex gap-3">

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">
          <Upload size={18} />
          Upload
        </button>

        <button className="flex items-center gap-2 border border-gray-300 text-gray-800 px-5 py-3 rounded-xl hover:bg-gray-100 transition">
          <Search size={18} />
          Search
        </button>

      </div>

    </div>
  );
}