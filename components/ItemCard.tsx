"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    category: string;
    condition: string;
    images: string;
    owner: {
      name: string;
      grade?: string | null;
    };
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  const { t } = useLanguage();
  const images = JSON.parse(item.images || "[]");
  const firstImage = images[0] || "/placeholder.png";

  const getCategoryLabel = (cat: string) => {
    return (t.items.categoryOptions as Record<string, string>)[cat] || cat;
  };

  const getConditionLabel = (cond: string) => {
    return (t.items.conditionOptions as Record<string, string>)[cond] || cond;
  };

  return (
    <Link href={`/items/${item.id}`}>
      <div className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
        {/* 产品图片区域 - 浅米色背景 */}
        <div className="relative w-full h-64 bg-beige-light mb-4 overflow-hidden">
          {firstImage !== "/placeholder.png" ? (
            <Image
              src={firstImage}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-black/20">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
        {/* 产品信息 */}
        <div className="px-5 pb-5">
          <h3 className="font-normal text-base text-black mb-2 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-black/60 uppercase tracking-wide">
                {getCategoryLabel(item.category)}
              </span>
              {item.condition && (
                <>
                  <span className="text-black/20">·</span>
                  <span className="text-xs text-black/60">
                    {getConditionLabel(item.condition)}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center text-xs text-black/50 mt-2">
            <span>{item.owner.name}</span>
            {item.owner.grade && (
              <span className="ml-2">· {item.owner.grade}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

