"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardContentProps {
  children?: React.ReactNode;
}

export default function DashboardContent({ children }: DashboardContentProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* 面包屑导航 */}
      <div className="mb-6">
        <nav className="text-sm text-black">
          <Link href="/" className="hover:text-primary-600 transition">
            {t.dashboard.breadcrumb.home}
          </Link>
          <span className="mx-2">/</span>
          <span>{t.dashboard.breadcrumb.myCenter}</span>
        </nav>
      </div>

      {/* 页面标题 */}
      <h1 className="text-5xl font-serif font-normal text-black mb-12 tracking-tight">
        {t.dashboard.title}
      </h1>

      {children}
    </>
  );
}

