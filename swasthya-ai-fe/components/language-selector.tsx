"use client"

import { useState } from "react"
import { type Language, SUPPORTED_LANGUAGES } from "@/lib/i18n"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLanguage)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium flex items-center gap-2"
      >
        <span>{currentLang?.nativeName}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code as Language)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors text-sm ${
                currentLanguage === lang.code ? "bg-primary/10 text-primary font-medium" : ""
              }`}
            >
              <div className="font-medium">{lang.nativeName}</div>
              <div className="text-xs text-muted-foreground">{lang.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
