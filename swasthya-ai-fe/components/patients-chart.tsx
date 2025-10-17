"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { type Language, getTranslation } from "@/lib/i18n"

interface PatientsChartProps {
  language: Language
}

export function PatientsChart({ language }: PatientsChartProps) {
  const data = [
    { week: "Week 1", patients: 240, newPatients: 80 },
    { week: "Week 2", patients: 380, newPatients: 140 },
    { week: "Week 3", patients: 520, newPatients: 140 },
    { week: "Week 4", patients: 780, newPatients: 260 },
    { week: "Week 5", patients: 1020, newPatients: 240 },
    { week: "Week 6", patients: 1280, newPatients: 260 },
    { week: "Week 7", patients: 1520, newPatients: 240 },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">
        {getTranslation(language, "patients")} - {getTranslation(language, "analytics")}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="week" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="patients"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ fill: "var(--primary)" }}
          />
          <Line
            type="monotone"
            dataKey="newPatients"
            stroke="var(--accent)"
            strokeWidth={2}
            dot={{ fill: "var(--accent)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
