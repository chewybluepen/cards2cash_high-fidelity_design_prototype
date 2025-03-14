"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Fingerprint, Lock, Wallet, Bitcoin, Landmark, CreditCard, BanknoteIcon as Bank } from "lucide-react"
import { Logo } from "@/components/logo"
import { FinancialPattern } from "@/components/financial-pattern"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredFade } from "@/components/animations/staggered-fade"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/verify-otp")
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white p-4">
      <FinancialPattern />

      <div className="w-full max-w-md space-y-8">
        <FadeIn>
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Logo size="lg" />
            </motion.div>

            <StaggeredFade className="grid grid-cols-5 gap-4">
              {[
                { icon: <Wallet className="h-8 w-8 text-primary" />, text: "Digital Wallet" },
                { icon: <Bitcoin className="h-8 w-8 text-accent" />, text: "Crypto Ready" },
                { icon: <Landmark className="h-8 w-8 text-secondary" />, text: "Bank Transfer" },
                { icon: <CreditCard className="h-8 w-8 text-primary" />, text: "Virtual Cards" },
                { icon: <Bank className="h-8 w-8 text-secondary" />, text: "Bank Connect" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  {item.icon}
                  <p className="mt-1 text-xs text-gray-500">{item.text}</p>
                </div>
              ))}
            </StaggeredFade>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="login">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-none shadow-lg">
                    <CardHeader className="bg-primary text-white rounded-t-lg">
                      <CardTitle>Welcome back</CardTitle>
                      <CardDescription className="text-primary-100">
                        Enter your credentials to access your account
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                      <CardContent className="space-y-4 p-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Login with</Label>
                            <div className="flex overflow-hidden rounded-lg border border-primary-200">
                              <AnimatedButton
                                type="button"
                                className={cn(
                                  "relative px-4 py-1.5 text-sm transition-all duration-200",
                                  loginMethod === "phone"
                                    ? "bg-primary text-white"
                                    : "bg-white text-neutral-text hover:bg-primary-50",
                                )}
                                onClick={() => setLoginMethod("phone")}
                              >
                                Phone
                                {loginMethod === "phone" && (
                                  <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary"
                                    style={{ zIndex: -1 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                  />
                                )}
                              </AnimatedButton>
                              <AnimatedButton
                                type="button"
                                className={cn(
                                  "relative px-4 py-1.5 text-sm transition-all duration-200",
                                  loginMethod === "email"
                                    ? "bg-primary text-white"
                                    : "bg-white text-neutral-text hover:bg-primary-50",
                                )}
                                onClick={() => setLoginMethod("email")}
                              >
                                Email
                                {loginMethod === "email" && (
                                  <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary"
                                    style={{ zIndex: -1 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                  />
                                )}
                              </AnimatedButton>
                            </div>
                          </div>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={loginMethod}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {loginMethod === "phone" ? (
                                <Input
                                  type="tel"
                                  placeholder="+592 XXX XXXX"
                                  required
                                  className="border-primary-200 focus:border-primary focus:ring-primary"
                                />
                              ) : (
                                <Input
                                  type="email"
                                  placeholder="name@example.com"
                                  required
                                  className="border-primary-200 focus:border-primary focus:ring-primary"
                                />
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <AnimatedButton
                              variant="link"
                              className="h-auto p-0 text-xs text-primary"
                              onClick={() => router.push("/forgot-password")}
                            >
                              Forgot password?
                            </AnimatedButton>
                          </div>
                          <Input
                            id="password"
                            type="password"
                            required
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" />
                          <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remember me
                          </label>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2 p-6 pt-0">
                        <AnimatedButton
                          type="submit"
                          className="w-full bg-primary hover:bg-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              Logging in...
                            </div>
                          ) : (
                            "Login"
                          )}
                        </AnimatedButton>
                        <AnimatedButton
                          type="button"
                          className="w-full bg-primary text-white hover:bg-primary-600"
                          onClick={() => router.push("/biometric-auth")}
                        >
                          <Fingerprint className="mr-2 h-4 w-4" />
                          Login with Biometrics
                        </AnimatedButton>

                        <div className="relative my-2">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                          </div>
                        </div>

                        <div className="flex justify-between space-x-2">
                          <AnimatedButton
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialLogin("google")}
                          >
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gmail-Biq6RHeEV3poFyoZZbT4wxzwpvaXC7.png"
                              alt="Google"
                              width={20}
                              height={20}
                            />
                          </AnimatedButton>
                          <AnimatedButton
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialLogin("facebook")}
                          >
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/facebook-S5TSeolJsT4ooEShjnweB2Oiuf3Msj.png"
                              alt="Facebook"
                              width={20}
                              height={20}
                            />
                          </AnimatedButton>
                          <AnimatedButton
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialLogin("whatsapp")}
                          >
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-llk5QKtM2DMUpwBpo0dVzsJC91oE5c.png"
                              alt="WhatsApp"
                              width={20}
                              height={20}
                            />
                          </AnimatedButton>
                        </div>
                      </CardFooter>
                    </form>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="signup">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-none shadow-lg">
                    <CardHeader className="bg-primary text-white rounded-t-lg">
                      <CardTitle>Create an account</CardTitle>
                      <CardDescription className="text-primary-100">
                        Enter your details to create your account
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSignUp}>
                      <CardContent className="space-y-4 p-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            required
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+592 XXX XXXX"
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <Input
                            id="signup-password"
                            type="password"
                            required
                            className="border-primary-200 focus:border-primary focus:ring-primary"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" required />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <a href="#" className="text-primary hover:underline">
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-primary hover:underline">
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col space-y-2 p-6 pt-0">
                        <AnimatedButton
                          type="submit"
                          className="w-full bg-primary hover:bg-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                              />
                              Creating account...
                            </div>
                          ) : (
                            "Sign Up"
                          )}
                        </AnimatedButton>

                        <div className="relative my-2">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                          </div>
                        </div>

                        <div className="flex justify-between space-x-2">
                          <AnimatedButton
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialLogin("google")}
                          >
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gmail-Biq6RHeEV3poFyoZZbT4wxzwpvaXC7.png"
                              alt="Google"
                              width={20}
                              height={20}
                            />
                          </AnimatedButton>
                          <AnimatedButton
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialLogin("facebook")}
                          >
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/facebook-S5TSeolJsT4ooEShjnweB2Oiuf3Msj.png"
                              alt="Facebook"
                              width={20}
                              height={20}
                            />
                          </AnimatedButton>
                          <AnimatedButton
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => handleSocialLogin("whatsapp")}
                          >
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-llk5QKtM2DMUpwBpo0dVzsJC91oE5c.png"
                              alt="WhatsApp"
                              width={20}
                              height={20}
                            />
                          </AnimatedButton>
                        </div>
                      </CardFooter>
                    </form>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Lock className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">Secure authentication</span>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

