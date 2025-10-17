"use client"

import type { Language } from "@/lib/i18n"

interface RecentActivityProps {
  language: Language
}

export function RecentActivity({ language }: RecentActivityProps) {
  const activities = [
    {
      type: "call",
      description: "New call from patient",
      time: "2 min ago",
      icon: "📞",
    },
    {
      type: "referral",
      description: "Referral to PHC",
      time: "15 min ago",
      icon: "📍",
    },
    {
      type: "patient",
      description: "New patient registered",
      time: "1 hour ago",
      icon: "👤",
    },
    {
      type: "call",
      description: "Follow-up call completed",
      time: "2 hours ago",
      icon: "✓",
    },
    {
      type: "alert",
      description: "High-risk patient alert",
      time: "3 hours ago",
      icon: "⚠️",
    },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
            <span className="text-xl">{activity.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
