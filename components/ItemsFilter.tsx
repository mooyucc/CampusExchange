"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ItemsFilterProps {
  categories: string[];
  conditions: string[];
  currentCategory?: string;
  currentCondition?: string;
  currentSearch?: string;
}

export default function ItemsFilter({
  categories,
  conditions,
  currentCategory,
  currentCondition,
  currentSearch,
}: ItemsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch || "");
  const { t } = useLanguage();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/items?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters("search", search);
  };

  const getCategoryLabel = (cat: string) => {
    return (t.items.categoryOptions as Record<string, string>)[cat] || cat;
  };

  const getConditionLabel = (cond: string) => {
    return (t.items.conditionOptions as Record<string, string>)[cond] || cond;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.items.searchPlaceholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            {t.items.searchButton}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.items.category}
          </label>
          <select
            value={currentCategory || ""}
            onChange={(e) => updateFilters("category", e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{t.items.all}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {getCategoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.items.status}
          </label>
          <select
            value={currentCondition || ""}
            onChange={(e) => updateFilters("condition", e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{t.items.all}</option>
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {getConditionLabel(cond)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

