"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { type Language, getTranslation } from "@/lib/i18n"

interface ReferralsChartProps {
  language: Language
}

export function ReferralsChart({ language }: ReferralsChartProps) {
  const data = [
    { name: "PHC", value: 45 },
    { name: "Hospital", value: 30 },
    { name: "Specialist", value: 15 },
    { name: "Pharmacy", value: 10 },
  ]

  const COLORS = ["var(--primary)", "var(--accent)", "var(--secondary)", "var(--chart-4)"]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">
        {getTranslation(language, "referrals")} - {getTranslation(language, "analytics")}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
