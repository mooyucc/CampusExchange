"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function ItemDetailTags({ 
  category, 
  condition, 
  status 
}: { 
  category: string; 
  condition: string; 
  status: string;
}) {
  const { t } = useLanguage();

  const getCategoryLabel = (cat: string) => {
    return (t.items.categoryOptions as Record<string, string>)[cat] || cat;
  };

  const getConditionLabel = (cond: string) => {
    return (t.items.conditionOptions as Record<string, string>)[cond] || cond;
  };

  const getStatusLabel = (stat: string) => {
    if (stat === "available") return t.item.detail.available;
    return stat;
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="px-3 py-1 text-sm font-semibold text-primary-600 bg-primary-100 rounded">
        {getCategoryLabel(category)}
      </span>
      <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
        {getConditionLabel(condition)}
      </span>
      <span className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded">
        {getStatusLabel(status)}
      </span>
    </div>
  );
}

