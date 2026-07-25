
"use client";

type Props = {
  question: string;
  setQuestion: (value: string) => void;
  answer: string;
  asking: boolean;
  handleAskAI: () => void;
};

export default function AIChat({
  question,
  setQuestion,
  answer,
  asking,
  handleAskAI,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border">

      <h2 className="text-xl font-semibold mb-5">
        AI Chat
      </h2>

      <textarea
        className="w-full border rounded-lg p-3 min-h-[120px]"
        placeholder="Ask anything about your selected document..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={handleAskAI}
        disabled={asking}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {asking ? "Thinking..." : "Ask AI"}
      </button>

      <div className="mt-6 rounded-lg bg-gray-50 border p-4 min-h-[120px]">
        {answer ? (
          <p className="whitespace-pre-wrap">{answer}</p>
        ) : (
          <p className="text-gray-400">
            AI response will appear here...
          </p>
        )}
      </div>

    </div>
  );
}