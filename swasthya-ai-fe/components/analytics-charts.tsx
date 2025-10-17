"use client"

import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Language } from "@/lib/i18n"

interface AnalyticsChartsProps {
  language: Language
  dateRange: string
  region: string
}

export function AnalyticsCharts({ language, dateRange, region }: AnalyticsChartsProps) {
  const callTrendData = [
    { date: "Mon", calls: 1200, successful: 1100 },
    { date: "Tue", calls: 1400, successful: 1320 },
    { date: "Wed", calls: 1300, successful: 1250 },
    { date: "Thu", calls: 1600, successful: 1550 },
    { date: "Fri", calls: 1900, successful: 1850 },
    { date: "Sat", calls: 2100, successful: 2050 },
    { date: "Sun", calls: 1800, successful: 1750 },
  ]

  const riskDistributionData = [
    { category: "Low Risk", count: 8500, percentage: 66 },
    { category: "Medium Risk", count: 3200, percentage: 25 },
    { category: "High Risk", count: 1147, percentage: 9 },
  ]

  const languageDistributionData = [
    { language: "Hindi", calls: 15000, percentage: 33 },
    { language: "Tamil", calls: 12000, percentage: 27 },
    { language: "Telugu", calls: 10000, percentage: 22 },
    { language: "Kannada", calls: 8230, percentage: 18 },
  ]

  return (
    <div className="space-y-6 mb-6">
      {/* Call Trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">
          {language === "en" ? "Call Trends" : language === "hi" ? "कॉल ट्रेंड" : "அழைப்பு போக்குகள்"}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={callTrendData}>
            <defs>
              <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Area type="monotone" dataKey="calls" stroke="var(--primary)" fillOpacity={1} fill="url(#colorCalls)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">
            {language === "en" ? "Risk Distribution" : language === "hi" ? "जोखिम वितरण" : "ஆபத்து விநியோகம்"}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="category" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="var(--accent)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Language Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">
            {language === "en" ? "Language Distribution" : language === "hi" ? "भाषा वितरण" : "மொழி விநியோகம்"}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={languageDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="language" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="calls" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
