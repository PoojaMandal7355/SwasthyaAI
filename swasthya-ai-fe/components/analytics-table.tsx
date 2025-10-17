"use client"

import type { Language } from "@/lib/i18n"

interface AnalyticsTableProps {
  language: Language
  dateRange: string
  region: string
}

export function AnalyticsTable({ language, dateRange, region }: AnalyticsTableProps) {
  const tableData = [
    {
      id: "P001",
      name: "Rajesh Kumar",
      region: "North India",
      calls: 5,
      lastCall: "2 hours ago",
      status: "Active",
      riskLevel: "Low",
    },
    {
      id: "P002",
      name: "Priya Singh",
      region: "South India",
      calls: 3,
      lastCall: "1 day ago",
      status: "Active",
      riskLevel: "Medium",
    },
    {
      id: "P003",
      name: "Amit Patel",
      region: "West India",
      calls: 8,
      lastCall: "30 min ago",
      status: "Active",
      riskLevel: "High",
    },
    {
      id: "P004",
      name: "Deepa Sharma",
      region: "East India",
      calls: 2,
      lastCall: "3 days ago",
      status: "Inactive",
      riskLevel: "Low",
    },
    {
      id: "P005",
      name: "Vikram Reddy",
      region: "South India",
      calls: 6,
      lastCall: "4 hours ago",
      status: "Active",
      riskLevel: "Medium",
    },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "High":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">
        {language === "en" ? "Patient Activity" : language === "hi" ? "रोगी गतिविधि" : "நோயாளி செயல்பாடு"}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold">
                {language === "en" ? "Patient ID" : language === "hi" ? "रोगी ID" : "நோயாளி ID"}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {language === "en" ? "Name" : language === "hi" ? "नाम" : "பெயர்"}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {language === "en" ? "Region" : language === "hi" ? "क्षेत्र" : "பகுதி"}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {language === "en" ? "Calls" : language === "hi" ? "कॉल" : "அழைப்புகள்"}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {language === "en" ? "Last Call" : language === "hi" ? "अंतिम कॉल" : "கடைசி அழைப்பு"}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {language === "en" ? "Status" : language === "hi" ? "स्थिति" : "நிலை"}
              </th>
              <th className="text-left py-3 px-4 font-semibold">
                {language === "en" ? "Risk Level" : language === "hi" ? "जोखिम स्तर" : "ஆபத்து நிலை"}
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">{row.id}</td>
                <td className="py-3 px-4">{row.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{row.region}</td>
                <td className="py-3 px-4">{row.calls}</td>
                <td className="py-3 px-4 text-muted-foreground">{row.lastCall}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      row.status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(row.riskLevel)}`}>
                    {row.riskLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
