"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📄",
    title: "Smart PDF Upload",
    description:
      "Upload research papers, books, reports, and lecture notes in seconds.",
  },
  {
    icon: "🤖",
    title: "AI Summarization",
    description:
      "Generate concise, intelligent summaries of long documents instantly.",
  },
  {
    icon: "💬",
    title: "Chat with Documents",
    description:
      "Ask questions in natural language and get accurate AI-powered answers.",
  },
  {
    icon: "🔎",
    title: "Semantic Search",
    description:
      "Search across all uploaded documents using AI instead of simple keywords.",
  },
  {
    icon: "🧠",
    title: "Conversation Memory",
    description:
      "ResearchMate remembers previous questions to provide more natural conversations.",
  },
  {
    icon: "🔒",
    title: "Secure Workspace",
    description:
      "Your documents are private and accessible only through your authenticated account.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-gray-950 text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold">
            Everything You Need for AI Research
          </h2>

          <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg">
            ResearchMate AI combines document understanding,
            retrieval-augmented generation (RAG), semantic search,
            and conversational AI into one powerful workspace.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
            >
              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}