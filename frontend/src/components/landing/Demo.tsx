"use client";

import { motion } from "framer-motion";

export default function Demo() {
  return (
    <section className="py-24 bg-gray-950 text-white">

      <div className="max-w-6xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold">
            AI Workspace Preview
          </h2>

          <p className="text-gray-400 mt-4">
            A modern research dashboard powered by FastAPI and Gemini AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
        >

          <div className="space-y-5">

            <div className="bg-gray-800 rounded-xl p-4">
              📄 Uploaded: Deep Learning Research.pdf
            </div>

            <div className="bg-blue-600/20 rounded-xl p-4">
              🤖 AI is generating document embeddings...
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              💬 Explain Transformer Architecture.
            </div>

            <div className="bg-green-600/20 rounded-xl p-4">
              Transformer architecture uses self-attention mechanisms
              to process sequential data more efficiently than recurrent networks.
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}