"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LanguageSelector } from "@/components/language-selector"
import { AnalyticsHeader } from "@/components/analytics-header"
import { AnalyticsFilters } from "@/components/analytics-filters"
import { AnalyticsMetrics } from "@/components/analytics-metrics"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { AnalyticsTable } from "@/components/analytics-table"
import { ThreeJsAnalytics } from "@/components/three-js-analytics"
import { type Language, getTranslation } from "@/lib/i18n"

export default function AnalyticsPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dateRange, setDateRange] = useState("7d")
  const [region, setRegion] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
            <span className="font-bold text-lg">SwasthyaAI</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="text-sm hover:text-primary transition-colors">
              {getTranslation(language, "dashboard")}
            </a>
            <a href="/analytics" className="text-sm text-primary font-medium">
              {getTranslation(language, "analytics")}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm font-medium"
            >
              {getTranslation(language, "logout") || "Logout"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <AnalyticsHeader language={language} />

        {/* Filters */}
        <AnalyticsFilters
          language={language}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          region={region}
          onRegionChange={setRegion}
        />

        {/* 3D Network Visualization */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">
            {language === "en" ? "Data Network" : language === "hi" ? "डेटा नेटवर्क" : "தரவு நெட்வொர்க்"}
          </h3>
          <ThreeJsAnalytics />
        </div>

        {/* Key Metrics */}
        <AnalyticsMetrics language={language} dateRange={dateRange} region={region} />

        {/* Charts */}
        <AnalyticsCharts language={language} dateRange={dateRange} region={region} />

        {/* Detailed Table */}
        <AnalyticsTable language={language} dateRange={dateRange} region={region} />
      </main>
    </div>
  )
}
