"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

interface DashboardSectionProps {
  type: "myItems" | "sentRequests" | "receivedRequests";
  children: ReactNode;
}

const sectionTitles = {
  myItems: (t: any) => t.dashboard.myItems.title,
  sentRequests: (t: any) => t.dashboard.sentRequests.title,
  receivedRequests: (t: any) => t.dashboard.receivedRequests.title,
};

export default function DashboardSection({ type, children }: DashboardSectionProps) {
  const { t } = useLanguage();

  return <>{children}</>;
}

export function DashboardSectionHeader({ type }: { type: "myItems" | "sentRequests" | "receivedRequests" }) {
  const { t } = useLanguage();
  
  if (type === "myItems") {
    return (
      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-serif font-normal text-black">{t.dashboard.myItems.title}</h2>
        <Link
          href="/items/new"
          className="px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
        >
          {t.dashboard.myItems.newItem}
        </Link>
      </div>
    );
  }

  return (
    <h2 className="text-3xl font-serif font-normal text-black mb-8 border-b border-gray-200 pb-4">
      {type === "sentRequests" 
        ? t.dashboard.sentRequests.title 
        : t.dashboard.receivedRequests.title}
    </h2>
  );
}

export function DashboardEmpty({ type }: { type: "myItems" | "sentRequests" | "receivedRequests" }) {
  const { t } = useLanguage();

  const emptyMessages = {
    myItems: {
      message: t.dashboard.myItems.empty,
      buttonText: t.dashboard.myItems.postNow,
      showButton: true,
    },
    sentRequests: {
      message: t.dashboard.sentRequests.empty,
      buttonText: "",
      showButton: false,
    },
    receivedRequests: {
      message: t.dashboard.receivedRequests.empty,
      buttonText: "",
      showButton: false,
    },
  };

  const { message, buttonText, showButton } = emptyMessages[type];

  return (
    <div className="bg-beige-light rounded-lg p-12 text-center">
      <p className="text-black mb-6">{message}</p>
      {showButton && (
        <Link
          href="/items/new"
          className="inline-block px-8 py-3 bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

