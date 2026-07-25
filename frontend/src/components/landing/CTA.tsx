"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      <div className="max-w-5xl mx-auto px-8 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-6"
        >
          Ready to Explore Your Documents with AI?
        </motion.h2>

        <p className="text-xl text-blue-100 mb-10">
          Upload PDFs, generate AI summaries, search your knowledge base,
          and chat with your documents using Retrieval-Augmented Generation.
        </p>

        <Link
          href="/login"
          className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Launch Dashboard
        </Link>

      </div>
    </section>
  );
}