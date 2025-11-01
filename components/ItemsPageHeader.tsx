"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ItemsPageHeader() {
  const { t } = useLanguage();

  return (
    <>
      {/* 面包屑导航 */}
      <div className="mb-6">
        <nav className="text-sm text-black">
          <Link href="/" className="hover:text-primary-600 transition">
            {t.items.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <span>{t.items.breadcrumb.browse}</span>
        </nav>
      </div>

      {/* 页面标题 */}
      <h1 className="text-5xl font-serif font-normal text-black mb-8 tracking-tight">
        {t.items.title}
      </h1>
    </>
  );
}

