"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, LineChart, BarChart3, PieChart, Calendar, Download } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mock growth data
const growthData = {
  monthly: {
    current: 15,
    previous: 12,
    history: [
      { month: "Jan", growth: 8 },
      { month: "Feb", growth: 10 },
      { month: "Mar", growth: 12 },
      { month: "Apr", growth: 9 },
      { month: "May", growth: 11 },
      { month: "Jun", growth: 15 },
    ],
  },
  quarterly: {
    current: 38,
    previous: 30,
    history: [
      { quarter: "Q1", growth: 25 },
      { quarter: "Q2", growth: 30 },
      { quarter: "Q3", growth: 38 },
      { quarter: "Q4", growth: 42 },
    ],
  },
  yearly: {
    current: 142,
    previous: 115,
    history: [
      { year: "2022", growth: 100 },
      { year: "2023", growth: 115 },
      { year: "2024", growth: 142 },
    ],
  },
}

export default function MonthlyGrowth() {
  const [activeTab, setActiveTab] = useState("monthly")
  const [chartView, setChartView] = useState("line")

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
          <h1 className="text-lg font-semibold">Growth Analytics</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Portfolio Growth</CardTitle>
                <CardDescription>Track your investment performance over time</CardDescription>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Growth</p>
                <p className="text-3xl font-bold text-green-600">
                  +
                  {activeTab === "monthly"
                    ? growthData.monthly.current
                    : activeTab === "quarterly"
                      ? growthData.quarterly.current
                      : growthData.yearly.current}
                  %
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Previous Period</p>
                <p className="text-xl font-medium text-gray-700">
                  +
                  {activeTab === "monthly"
                    ? growthData.monthly.previous
                    : activeTab === "quarterly"
                      ? growthData.quarterly.previous
                      : growthData.yearly.previous}
                  %
                </p>
              </div>
            </div>

            <Tabs defaultValue="monthly" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>

              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant={chartView === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartView("line")}
                >
                  <LineChart className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartView === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartView("bar")}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={chartView === "pie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartView("pie")}
                >
                  <PieChart className="h-4 w-4" />
                </Button>
              </div>

              <TabsContent value="monthly" className="mt-4">
                <div className="h-64 w-full rounded-md border bg-white p-4">
                  {/* Placeholder for chart - in a real app, you'd use a charting library */}
                  <div className="flex h-full flex-col items-center justify-center">
                    <div className="flex h-full w-full items-end justify-between gap-2 pb-6">
                      {growthData.monthly.history.map((item, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center">
                          <div className="w-full bg-green-500" style={{ height: `${(item.growth / 20) * 100}%` }}></div>
                          <span className="mt-2 text-xs">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quarterly" className="mt-4">
                <div className="h-64 w-full rounded-md border bg-white p-4">
                  <div className="flex h-full flex-col items-center justify-center">
                    <div className="flex h-full w-full items-end justify-between gap-2 pb-6">
                      {growthData.quarterly.history.map((item, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center">
                          <div className="w-full bg-blue-500" style={{ height: `${(item.growth / 50) * 100}%` }}></div>
                          <span className="mt-2 text-xs">{item.quarter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="yearly" className="mt-4">
                <div className="h-64 w-full rounded-md border bg-white p-4">
                  <div className="flex h-full flex-col items-center justify-center">
                    <div className="flex h-full w-full items-end justify-between gap-2 pb-6">
                      {growthData.yearly.history.map((item, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center">
                          <div
                            className="w-full bg-purple-500"
                            style={{ height: `${(item.growth / 150) * 100}%` }}
                          ></div>
                          <span className="mt-2 text-xs">{item.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Insights</CardTitle>
            <CardDescription>Key metrics and performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm text-gray-500">Average Growth</p>
                <p className="text-xl font-bold text-blue-600">+10.8%</p>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm text-gray-500">Best Month</p>
                <p className="text-xl font-bold text-green-600">Jun (+15%)</p>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm text-gray-500">YTD Growth</p>
                <p className="text-xl font-bold text-purple-600">+65%</p>
              </div>
              <div className="rounded-lg border bg-white p-4">
                <p className="text-sm text-gray-500">Projected EOY</p>
                <p className="text-xl font-bold text-amber-600">+142%</p>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <div className="mb-2 flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <p className="font-medium">Upcoming Growth Events</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm">
                  <span>Quarterly Dividend</span>
                  <span className="font-medium text-green-600">Jul 15, 2025</span>
                </li>
                <li className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm">
                  <span>Interest Payment</span>
                  <span className="font-medium text-green-600">Aug 1, 2025</span>
                </li>
                <li className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-sm">
                  <span>Staking Rewards</span>
                  <span className="font-medium text-green-600">Aug 15, 2025</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

