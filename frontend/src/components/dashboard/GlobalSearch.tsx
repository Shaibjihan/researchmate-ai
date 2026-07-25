"use client";

type Props = {
  globalQuestion: string;
  setGlobalQuestion: (value: string) => void;
  globalAnswer: string;
  searching: boolean;
  handleGlobalSearch: () => void;
};

export default function GlobalSearch({
  globalQuestion,
  setGlobalQuestion,
  globalAnswer,
  searching,
  handleGlobalSearch,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border">

      <h2 className="text-xl font-semibold mb-5">
        Global AI Search
      </h2>

      <textarea
        className="w-full border rounded-lg p-3 min-h-[120px]"
        placeholder="Search across all uploaded documents..."
        value={globalQuestion}
        onChange={(e) => setGlobalQuestion(e.target.value)}
      />

      <button
        onClick={handleGlobalSearch}
        disabled={searching}
        className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
      >
        {searching ? "Searching..." : "Search"}
      </button>

      <div className="mt-6 bg-gray-50 rounded-lg border p-4 min-h-[120px]">
        {globalAnswer ? (
          <p className="whitespace-pre-wrap">{globalAnswer}</p>
        ) : (
          <p className="text-gray-400">
            Search results will appear here...
          </p>
        )}
      </div>

    </div>
  );
}