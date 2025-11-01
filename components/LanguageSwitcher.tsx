"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (lang: "zh" | "en") => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
      {/* 触发按钮 */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer shadow-lg rounded-lg border border-gray-200"
        aria-label="选择语言"
        aria-expanded={isOpen}
      >
        {currentLanguage?.label || "中文"}
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-56 bg-gray-100 rounded-lg shadow-xl border border-gray-200 py-2 px-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleLanguageChange(lang.code as "zh" | "en");
              }}
              className={`w-full text-left py-3 px-5 text-sm transition-all rounded-md ${
                language === lang.code
                  ? "bg-gray-600 text-white font-medium"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

