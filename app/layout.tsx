import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PageTransition } from "@/components/animations/page-transition"
// Import the PageConnector
import { PageConnector } from "@/components/page-connector"
// Import the ErrorBoundary
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cards2Cash",
  description: "Convert prepaid credit into digital funds",
    generator: 'v0.dev'
}

// Update the layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <PageConnector />
          <PageTransition>{children}</PageTransition>
        </ErrorBoundary>
      </body>
    </html>
  )
}



import './globals.css'