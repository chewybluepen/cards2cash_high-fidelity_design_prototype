"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  CreditCard,
  DollarSign,
  MessageSquare,
  Plus,
  RefreshCw,
  Smartphone,
  Tag,
  ChevronRight,
  AlertTriangle,
  Wallet,
  Coins,
  TrendingUp,
  BarChart3,
  Gift,
  BanknoteIcon as Bank,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Logo } from "@/components/logo"
import { FinancialPattern } from "@/components/financial-pattern"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredFade } from "@/components/animations/staggered-fade"
import { PulseAnimation } from "@/components/animations/pulse-animation"
import { EnhancedBottomNavigation } from "@/components/enhanced-bottom-navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

export default function Dashboard() {
  const [balance, setBalance] = useState(25000) // GYD
  const [showSpendingAlert, setShowSpendingAlert] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMessage, setCelebrationMessage] = useState("")

  // Show welcome celebration on first load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome) {
      setTimeout(() => {
        setCelebrationMessage("Welcome back, John!")
        setShowCelebration(true)
        localStorage.setItem("hasSeenWelcome", "true")
      }, 1000)
    }
  }, [])

  // Function to handle successful transactions
  const handleSuccessfulTransaction = (type: string) => {
    let message = ""
    switch (type) {
      case "add":
        message = "Funds added successfully!"
        setBalance((prev) => prev + 5000)
        break
      case "convert":
        message = "Currency converted successfully!"
        break
      case "card":
        message = "Virtual card generated!"
        break
      default:
        message = "Transaction completed!"
    }
    setCelebrationMessage(message)
    setShowCelebration(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <FinancialPattern />

      <CelebrationAnimation
        show={showCelebration}
        message={celebrationMessage}
        onComplete={() => setShowCelebration(false)}
      />

      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Logo size="sm" />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <Button variant="ghost" size="icon" asChild>
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Display%20Picture-lTJxvWvl6No7YQMsgUyVESc1acHx51.png"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <AnimatePresence>
          {showSpendingAlert && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Alert className="bg-accent-50 text-accent-800 border-accent">
                <AlertTriangle className="h-4 w-4 text-accent" />
                <AlertTitle>Spending Alert</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>You're approaching your daily spending limit.</span>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    className="border-accent-300 bg-accent-100 text-accent-800 hover:bg-accent-200"
                    onClick={() => setShowSpendingAlert(false)}
                  >
                    Dismiss
                  </AnimatedButton>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Balance Card with enhanced financial styling */}
          <FadeIn className="mb-6">
            <Card className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-700 text-white border-none shadow-lg">
              <div className="absolute inset-0 opacity-10">
                <FinancialPattern variant="dark" opacity={0.1} />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <CardTitle className="text-lg font-medium">Total Balance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="flex items-baseline"
                >
                  <span className="text-3xl font-bold">
                    GYD {balance.toLocaleString()}
                  </span>
                  <Badge
                    variant="outline"
                    className="ml-2 border-primary-300 text-primary-50"
                  >
                    ≈ USD {(balance / 208).toFixed(2)}
                  </Badge>
                </motion.div>
                <div className="mt-4 flex justify-between">
                  <AnimatedButton
                    variant="secondary"
                    className="flex-1 bg-white/20 text-white hover:bg-white/30"
                    asChild
                    onClick={() => handleSuccessfulTransaction("add")}
                  >
                    <Link href="/add-funds">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Funds
                    </Link>
                  </AnimatedButton>
                  <AnimatedButton
                    variant="secondary"
                    className="mx-2 flex-1 bg-white/20 text-white hover:bg-white/30"
                    asChild
                  >
                    <Link href="/rewards">
                      <Gift className="mr-2 h-4 w-4" />
                      Rewards
                    </Link>
                  </AnimatedButton>
                  <AnimatedButton
                    variant="secondary"
                    className="flex-1 bg-white/20 text-white hover:bg-white/30"
                    asChild
                    onClick={() => handleSuccessfulTransaction("convert")}
                  >
                    <Link href="/convert">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Convert
                    </Link>
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Financial Stats Section */}
          <section className="mb-6">
            <StaggeredFade className="grid grid-cols-3 gap-3">
              <Link href="/monthly-growth">
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 transition-all hover:shadow-md border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <TrendingUp className="mb-2 h-6 w-6 text-green-600" />
                      <p className="text-center text-sm font-medium">
                        Monthly Growth
                      </p>
                      <p className="text-lg font-bold text-green-600">+15%</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
              <Link href="/transactions">
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-gradient-to-br from-primary-50 to-primary-100 transition-all hover:shadow-md border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <BarChart3 className="mb-2 h-6 w-6 text-primary" />
                      <p className="text-center text-sm font-medium">
                        Transactions
                      </p>
                      <p className="text-lg font-bold text-primary">24</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
              <Link href="/savings">
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-gradient-to-br from-accent-50 to-accent-100 transition-all hover:shadow-md border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <Coins className="mb-2 h-6 w-6 text-accent" />
                      <p className="text-center text-sm font-medium">Savings</p>
                      <p className="text-lg font-bold text-accent">$120</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </StaggeredFade>
          </section>

          <FadeIn delay={0.2} className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-neutral-text">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/add-funds">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Card className="h-full transition-all hover:shadow-md border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <Smartphone className="mb-2 h-8 w-8 text-primary" />
                      <p className="text-center text-sm font-medium">
                        Add Prepaid Credit
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
              <Link href="/generate-card" onClick={() => handleSuccessfulTransaction("card")}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Card className="h-full transition-all hover:shadow-md border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <CreditCard className="mb-2 h-8 w-8 text-primary" />
                      <p className="text-center text-sm font-medium">
                        Generate Card
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
              <Link href="/convert">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Card className="h-full transition-all hover:shadow-md border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <DollarSign className="mb-2 h-8 w-8 text-primary" />
                      <p className="text-center text-sm font-medium">
                        Currency Conversion
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
              <Link href="/bank-connection">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Card className="h-full transition-all hover:shadow-md border-none">
                    <CardContent className="flex flex-col items-center justify-center p-4">
                      <Bank className="mb-2 h-8 w-8 text-primary" />
                      <p className="text-center text-sm font-medium">
                        Connect Bank
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.3} className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-text">
                Recent Transactions
              </h2>
              <AnimatedButton
                variant="ghost"
                size="sm"
                asChild
                className="text-primary hover:text-primary-700"
              >
                <Link href="/transactions">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </AnimatedButton>
            </div>
            <Card className="mt-3 border-none shadow-md">
              <CardContent className="p-0">
                <div className="divide-y">
                  <StaggeredFade>
                    {[
                      {
                        icon: <Plus className="h-4 w-4 text-green-600" />,
                        bgColor: "bg-green-100",
                        title: "Added Funds",
                        time: "Today, 10:30 AM",
                        amount: "+GYD 5,000",
                        textColor: "text-green-600",
                      },
                      {
                        icon: <CreditCard className="h-4 w-4 text-red-600" />,
                        bgColor: "bg-red-100",
                        title: "Virtual Card",
                        time: "Yesterday, 3:45 PM",
                        amount: "-GYD 2,500",
                        textColor: "text-red-600",
                      },
                      {
                        icon: <RefreshCw className="h-4 w-4 text-primary" />,
                        bgColor: "bg-primary-100",
                        title: "Currency Conversion",
                        time: "Mar 9, 2:15 PM",
                        amount: "GYD → USD",
                        textColor: "text-primary",
                      },
                    ].map((transaction, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center">
                          <div className={`mr-3 rounded-full ${transaction.bgColor} p-2`}>
                            {transaction.icon}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.title}</p>
                            <p className="text-xs text-gray-500">{transaction.time}</p>
                          </div>
                        </div>
                        <p className={`font-medium ${transaction.textColor}`}>
                          {transaction.amount}
                        </p>
                      </motion.div>
                    ))}
                  </StaggeredFade>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-text">
                Partner Offers
              </h2>
              <AnimatedButton
                variant="ghost"
                size="sm"
                asChild
                className="text-primary hover:text-primary-700"
              >
                <Link href="/offers">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </AnimatedButton>
            </div>
            <div className="mt-3 overflow-x-auto pb-2">
              <div className="flex gap-3">
                <motion.div
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="min-w-[250px] border-none shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge className="bg-accent text-white">New</Badge>
                        <Tag className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="mb-1 font-semibold">10% Off at TechStore</h3>
                      <p className="text-sm text-gray-500">Valid until Mar 31, 2025</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="min-w-[250px] border-none shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge className="bg-secondary text-white">Limited</Badge>
                        <Tag className="h-4 w-4 text-secondary" />
                      </div>
                      <h3 className="mb-1 font-semibold">15% Off at FashionHub</h3>
                      <p className="text-sm text-gray-500">Valid until Apr 15, 2025</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <div className="fixed bottom-20 right-4">
            <PulseAnimation>
              <AnimatedButton
                size="icon"
                className="h-12 w-12 rounded-full bg-secondary shadow-lg hover:bg-secondary-600 text-white"
                asChild
              >
                <Link href="/chat">
                  <MessageSquare className="h-6 w-6" />
                  <span className="sr-only">Chat with AI Assistant</span>
                </Link>
              </AnimatedButton>
            </PulseAnimation>
          </div>
        </AnimatePresence>
      </main>

      <EnhancedBottomNavigation />
    </div>
  )
}
