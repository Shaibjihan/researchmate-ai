"use client";

import {
  FileText,
  BrainCircuit,
  Search,
  Activity,
} from "lucide-react";

type Props = {
  documentCount: number;
};

export default function StatsCards({
  documentCount,
}: Props) {
  const cards = [
    {
      title: "Documents",
      value: documentCount,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "AI Status",
      value: "Online",
      icon: BrainCircuit,
      color: "text-green-600",
    },
    {
      title: "Global Search",
      value: "Ready",
      icon: Search,
      color: "text-purple-600",
    },
    {
      title: "Workspace",
      value: "Active",
      icon: Activity,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>
              </div>

              <Icon className={`h-8 w-8 ${card.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}