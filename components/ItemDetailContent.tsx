"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

interface ItemDetailContentProps {
  children: React.ReactNode;
}

export default function ItemDetailContent({ children }: ItemDetailContentProps) {
  const { t } = useLanguage();

  return <>{children}</>;
}

export function ItemDetailBreadcrumb({ itemTitle }: { itemTitle: string }) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6">
      <nav className="text-sm text-black">
        <Link href="/" className="hover:text-primary-600 transition">
          {t.items.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/items" className="hover:text-primary-600 transition">
          {t.items.breadcrumb.browse}
        </Link>
        <span className="mx-2">/</span>
        <span>{itemTitle}</span>
      </nav>
    </div>
  );
}

export function ItemDetailNotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-normal text-black mb-6">
            {t.item.detail.notFound}
          </h1>
          <Link
            href="/items"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            {t.item.detail.backToList}
          </Link>
        </div>
      </main>
    </div>
  );
}

export function ItemDetailInfo({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-black mb-3">
        {t.item.detail.description}
      </h2>
      {children}
    </div>
  );
}

export function ItemDetailPublisher({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-6 p-5 bg-beige-light rounded-lg border border-gray-200">
      <h3 className="font-semibold text-black mb-2">
        {t.item.detail.publisher}
      </h3>
      {children}
    </div>
  );
}

export function ItemDetailOwnerMessage() {
  const { t } = useLanguage();
  
  return (
    <div className="mt-6 p-4 bg-beige-light border border-gray-200 rounded-lg">
      <p className="text-black/70">
        {t.item.detail.ownerMessage}{" "}
        <Link
          href="/dashboard"
          className="font-semibold text-primary-600 hover:text-primary-700 transition"
        >
          {t.item.detail.myCenter}
        </Link>{" "}
        {t.item.detail.manageIt}
      </p>
    </div>
  );
}

export function ItemDetailLoginPrompt() {
  const { t } = useLanguage();
  
  return (
    <div className="mt-6 p-4 bg-beige-light border border-gray-200 rounded-lg">
      <p className="text-black/70">
        {t.item.detail.loginToRequest}{" "}
        <Link
          href="/auth/signin"
          className="font-semibold text-primary-600 hover:text-primary-700 transition"
        >
          {t.item.detail.login}
        </Link>{" "}
        {t.item.detail.afterLogin}
      </p>
    </div>
  );
}

