"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";

import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import UploadCard from "@/components/dashboard/UploadCard";
import GlobalSearch from "@/components/dashboard/GlobalSearch";
import DocumentList from "@/components/dashboard/DocumentList";
import AIChat from "@/components/dashboard/AIChat";
import RecentChats from "@/components/dashboard/RecentChats";

import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  downloadDocument,
} from "@/lib/document";

import {
  askAI,
  globalSearch as apiGlobalSearch,
  getChatHistory,
} from "@/lib/ai";

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const [globalQuestion, setGlobalQuestion] = useState("");
  const [globalAnswer, setGlobalAnswer] = useState("");
  const [searching, setSearching] = useState(false);

  const [chatHistory, setChatHistory] = useState<any[]>([]);

  // ---------------- LOAD DOCUMENTS ----------------

  useEffect(() => {
    fetchDocuments();
  }, []);

  // ---------------- LOAD CHAT HISTORY ----------------

  useEffect(() => {
    if (selectedDoc) {
      fetchChatHistory(selectedDoc.id);
    }
  }, [selectedDoc]);

  // ---------------- FETCH DOCUMENTS ----------------

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  // ---------------- FETCH CHAT HISTORY ----------------

  const fetchChatHistory = async (documentId: number) => {
    try {
      const history = await getChatHistory(documentId);

      const formattedHistory = [];

      for (let i = 0; i < history.length; i += 2) {
        formattedHistory.push({
          question: history[i]?.content || "",
          answer: history[i + 1]?.content || "",
          doc: selectedDoc?.title || "",
        });
      }

      setChatHistory(formattedHistory);
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  };

  // ---------------- UPLOAD ----------------

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      await uploadDocument(file);

      setFile(null);

      await fetchDocuments();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (id: number) => {
    try {
      await deleteDocument(id);

      if (selectedDoc?.id === id) {
        setSelectedDoc(null);
        setQuestion("");
        setAnswer("");
        setChatHistory([]);
      }

      await fetchDocuments();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ---------------- DOWNLOAD ----------------

  const handleDownload = async (id: number) => {
    try {
      await downloadDocument(id);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  // ---------------- AI CHAT ----------------

  const handleAskAI = async () => {
    if (!selectedDoc || !question) {
      alert("Please select a document first.");
      return;
    }

    setAsking(true);
    setAnswer("");

    try {
      const res = await askAI(question, selectedDoc.id);

      let current = "";

      for (let i = 0; i < res.answer.length; i++) {
        current += res.answer[i];
        setAnswer(current);

        await new Promise((r) => setTimeout(r, 10));
      }

      setQuestion("");

      await fetchChatHistory(selectedDoc.id);
    } catch (err) {
      setAnswer("Error getting AI response.");
    } finally {
      setAsking(false);
    }
  };

  // ---------------- GLOBAL SEARCH ----------------

  const handleGlobalSearch = async () => {
    if (!globalQuestion) return;

    setSearching(true);

    try {
      const res = await apiGlobalSearch(globalQuestion);

      setGlobalAnswer(res.answer || "No results found.");
    } catch (err) {
      setGlobalAnswer("Error performing global search.");
    } finally {
      setSearching(false);
    }
  };

  // ---------------- UI ----------------

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-950 text-white">
        <Sidebar />

        <div className="flex-1 min-h-screen bg-gray-50 text-gray-900 p-8 space-y-8">
          <Header />

          <StatsCards documentCount={documents.length} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UploadCard
              file={file}
              setFile={setFile}
              uploading={uploading}
              handleUpload={handleUpload}
            />

            <GlobalSearch
              globalQuestion={globalQuestion}
              setGlobalQuestion={setGlobalQuestion}
              globalAnswer={globalAnswer}
              searching={searching}
              handleGlobalSearch={handleGlobalSearch}
            />
          </div>

          <DocumentList
            documents={documents}
            selectedDoc={selectedDoc}
            setSelectedDoc={setSelectedDoc}
            handleDelete={handleDelete}
            handleDownload={handleDownload}
          />

          {selectedDoc && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <strong>Selected:</strong> {selectedDoc.title}
            </div>
          )}

          <AIChat
            question={question}
            setQuestion={setQuestion}
            answer={answer}
            asking={asking}
            handleAskAI={handleAskAI}
          />

          <RecentChats chatHistory={chatHistory} />
        </div>
      </div>
    </ProtectedRoute>
  );
}