"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function NoItemsMessage() {
  const { t } = useLanguage();

  return (
    <div className="text-center py-16 bg-beige-light mt-8">
      <p className="text-black text-lg">{t.items.noItemsFound}</p>
    </div>
  );
}

