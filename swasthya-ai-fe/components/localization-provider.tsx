"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

interface LocalizationContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined)

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get language from localStorage or browser preference
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      const browserLang = navigator.language.split("-")[0]
      const supportedLangs = ["en", "hi", "ta", "te", "kn", "mr", "bn"]
      if (supportedLangs.includes(browserLang)) {
        setLanguage(browserLang as Language)
      }
    }
    setMounted(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LocalizationContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LocalizationContext.Provider>
  )
}

export function useLocalization() {
  const context = useContext(LocalizationContext)
  if (!context) {
    throw new Error("useLocalization must be used within LocalizationProvider")
  }
  return context
}
