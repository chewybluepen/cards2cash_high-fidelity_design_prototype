"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ChevronRight, Paperclip, Send } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mock chat data
const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "👋 Hi there! I'm your Cards2Cash AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
]

// Mock suggested questions
const suggestedQuestions = [
  "How do I add funds?",
  "How to generate a virtual card?",
  "What are the fees for currency conversion?",
  "How do I refer a friend?",
]

export default function ChatAssistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let botResponse

      // Simple pattern matching for demo purposes
      if (inputValue.toLowerCase().includes("add fund") || inputValue.toLowerCase().includes("prepaid")) {
        botResponse =
          "To add funds, go to the 'Add Funds' section from your dashboard. You can enter your prepaid voucher code from carriers like Digicel or GTT. The funds will be converted to your digital balance instantly!"
      } else if (
        inputValue.toLowerCase().includes("virtual card") ||
        inputValue.toLowerCase().includes("generate card")
      ) {
        botResponse =
          "You can generate a virtual card by tapping on 'Generate Card' from your dashboard. Choose between a single-use or recurring card, select your preferred card type (Visa, Mastercard, or Amex), and enter the amount. Your card details will be generated instantly!"
      } else if (
        inputValue.toLowerCase().includes("fee") ||
        inputValue.toLowerCase().includes("conversion") ||
        inputValue.toLowerCase().includes("exchange")
      ) {
        botResponse =
          "For currency conversions, we charge a small fee of 1.5% of the transaction amount. We use real-time exchange rates from CurrencyAPI to ensure you get the best rates available."
      } else if (inputValue.toLowerCase().includes("refer") || inputValue.toLowerCase().includes("friend")) {
        botResponse =
          "You can refer friends by sharing your unique referral code found in the 'Partner Offers' section. When your friend signs up using your code and makes their first transaction, you'll both receive GYD 1,000 in your accounts!"
      } else {
        botResponse =
          "I understand you're asking about " +
          inputValue +
          ". Could you provide more details so I can assist you better? You can also check our Help section for more information."
      }

      const botMessageObj = {
        id: messages.length + 2,
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessageObj])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="flex items-center">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-sm font-semibold">AI Assistant</h1>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="mb-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-white shadow"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`mt-1 text-right text-xs ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-white p-3 shadow">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="mb-4">
            <h2 className="mb-2 text-sm font-medium text-gray-700">Suggested Questions</h2>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-between bg-white text-left"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <span>{question}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="sticky bottom-20 bg-gray-50 pt-2">
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Attach</span>
            </Button>
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0 bg-blue-600 hover:bg-blue-700"
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </main>

      <BottomNavigation />
    </div>
  )
}

