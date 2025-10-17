"use client"

import { useState } from "react"
import { type Language, getTranslation } from "@/lib/i18n"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  language: Language
}

export function DemoModal({ isOpen, onClose, language }: DemoModalProps) {
  const [step, setStep] = useState(0)
  const [userInput, setUserInput] = useState("")

  const demoSteps = [
    {
      en: "Welcome to SwasthyaAI. Please describe your symptoms.",
      hi: "SwasthyaAI में आपका स्वागत है। कृपया अपने लक्षणों का वर्णन करें।",
      ta: "SwasthyaAI-க்கு வரவேற்கிறோம். உங்கள் அறிகுறிகளை விவரிக்கவும்.",
    },
    {
      en: "How long have you had these symptoms?",
      hi: "आपको ये लक्षण कितने समय से हैं?",
      ta: "இந்த அறிகுறிகள் எவ்வளவு காலம் உள்ளன?",
    },
    {
      en: "Based on your symptoms, I recommend visiting the nearest PHC. Your risk level is LOW.",
      hi: "आपके लक्षणों के आधार पर, मैं निकटतम PHC जाने की सलाह देता हूं। आपका जोखिम स्तर कम है।",
      ta: "உங்கள் அறிகுறிகளின் அடிப்படையில், நான் அருகிலுள்ள PHC-க்குச் செல்ல பரிந்துரைக்கிறேன். உங்கள் ஆபத்து நிலை குறைவு.",
    },
  ]

  if (!isOpen) return null

  const currentStep = demoSteps[step]
  const message = currentStep[language] || currentStep.en

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{getTranslation(language, "tryDemo")}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            ✕
          </button>
        </div>

        <div className="bg-muted p-4 rounded-lg mb-4 min-h-20">
          <p className="text-sm">{message}</p>
        </div>

        {step < demoSteps.length - 1 && (
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={getTranslation(language, "tryDemo")}
            className="w-full px-3 py-2 border border-border rounded-lg mb-4"
          />
        )}

        <div className="flex gap-2">
          {step > 0 && (
            <button
              onClick={() => {
                setStep(step - 1)
                setUserInput("")
              }}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"
            >
              {getTranslation(language, "back") || "Back"}
            </button>
          )}
          <button
            onClick={() => {
              if (step < demoSteps.length - 1) {
                setStep(step + 1)
                setUserInput("")
              } else {
                onClose()
              }
            }}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            {step < demoSteps.length - 1 ? getTranslation(language, "next") || "Next" : "Close"}
          </button>
        </div>
      </div>
    </div>
  )
}
