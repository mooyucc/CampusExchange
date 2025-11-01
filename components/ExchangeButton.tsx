"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExchangeButtonProps {
  itemId: string;
  ownerId: string;
  hasRequested: boolean;
  requestId?: string;
}

export default function ExchangeButton({
  itemId,
  ownerId,
  hasRequested,
  requestId,
}: ExchangeButtonProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/exchange/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          message,
        }),
      });

      if (response.ok) {
        router.refresh();
        setShowForm(false);
        setMessage("");
      } else {
        const data = await response.json();
        alert(data.error || "Failed");
      }
    } catch (error) {
      alert("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  if (hasRequested) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800">
          {t.exchange.button.alreadySent}
        </p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
      >
        {t.exchange.button.request}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.exchange.button.messageLabel}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder={t.exchange.button.messagePlaceholder}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
        >
          {loading ? t.exchange.button.submitting : t.exchange.button.submit}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setMessage("");
          }}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          {t.exchange.button.cancel}
        </button>
      </div>
    </form>
  );
}

