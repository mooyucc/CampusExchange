"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [logoError, setLogoError] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>("/logo.png");

  return (
    <>
      {/* 顶部深色导航栏 - 广告宣传语 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark-header text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-10">
            <span className="text-center">
              {t.banner.promotion}
            </span>
          </div>
        </div>
      </div>

      {/* 主导航栏 */}
      <nav className="fixed top-10 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              {/* Logo图片 - 如果存在/logo.png或/logo.svg，将显示图片，否则只显示文本 */}
              {!logoError && (
                <div className="relative w-10 h-10">
                  <Image
                    src={logoSrc}
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                    onError={() => {
                      // 如果png不存在，尝试svg
                      if (logoSrc.includes('logo.png')) {
                        setLogoSrc('/logo.svg');
                      } else {
                        // 如果两个都不存在，隐藏图片元素
                        setLogoError(true);
                      }
                    }}
                  />
                </div>
              )}
              <span className="text-3xl font-serif font-bold text-black">
                {t.nav.title}
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <Link
                href="/items"
                className="text-sm font-bold uppercase tracking-wide text-black hover:text-primary-600 transition"
              >
                {t.nav.items}
              </Link>
              <Link
                href="/items/new"
                className="text-sm font-bold uppercase tracking-wide text-primary-600 hover:text-primary-700 transition"
              >
                {t.nav.postItem}
              </Link>
            </div>
            <div className="flex items-center gap-6">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm font-semibold text-black hover:text-primary-600 transition"
                  >
                    {t.nav.myCenter}
                  </Link>
                  <Link
                    href="/api/auth/signout"
                    className="text-sm font-semibold text-black hover:text-primary-600 transition"
                  >
                    {t.nav.signOut}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-semibold text-black hover:text-primary-600 transition"
                  >
                    {t.nav.signIn}
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
                  >
                    {t.nav.signUp}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

