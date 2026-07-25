"use client";

import { motion } from "framer-motion";

const layers = [
  {
    title: "Frontend",
    items: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["FastAPI", "JWT Authentication", "REST API"],
  },
  {
    title: "AI",
    items: ["Gemini AI", "RAG", "Embeddings"],
  },
  {
    title: "Database",
    items: ["PostgreSQL", "SQLAlchemy"],
  },
];

export default function Architecture() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-14"
        >
          System Architecture
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-6">

          {layers.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">
                {layer.title}
              </h3>

              <ul className="space-y-2 text-gray-300">
                {layer.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}