"use client";

type UploadCardProps = {
  file: File | null;
  setFile: (file: File | null) => void;
  uploading: boolean;
  handleUpload: () => void;
};

export default function UploadCard({
  file,
  setFile,
  uploading,
  handleUpload,
}: UploadCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border">

      <h2 className="text-xl font-semibold mb-4">
        Upload PDF
      </h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 w-full"
      />

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50 transition"
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </button>

    </div>
  );
}