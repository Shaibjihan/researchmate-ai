"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
    },
    {
      label: "Documents",
      icon: "📄",
      path: "/documents",
    },
    {
      label: "AI Chat",
      icon: "🤖",
      path: "/chat",
    },
    {
      label: "Global Search",
      icon: "🔎",
      path: "/search",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800">

      {/* Logo */}
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
           ResearchMate AI
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          AI Research Workspace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-3">

        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              pathname === item.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.label}
            </span>
          </button>
        ))}

      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800">

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold"
        >
           Logout
        </button>

      </div>

    </aside>
  );
}