"use client";

type Chat = {
  question: string;
  answer: string;
  doc: string;
};

type Props = {
  chatHistory: Chat[];
};

export default function RecentChats({
  chatHistory,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border">

      <h2 className="text-xl font-semibold mb-5">
        Recent Chats
      </h2>

      {chatHistory.length === 0 ? (
        <p className="text-gray-400">
          No conversations yet.
        </p>
      ) : (
        <div className="space-y-4">

          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className="rounded-lg border p-4"
            >
              <p>
                <strong>Q:</strong> {chat.question}
              </p>

              <p className="mt-2">
                <strong>A:</strong> {chat.answer}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {chat.doc}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}