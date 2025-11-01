"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LoadingSpinner() {
  const { t } = useLanguage();

  return <div>{t.items.loading}</div>;
}

