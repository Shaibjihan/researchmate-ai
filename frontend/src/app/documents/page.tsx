"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getDocuments } from "@/lib/document";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold">
          📄 My Documents
        </h1>

        <p className="text-gray-500 mt-2">
          View every PDF you have uploaded.
        </p>

        <div className="mt-8">

          {loading && (
            <p>Loading documents...</p>
          )}

          {!loading && documents.length === 0 && (
            <div className="bg-white rounded-xl shadow p-8">
              No documents uploaded yet.
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {documents.map((doc) => (

              <div
                key={doc.id}
                className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
              >

                <h2 className="font-bold text-lg">
                  {doc.title}
                </h2>

                <p className="text-gray-500 text-sm mt-3">
                  Document ID: {doc.id}
                </p>

                <button
                  className="mt-5 bg-black text-white px-4 py-2 rounded-lg"
                >
                  Open
                </button>

              </div>

            ))}

          </div>

        </div>

      </main>
    </div>
  );
}