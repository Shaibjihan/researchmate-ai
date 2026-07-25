"use client";

import { motion } from "framer-motion";

const technologies = [
  "Python",
  "FastAPI",
  "PostgreSQL",
  "SQLAlchemy",
  "JWT Auth",
  "Gemini AI",
  "RAG",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Docker (Learning)",
];

export default function TechStack() {
  return (
    <section
      id="tech"
      className="py-24 bg-gradient-to-b from-gray-950 to-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold">
            Built With Modern Technologies
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            ResearchMate AI combines modern backend engineering,
            AI services and a responsive frontend into one complete
            production-style application.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {technologies.map((tech, index) => (

            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: .8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: .35,
                delay: index * .05,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 text-center hover:border-blue-500 hover:scale-105 transition"
            >
              <span className="text-lg font-semibold">
                {tech}
              </span>
            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}