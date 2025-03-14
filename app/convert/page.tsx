"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Clock, History, Info, LineChart, RefreshCw } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Import the CelebrationAnimation component
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

// Mock currency data
const currencies = [
  { code: "GYD", name: "Guyanese Dollar", flag: "🇬🇾" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
]

export default function CurrencyConversion() {
  const [fromCurrency, setFromCurrency] = useState("GYD")
  const [toCurrency, setToCurrency] = useState("USD")
  const [amount, setAmount] = useState("")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)

  // Add state for celebration
  const [showCelebration, setShowCelebration] = useState(false)

  // Mock exchange rate fetch
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      // Simulated exchange rates
      const rates: Record<string, Record<string, number>> = {
        GYD: { USD: 0.0048, EUR: 0.0044, GBP: 0.0038, CAD: 0.0065, GYD: 1 },
        USD: { GYD: 208.65, EUR: 0.92, GBP: 0.79, CAD: 1.36, USD: 1 },
        EUR: { GYD: 226.79, USD: 1.09, GBP: 0.86, CAD: 1.48, EUR: 1 },
        GBP: { GYD: 264.87, USD: 1.27, EUR: 1.17, CAD: 1.73, GBP: 1 },
        CAD: { GYD: 153.1, USD: 0.73, EUR: 0.68, GBP: 0.58, CAD: 1 },
      }

      setExchangeRate(rates[fromCurrency][toCurrency])
    }
  }, [fromCurrency, toCurrency])

  // Update the handleConvert function
  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      if (Number.parseFloat(amount) > 0 && exchangeRate) {
        setConvertedAmount(Number.parseFloat(amount) * exchangeRate)
        setStatus("success")
        setShowCelebration(true) // Show celebration on success
      } else {
        setStatus("error")
      }
    }, 1500)
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setConvertedAmount(null)
    setStatus(null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Currency Converted Successfully!"
        onComplete={() => setShowCelebration(false)}
      />
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Currency Conversion</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Convert Currency</CardTitle>
            <CardDescription>Convert between currencies using real-time exchange rates</CardDescription>
          </CardHeader>
          <form onSubmit={handleConvert}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="from-currency">From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger id="from-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center">
                            <span className="mr-2">{currency.flag}</span>
                            <span>
                              {currency.code} - {currency.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="button" variant="outline" size="icon" className="mt-8" onClick={handleSwapCurrencies}>
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Swap currencies</span>
                </Button>

                <div className="flex-1 space-y-2">
                  <Label htmlFor="to-currency">To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger id="to-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center">
                            <span className="mr-2">{currency.flag}</span>
                            <span>
                              {currency.code} - {currency.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {exchangeRate && (
                <div className="rounded-md bg-blue-50 p-3 text-center text-sm text-blue-800">
                  <p>
                    Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </p>
                  <div className="mt-1 flex items-center justify-center gap-2 text-xs text-blue-600">
                    <Clock className="h-3 w-3" />
                    <span>Rates updated: {new Date().toLocaleString()}</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600" asChild>
                      <Link href="/convert/currency-details">View Details</Link>
                    </Button>
                  </div>
                </div>
              )}

              {status === "success" && convertedAmount !== null && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Conversion Successful!</AlertTitle>
                  <AlertDescription className="font-medium">
                    {Number.parseFloat(amount).toLocaleString()} {fromCurrency} ={" "}
                    {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
                  </AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Unable to convert currency. Please check your input and try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white" disabled={isLoading}>
                {isLoading ? "Converting..." : "Convert"}
              </Button>
              {status === "success" && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 flex flex-col space-y-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/convert/history">
              <History className="mr-2 h-4 w-4" />
              View Conversion History
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/convert/currency-details">
              <LineChart className="mr-2 h-4 w-4" />
              Currency Details & Trends
            </Link>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

