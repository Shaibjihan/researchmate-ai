import Sidebar from "@/components/Sidebar";

export default function SearchPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8">
        <h1 className="text-3xl font-bold">
          🔎 Global Search
        </h1>

        <p className="mt-2 text-gray-500">
          Search across all documents
        </p>
      </div>
    </div>
  );
}