"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { type Language, getTranslation } from "@/lib/i18n"

interface CallsChartProps {
  language: Language
}

export function CallsChart({ language }: CallsChartProps) {
  const data = [
    { day: "Mon", calls: 420, successful: 380 },
    { day: "Tue", calls: 520, successful: 490 },
    { day: "Wed", calls: 480, successful: 450 },
    { day: "Thu", calls: 610, successful: 580 },
    { day: "Fri", calls: 750, successful: 710 },
    { day: "Sat", calls: 890, successful: 840 },
    { day: "Sun", calls: 720, successful: 680 },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">
        {getTranslation(language, "calls")} - {getTranslation(language, "analytics")}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="day" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="calls" fill="var(--primary)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="successful" fill="var(--accent)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
