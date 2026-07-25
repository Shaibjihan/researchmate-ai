"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Upload PDF",
    description:
      "Upload research papers, lecture notes, books, or documentation securely.",
  },
  {
    number: "02",
    title: "AI Processing",
    description:
      "ResearchMate extracts text, creates embeddings, and prepares your document for intelligent search.",
  },
  {
    number: "03",
    title: "Ask Questions",
    description:
      "Chat naturally with your document and receive context-aware answers powered by Gemini AI.",
  },
  {
    number: "04",
    title: "Search Everything",
    description:
      "Search across every uploaded document from one unified AI-powered workspace.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-24 bg-gradient-to-b from-gray-950 to-black text-white"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            How ResearchMate AI Works
          </h2>

          <p className="text-gray-400 mt-4">
            Four simple steps from PDF upload to AI-powered answers.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {steps.map((step, index) => (

            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <div className="text-blue-500 text-4xl font-bold mb-6">
                {step.number}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-400">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}