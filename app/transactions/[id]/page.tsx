"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CreditCard, Download, ExternalLink, Info, Plus, RefreshCw, Share2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mock transaction data
const transactions = [
  {
    id: 1,
    type: "add",
    title: "Added Funds",
    amount: 5000,
    currency: "GYD",
    date: "2025-03-10T10:30:00",
    status: "success",
    description: "Added funds via Digicel prepaid voucher",
    reference: "TXN123456789",
    fee: 0,
  },
  {
    id: 2,
    type: "card",
    title: "Virtual Card",
    amount: 2500,
    currency: "GYD",
    date: "2025-03-09T15:45:00",
    status: "success",
    description: "Generated Visa virtual card for online shopping",
    reference: "TXN987654321",
    fee: 50,
    cardDetails: {
      type: "Visa",
      last4: "1234",
      expiry: "03/26",
    },
  },
  {
    id: 3,
    type: "convert",
    title: "Currency Conversion",
    amount: 10000,
    currency: "GYD",
    convertedAmount: 48,
    convertedCurrency: "USD",
    date: "2025-03-09T14:15:00",
    status: "success",
    description: "Converted GYD to USD",
    reference: "TXN456789123",
    fee: 150,
    rate: 0.0048,
  },
  {
    id: 4,
    type: "add",
    title: "Added Funds",
    amount: 10000,
    currency: "GYD",
    date: "2025-03-08T09:20:00",
    status: "success",
    description: "Added funds via GTT prepaid voucher",
    reference: "TXN789123456",
    fee: 0,
  },
  {
    id: 5,
    type: "card",
    title: "Virtual Card",
    amount: 5000,
    currency: "GYD",
    date: "2025-03-07T16:30:00",
    status: "failed",
    description: "Failed to generate Mastercard virtual card",
    reference: "TXN321654987",
    fee: 0,
    error: "Insufficient funds",
  },
  {
    id: 6,
    type: "convert",
    title: "Currency Conversion",
    amount: 20000,
    currency: "GYD",
    convertedAmount: 96,
    convertedCurrency: "USD",
    date: "2025-03-06T11:45:00",
    status: "success",
    description: "Converted GYD to USD",
    reference: "TXN654987321",
    fee: 300,
    rate: 0.0048,
  },
]

export default function TransactionDetails() {
  const params = useParams()
  const router = useRouter()
  const [transaction, setTransaction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call to fetch transaction details
    setIsLoading(true)

    setTimeout(() => {
      const id = Number(params.id)
      const foundTransaction = transactions.find((t) => t.id === id)

      if (foundTransaction) {
        setTransaction(foundTransaction)
        setError(null)
      } else {
        setError("Transaction not found")
      }

      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "add":
        return <Plus className="h-5 w-5 text-green-600" />
      case "card":
        return <CreditCard className="h-5 w-5 text-red-600" />
      case "convert":
        return <RefreshCw className="h-5 w-5 text-blue-600" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-600">Success</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "pending":
        return <Badge className="bg-yellow-600">Pending</Badge>
      default:
        return <Badge className="bg-gray-600">Unknown</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/transactions">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Transaction Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading transaction details...</p>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/transactions">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Transaction Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/transactions">Return to Transactions</Link>
            </Button>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/transactions">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Transaction Details</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`mr-3 rounded-full p-2 ${
                    transaction.type === "add"
                      ? "bg-green-100"
                      : transaction.type === "card"
                        ? "bg-red-100"
                        : "bg-blue-100"
                  }`}
                >
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <CardTitle>{transaction.title}</CardTitle>
                  <CardDescription>{new Date(transaction.date).toLocaleString()}</CardDescription>
                </div>
              </div>
              {getStatusBadge(transaction.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-gray-500">Amount</span>
                <span
                  className={`text-xl font-bold ${
                    transaction.type === "add"
                      ? "text-green-600"
                      : transaction.type === "card"
                        ? "text-red-600"
                        : "text-blue-600"
                  }`}
                >
                  {transaction.type === "add" ? "+" : transaction.type === "card" ? "-" : ""}
                  {transaction.amount.toLocaleString()} {transaction.currency}
                </span>
              </div>

              {transaction.type === "convert" && (
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-gray-500">Converted to</span>
                  <span className="text-lg font-medium">
                    {transaction.convertedAmount.toLocaleString()} {transaction.convertedCurrency}
                  </span>
                </div>
              )}

              {transaction.fee > 0 && (
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-gray-500">Fee</span>
                  <span className="text-sm font-medium text-gray-700">
                    {transaction.fee.toLocaleString()} {transaction.currency}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Details</h3>
              <div className="rounded-md border p-4">
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Description</dt>
                    <dd className="text-sm font-medium">{transaction.description}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-sm text-gray-500">Reference</dt>
                    <dd className="text-sm font-medium">{transaction.reference}</dd>
                  </div>

                  {transaction.type === "convert" && transaction.rate && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Exchange Rate</dt>
                      <dd className="text-sm font-medium">
                        1 {transaction.currency} = {transaction.rate} {transaction.convertedCurrency}
                      </dd>
                    </div>
                  )}

                  {transaction.type === "card" && transaction.cardDetails && (
                    <>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Card Type</dt>
                        <dd className="text-sm font-medium">{transaction.cardDetails.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Card Number</dt>
                        <dd className="text-sm font-medium">**** **** **** {transaction.cardDetails.last4}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500">Expiry</dt>
                        <dd className="text-sm font-medium">{transaction.cardDetails.expiry}</dd>
                      </div>
                    </>
                  )}

                  {transaction.status === "failed" && transaction.error && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Error</dt>
                      <dd className="text-sm font-medium text-red-600">{transaction.error}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="flex w-full space-x-2">
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {transaction.status === "failed" && (
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Try Again</Button>
            )}

            {transaction.type === "card" && transaction.status === "success" && (
              <Button variant="outline" className="w-full" asChild>
                <Link href="#">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Card Details
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>

        <div className="text-center">
          <Button variant="link" asChild>
            <Link href="/help">Need help with this transaction?</Link>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

