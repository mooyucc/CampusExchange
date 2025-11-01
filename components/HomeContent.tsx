"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import ItemCard from "@/components/ItemCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";

interface Item {
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
}

interface HomeContentProps {
  items: Item[];
}

export default function HomeContent({ items }: HomeContentProps) {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // 点击外部区域关闭筛选菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // 获取所有唯一的分类和 condition
  const categories = Array.from(new Set(items.map(item => item.category)));
  const conditions = Array.from(new Set(items.map(item => item.condition)));

  // 筛选物品
  const filteredItems = items.filter(item => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedCondition && item.condition !== selectedCondition) return false;
    return true;
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setIsFilterOpen(false);
  };

  const handleConditionClick = (condition: string) => {
    setSelectedCondition(selectedCondition === condition ? null : condition);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedCondition(null);
    setIsFilterOpen(false);
  };

  const getCategoryLabel = (cat: string) => {
    return (t.items.categoryOptions as Record<string, string>)[cat] || cat;
  };

  const getConditionLabel = (cond: string) => {
    return (t.items.conditionOptions as Record<string, string>)[cond] || cond;
  };

  return (
    <>
      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* 面包屑导航 */}
        <div className="mb-6">
          <nav className="text-sm text-black">
            <span>{t.home.home}</span>
            <span className="mx-2">/</span>
            <span>{t.home.latestItems}</span>
          </nav>
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-serif font-normal text-black mb-6 tracking-tight">
            {t.home.welcome}
          </h1>
          <p className="text-lg text-black/70 font-sans">{t.home.subtitle}</p>
        </div>

        {/* 筛选和排序栏 */}
        <div className="mb-8 flex justify-between items-center border-b border-gray-200 pb-4">
          <div className="flex items-center gap-6 relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-sm font-medium text-black hover:text-primary-600 transition flex items-center gap-2 cursor-pointer"
            >
              <span>{t.home.sortAndFilter}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* 筛选下拉菜单 */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-50 min-w-[300px]">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-black mb-3">{t.home.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`px-3 py-1.5 text-xs rounded transition ${
                          selectedCategory === category
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                      >
                        {getCategoryLabel(category)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-black mb-3">{t.home.condition}</h3>
                  <div className="flex flex-wrap gap-2">
                    {conditions.map((condition) => (
                      <button
                        key={condition}
                        onClick={() => handleConditionClick(condition)}
                        className={`px-3 py-1.5 text-xs rounded transition ${
                          selectedCondition === condition
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                      >
                        {getConditionLabel(condition)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {(selectedCategory || selectedCondition) && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {t.home.clearFilter}
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="text-sm text-black">
            {filteredItems.length} {t.home.results}
          </div>
        </div>

        {/* 物品网格 */}
        <div className="mb-16">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="text-center py-16 bg-beige-light">
              <p className="text-black text-lg mb-6">{t.home.noMatchingItems}</p>
              <button
                onClick={clearFilters}
                className="inline-block px-8 py-3 bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
              >
                {t.home.clearFilter}
              </button>
            </div>
          ) : (
            <div className="text-center py-16 bg-beige-light">
              <p className="text-black text-lg mb-6">{t.home.noItems}</p>
              {session && (
                <Link
                  href="/items/new"
                  className="inline-block px-8 py-3 bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition"
                >
                  {t.home.beFirst}
                </Link>
              )}
            </div>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white mt-24 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black/60 text-sm">
          <p>{t.footer.copyright}</p>
        </div>
      </footer>
    </>
  );
}

