"use client"

import type { Language } from "@/lib/i18n"

interface AnalyticsFiltersProps {
  language: Language
  dateRange: string
  onDateRangeChange: (range: string) => void
  region: string
  onRegionChange: (region: string) => void
}

export function AnalyticsFilters({
  language,
  dateRange,
  onDateRangeChange,
  region,
  onRegionChange,
}: AnalyticsFiltersProps) {
  const dateRanges = [
    { value: "7d", label: language === "en" ? "Last 7 Days" : language === "hi" ? "पिछले 7 दिन" : "கடந்த 7 நாட்கள்" },
    { value: "30d", label: language === "en" ? "Last 30 Days" : language === "hi" ? "पिछले 30 दिन" : "கடந்த 30 நாட்கள்" },
    { value: "90d", label: language === "en" ? "Last 90 Days" : language === "hi" ? "पिछले 90 दिन" : "கடந்த 90 நாட்கள்" },
    { value: "1y", label: language === "en" ? "Last Year" : language === "hi" ? "पिछला साल" : "கடந்த வருடம்" },
  ]

  const regions = [
    { value: "all", label: language === "en" ? "All Regions" : language === "hi" ? "सभी क्षेत्र" : "அனைத்து பகுதிகள்" },
    { value: "north", label: language === "en" ? "North India" : language === "hi" ? "उत्तर भारत" : "வட இந்தியா" },
    { value: "south", label: language === "en" ? "South India" : language === "hi" ? "दक्षिण भारत" : "தென் இந்தியா" },
    { value: "east", label: language === "en" ? "East India" : language === "hi" ? "पूर्व भारत" : "கிழக்கு இந்தியா" },
    { value: "west", label: language === "en" ? "West India" : language === "hi" ? "पश्चिम भारत" : "மேற்கு இந்தியா" },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            {language === "en" ? "Date Range" : language === "hi" ? "तारीख की सीमा" : "தேதி வரம்பு"}
          </label>
          <div className="flex flex-wrap gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => onDateRangeChange(range.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === range.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            {language === "en" ? "Region" : language === "hi" ? "क्षेत्र" : "பகுதி"}
          </label>
          <select
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {regions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
