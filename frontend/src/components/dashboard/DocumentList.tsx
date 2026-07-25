"use client";

import { Trash2, Download } from "lucide-react";

type Document = {
  id: number;
  title: string;
};

type Props = {
  documents: Document[];
  selectedDoc: Document | null;
  setSelectedDoc: (doc: Document) => void;
  handleDelete: (id: number) => void;
  handleDownload: (id: number) => void;
};

export default function DocumentList({
  documents,
  selectedDoc,
  setSelectedDoc,
  handleDelete,
  handleDownload,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border">
      <h2 className="text-xl font-semibold mb-5">
        Your Documents
      </h2>

      {documents.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No documents uploaded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`flex items-center justify-between rounded-xl border p-4 transition ${
                selectedDoc?.id === doc.id
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => setSelectedDoc(doc)}
              >
                 {doc.title}
              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={() => handleDownload(doc.id)}
                  className="text-blue-600 hover:text-blue-700"
                  title="Download"
                >
                  <Download size={20} />
                </button>

                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this document?"
                      )
                    ) {
                      handleDelete(doc.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}