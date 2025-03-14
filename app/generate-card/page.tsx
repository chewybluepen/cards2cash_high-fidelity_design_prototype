"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, CreditCard, Info } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
// Import the CelebrationAnimation component
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

export default function GenerateCard() {
  const [cardType, setCardType] = useState("visa")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [generatedCard, setGeneratedCard] = useState<null | {
    number: string
    expiry: string
    cvv: string
  }>(null)
  // Add state for celebration
  const [showCelebration, setShowCelebration] = useState(false)

  // Update the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate card generation
    setTimeout(() => {
      setIsLoading(false)

      if (Number.parseFloat(amount) > 0) {
        setStatus("success")
        setGeneratedCard({
          number: "4*** **** **** 1234",
          expiry: "03/26",
          cvv: "***",
        })
        setShowCelebration(true) // Show celebration on success
      } else {
        setStatus("error")
      }
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Card Generated Successfully!"
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
          <h1 className="text-lg font-semibold">Generate Virtual Card</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single-Use Card</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Card</TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <Card>
              <CardHeader>
                <CardTitle>Generate Single-Use Card</CardTitle>
                <CardDescription>Create a virtual card for one-time use</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Card Type</Label>
                    <RadioGroup value={cardType} onValueChange={setCardType} className="grid grid-cols-3 gap-2">
                      <div>
                        <RadioGroupItem value="visa" id="visa" className="peer sr-only" />
                        <Label
                          htmlFor="visa"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-2 h-6 w-6 text-blue-600" />
                          <span className="text-sm font-medium">Visa</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="mastercard" id="mastercard" className="peer sr-only" />
                        <Label
                          htmlFor="mastercard"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-2 h-6 w-6 text-red-600" />
                          <span className="text-sm font-medium">Mastercard</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="amex" id="amex" className="peer sr-only" />
                        <Label
                          htmlFor="amex"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-2 h-6 w-6 text-purple-600" />
                          <span className="text-sm font-medium">Amex</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (GYD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">Minimum amount: GYD 1,000</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose (Optional)</Label>
                    <Select>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shopping">Online Shopping</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {status === "success" && generatedCard && (
                    <div className="space-y-4">
                      <Alert className="bg-green-50 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Card Generated Successfully!</AlertTitle>
                        <AlertDescription>Your virtual card has been created and is ready to use.</AlertDescription>
                      </Alert>

                      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <CardContent className="p-4">
                          <div className="mb-4 flex justify-between">
                            <CreditCard className="h-8 w-8" />
                            <span className="font-bold uppercase">{cardType}</span>
                          </div>
                          <div className="mb-4 space-y-1">
                            <p className="text-xs text-blue-100">Card Number</p>
                            <p className="font-mono text-lg font-medium">{generatedCard.number}</p>
                          </div>
                          <div className="flex justify-between">
                            <div className="space-y-1">
                              <p className="text-xs text-blue-100">Expiry Date</p>
                              <p className="font-medium">{generatedCard.expiry}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-blue-100">CVV</p>
                              <p className="font-medium">{generatedCard.cvv}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {status === "error" && (
                    <Alert variant="destructive">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Unable to generate card. Please check your balance and try again.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Generating Card..." : "Generate Card"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="recurring">
            <Card>
              <CardHeader>
                <CardTitle>Generate Recurring Card</CardTitle>
                <CardDescription>Create a virtual card for recurring payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Card Type</Label>
                  <RadioGroup defaultValue="visa" className="grid grid-cols-3 gap-2">
                    <div>
                      <RadioGroupItem value="visa" id="visa-recurring" className="peer sr-only" />
                      <Label
                        htmlFor="visa-recurring"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-blue-600" />
                        <span className="text-sm font-medium">Visa</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="mastercard" id="mastercard-recurring" className="peer sr-only" />
                      <Label
                        htmlFor="mastercard-recurring"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-red-600" />
                        <span className="text-sm font-medium">Mastercard</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="amex" id="amex-recurring" className="peer sr-only" />
                      <Label
                        htmlFor="amex-recurring"
                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-2 h-6 w-6 text-purple-600" />
                        <span className="text-sm font-medium">Amex</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-amount">Monthly Amount (GYD)</Label>
                  <Input id="monthly-amount" type="number" placeholder="Enter amount" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subscription-name">Subscription Name</Label>
                  <Input id="subscription-name" placeholder="e.g., Netflix, Spotify" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-cycle">Billing Cycle</Label>
                  <Select>
                    <SelectTrigger id="billing-cycle">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary-600 text-white">Generate Recurring Card</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}

