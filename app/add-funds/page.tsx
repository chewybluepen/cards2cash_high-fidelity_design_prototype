"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, History, Info, Wifi, WifiOff, Calculator } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import Image from "next/image"
// Import the CelebrationAnimation component
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

export default function AddFunds() {
  const [carrier, setCarrier] = useState("digicel")
  const [voucherCode, setVoucherCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [isOffline, setIsOffline] = useState(false)
  // Add state for celebration
  const [showCelebration, setShowCelebration] = useState(false)

  // Update the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false)
      if (voucherCode.length >= 10) {
        setStatus("success")
        setShowCelebration(true) // Show celebration on success
      } else {
        setStatus("error")
      }
    }, 1500)
  }

  const toggleOfflineMode = () => {
    setIsOffline(!isOffline)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Funds Added Successfully!"
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
          <h1 className="text-lg font-semibold">Add Prepaid Credit</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Load Prepaid Credit</CardTitle>
            <CardDescription>Convert your prepaid phone credit into digital funds</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {isOffline && (
                <Alert className="bg-amber-50 text-amber-800">
                  <WifiOff className="h-4 w-4" />
                  <AlertTitle>Offline Mode</AlertTitle>
                  <AlertDescription>
                    Your transaction will be queued and processed when you're back online.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>Select Carrier</Label>
                <RadioGroup value={carrier} onValueChange={setCarrier} className="grid grid-cols-2 gap-2">
                  <div>
                    <RadioGroupItem value="digicel" id="digicel" className="peer sr-only" />
                    <Label
                      htmlFor="digicel"
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="text-center">
                        <div className="mx-auto mb-2 h-8 w-8 overflow-hidden">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/digicel-logo-MoHV8q1LLOZPdSRJmIs4Bzevlt2Z2x.png"
                            alt="Digicel"
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="font-medium">Digicel</span>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="gtt" id="gtt" className="peer sr-only" />
                    <Label
                      htmlFor="gtt"
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="text-center">
                        <div className="mx-auto mb-2 h-8 w-8 overflow-hidden">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gtt-logo-IFcxR74KmUyVwRYub9XSe2FQcxy4MC.png"
                            alt="GTT"
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="font-medium">GTT</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="voucher-code">Voucher Code</Label>
                <Input
                  id="voucher-code"
                  placeholder="Enter your voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Enter the code from your prepaid voucher card</p>
              </div>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Your prepaid credit has been successfully added to your account.</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Invalid voucher code. Please check and try again.</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white" disabled={isLoading}>
                {isLoading ? "Processing..." : "Add Credit"}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={toggleOfflineMode}>
                {isOffline ? <Wifi className="mr-2 h-4 w-4" /> : <WifiOff className="mr-2 h-4 w-4" />}
                {isOffline ? "Switch to Online Mode" : "Simulate Offline Mode"}
              </Button>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/add-funds/history">
                    <History className="mr-2 h-4 w-4" />
                    View History
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/add-funds/rates">
                    <Calculator className="mr-2 h-4 w-4" />
                    View Rates
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

