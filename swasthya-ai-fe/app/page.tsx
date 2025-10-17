"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LanguageSelector } from "@/components/language-selector"
import { ThreeJsHero } from "@/components/three-js-hero"
import { ThreeJsVillage } from "@/components/three-js-village"
import { DemoModal } from "@/components/demo-modal"
import { type Language, getTranslation } from "@/lib/i18n"

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en")
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("user", JSON.stringify({ email, isAuthenticated: true }))
    router.push("/dashboard")
  }

  const features = [
    {
      title: getTranslation(language, "feature1Title"),
      desc: getTranslation(language, "feature1Desc"),
      icon: "📱",
    },
    {
      title: getTranslation(language, "feature2Title"),
      desc: getTranslation(language, "feature2Desc"),
      icon: "🌍",
    },
    {
      title: getTranslation(language, "feature3Title"),
      desc: getTranslation(language, "feature3Desc"),
      icon: "🏥",
    },
    {
      title: getTranslation(language, "feature4Title"),
      desc: getTranslation(language, "feature4Desc"),
      icon: "👨‍⚕️",
    },
    {
      title: getTranslation(language, "feature5Title"),
      desc: getTranslation(language, "feature5Desc"),
      icon: "📍",
    },
    {
      title: getTranslation(language, "feature6Title"),
      desc: getTranslation(language, "feature6Desc"),
      icon: "📞",
    },
    {
      title: getTranslation(language, "feature7Title"),
      desc: getTranslation(language, "feature7Desc"),
      icon: "💰",
    },
    {
      title: getTranslation(language, "feature8Title"),
      desc: getTranslation(language, "feature8Desc"),
      icon: "🔒",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg hover:shadow-xl transition-shadow">
              S
            </div>
            <div>
              <span className="font-bold text-2xl text-gradient">SwasthyaAI</span>
              <p className="text-xs text-muted-foreground font-medium">Rural Health Voice</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold hover:text-primary transition-colors duration-300">
              {getTranslation(language, "features")}
            </a>
            <a href="#demo" className="text-sm font-semibold hover:text-primary transition-colors duration-300">
              {getTranslation(language, "demo")}
            </a>
          </nav>

          <div className="flex items-center gap-4 animate-slide-in-right">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            <button
              onClick={() => setIsLoginOpen(true)}
              className="btn-premium bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
            >
              {getTranslation(language, "login")}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with 3D */}
      <section className="hero-gradient py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance leading-tight text-foreground">
                  {getTranslation(language, "heroTitle")}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed font-medium">
                  {getTranslation(language, "heroSubtitle")}
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-2 border-primary/20 rounded-3xl p-8 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <p className="font-bold text-lg text-primary">{getTranslation(language, "tollFree")}</p>
                <p className="text-4xl font-bold text-foreground mt-3 tracking-tight">1800 9405 9405</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:18009405905"
                  className="btn-premium bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg text-center"
                >
                  {getTranslation(language, "callNow")}
                </a>
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="btn-premium border-2 border-primary text-primary hover:bg-primary/5 font-bold"
                >
                  {getTranslation(language, "watchDemo")}
                </button>
              </div>
            </div>

            <div className="flex justify-center animate-slide-in-right">
              <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <ThreeJsHero />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Features Section */}
      <section id="features" className="section-gradient py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              {getTranslation(language, "bestFeatures")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              {getTranslation(language, "demoDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card group" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Features Section */}
      <section className="section-gradient-alt py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-foreground">
            {getTranslation(language, "allFeatures")}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: getTranslation(language, "feature1Title"),
                desc: "Call from any basic phone, no internet required. Accessible to 900+ million rural Indians.",
              },
              {
                title: getTranslation(language, "feature2Title"),
                desc: "Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, Gujarati and more with automatic detection.",
              },
              {
                title: getTranslation(language, "feature3Title"),
                desc: "Low, Medium, or High urgency classification using AI clinical protocols and WHO guidelines.",
              },
              {
                title: getTranslation(language, "feature4Title"),
                desc: "Connect with verified RMP doctors instantly for high-risk cases and emergencies.",
              },
              {
                title: getTranslation(language, "feature5Title"),
                desc: "Find nearby PHCs, hospitals, and pharmacies with real-time availability information.",
              },
              {
                title: getTranslation(language, "feature6Title"),
                desc: "Automated follow-up calls to ensure patients follow treatment plans and medication.",
              },
              {
                title: getTranslation(language, "feature7Title"),
                desc: "Completely free for rural areas, funded by government health initiatives.",
              },
              {
                title: getTranslation(language, "feature8Title"),
                desc: "HIPAA compliant, encrypted data protection, and full compliance with IT Act 2000.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-hover space-y-4 p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-border/50 hover:bg-white/80"
              >
                <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Village 3D Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Serving Rural India</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            SwasthyaAI brings healthcare to every village
          </p>
        </div>
        <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl border border-border/50">
          <ThreeJsVillage />
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="section-gradient py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">{getTranslation(language, "tryDemo")}</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
            {getTranslation(language, "demoDescription")}
          </p>
          <button
            onClick={() => setIsDemoOpen(true)}
            className="btn-premium bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg text-lg"
          >
            {getTranslation(language, "watchDemo")}
          </button>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">SwasthyaAI</h3>
              <p className="text-sm opacity-80 font-medium">Smart Voice Health Assistant for Rural India</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{getTranslation(language, "about")}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    Team
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{getTranslation(language, "contact")}</h4>
              <p className="text-sm opacity-80 font-semibold">1800 9405 9405</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    {getTranslation(language, "privacy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition-opacity">
                    {getTranslation(language, "terms")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2025 SwasthyaAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} language={language} />

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-border/50">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">{getTranslation(language, "login")}</h2>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-3 text-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-3 text-foreground">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-premium bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                {getTranslation(language, "login")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
