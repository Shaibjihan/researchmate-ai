import Sidebar from "@/components/Sidebar";

export default function ChatPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8">
        <h1 className="text-3xl font-bold">
          🤖 AI Chat
        </h1>

        <p className="mt-2 text-gray-500">
          Chat with your documents
        </p>
      </div>
    </div>
  );
}