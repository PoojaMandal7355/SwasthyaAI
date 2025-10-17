"use client"

import { type Language, getTranslation } from "@/lib/i18n"

interface AnalyticsMetricsProps {
  language: Language
  dateRange: string
  region: string
}

export function AnalyticsMetrics({ language, dateRange, region }: AnalyticsMetricsProps) {
  const metrics = [
    {
      label: getTranslation(language, "totalCalls"),
      value: "45,230",
      change: "+18.5%",
      icon: "📞",
      trend: "up",
    },
    {
      label: getTranslation(language, "activePatients"),
      value: "12,847",
      change: "+12.3%",
      icon: "👥",
      trend: "up",
    },
    {
      label: getTranslation(language, "successRate"),
      value: "96.8%",
      change: "+3.2%",
      icon: "✓",
      trend: "up",
    },
    {
      label: getTranslation(language, "avgResponseTime"),
      value: "1.8s",
      change: "-0.8s",
      icon: "⏱️",
      trend: "down",
    },
    {
      label: language === "en" ? "Avg Call Duration" : language === "hi" ? "औसत कॉल अवधि" : "சராசரி அழைப்பு கால அளவு",
      value: "4m 32s",
      change: "+45s",
      icon: "⏳",
      trend: "up",
    },
    {
      label: language === "en" ? "Patient Satisfaction" : language === "hi" ? "रोगी संतुष्टि" : "நோயாளி திருப்தி",
      value: "4.7/5",
      change: "+0.3",
      icon: "⭐",
      trend: "up",
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
            </div>
            <span className="text-2xl">{metric.icon}</span>
          </div>
          <p className={`text-xs ${metric.trend === "up" ? "text-accent" : "text-primary"}`}>{metric.change}</p>
        </div>
      ))}
    </div>
  )
}
