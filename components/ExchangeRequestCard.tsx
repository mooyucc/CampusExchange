"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExchangeRequestCardProps {
  request: {
    id: string;
    message: string | null;
    status: string;
    createdAt: Date;
    item: {
      id: string;
      title: string;
      owner?: { name: string };
    };
    requester: { name: string; grade?: string | null };
    receiver?: { name: string };
  };
  type: "sent" | "received";
}

export default function ExchangeRequestCard({
  request,
  type,
}: ExchangeRequestCardProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/exchange/${request.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/items/${request.item.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-primary-600"
            >
              {request.item.title}
            </Link>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${
                statusColors[request.status as keyof typeof statusColors] ||
                "bg-gray-100 text-gray-800"
              }`}
            >
              {(t.exchange.request.status as any)[request.status] || request.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {type === "sent" ? (
              <>
                {t.exchange.request.sentTo} {request.receiver?.name || request.item.owner?.name}
              </>
            ) : (
              <>
                {t.exchange.request.from} {request.requester.name}
                {request.requester.grade && ` · ${request.requester.grade}`}
              </>
            )}
          </p>
          {request.message && (
            <p className="text-gray-700 mb-2">{t.exchange.request.message} {request.message}</p>
          )}
          <p className="text-xs text-gray-500">
            {new Date(request.createdAt).toLocaleString("zh-CN")}
          </p>
        </div>
      </div>

      {type === "received" && request.status === "pending" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleStatusChange("accepted")}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {t.exchange.request.status.accepted}
          </button>
          <button
            onClick={() => handleStatusChange("rejected")}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {t.exchange.request.status.rejected}
          </button>
        </div>
      )}
    </div>
  );
}

