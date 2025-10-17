"use client"

import { type Language, getTranslation } from "@/lib/i18n"

interface DashboardStatsProps {
  language: Language
}

export function DashboardStats({ language }: DashboardStatsProps) {
  const stats = [
    {
      label: getTranslation(language, "totalCalls"),
      value: "12,458",
      change: "+12.5%",
      icon: "📞",
    },
    {
      label: getTranslation(language, "activePatients"),
      value: "3,847",
      change: "+8.2%",
      icon: "👥",
    },
    {
      label: getTranslation(language, "successRate"),
      value: "94.2%",
      change: "+2.1%",
      icon: "✓",
    },
    {
      label: getTranslation(language, "avgResponseTime"),
      value: "2.3s",
      change: "-0.5s",
      icon: "⏱️",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <p className="text-xs text-accent">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
