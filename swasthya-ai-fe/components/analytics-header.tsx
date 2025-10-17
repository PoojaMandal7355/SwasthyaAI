"use client"

import { type Language, getTranslation } from "@/lib/i18n"

interface AnalyticsHeaderProps {
  language: Language
}

export function AnalyticsHeader({ language }: AnalyticsHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2">{getTranslation(language, "analytics")}</h1>
      <p className="text-muted-foreground text-lg">
        {language === "en"
          ? "Comprehensive insights into SwasthyaAI performance and patient outcomes"
          : language === "hi"
            ? "SwasthyaAI के प्रदर्शन और रोगी परिणामों में व्यापक अंतर्दृष्टि"
            : "SwasthyaAI செயல்திறன் மற்றும் நோயாளி ফলাফলங்களில் விரிவான நுண்ணறிவு"}
      </p>
    </div>
  )
}
