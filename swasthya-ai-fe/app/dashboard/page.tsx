"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LanguageSelector } from "@/components/language-selector"
import { DashboardStats } from "@/components/dashboard-stats"
import { CallsChart } from "@/components/calls-chart"
import { PatientsChart } from "@/components/patients-chart"
import { ReferralsChart } from "@/components/referrals-chart"
import { RecentActivity } from "@/components/recent-activity"
import { ThreeJsDashboard } from "@/components/three-js-dashboard"
import { type Language, getTranslation } from "@/lib/i18n"

export default function DashboardPage() {
  const [language, setLanguage] = useState<Language>("en")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
            <a href="#" className="text-sm hover:text-primary transition-colors">
              {getTranslation(language, "dashboard")}
            </a>
            <a href="/analytics" className="text-sm hover:text-primary transition-colors">
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
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getTranslation(language, "dashboard")}</h1>
          <p className="text-muted-foreground">{getTranslation(language, "analytics")}</p>
        </div>

        {/* Stats Grid */}
        <DashboardStats language={language} />

        {/* 3D Visualization */}
        <div className="mb-6 bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">
            {language === "en" ? "System Overview" : language === "hi" ? "सिस्टम अवलोकन" : "கணினி மேலோட்டம்"}
          </h3>
          <ThreeJsDashboard />
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <CallsChart language={language} />
          <PatientsChart language={language} />
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ReferralsChart language={language} />
          </div>
          <RecentActivity language={language} />
        </div>
      </main>
    </div>
  )
}
