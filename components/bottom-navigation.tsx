"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { CreditCard, Home, PieChart, Settings, Smartphone } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Home" },
    { path: "/add-funds", icon: Smartphone, label: "Add Funds" },
    { path: "/generate-card", icon: CreditCard, label: "Cards" },
    { path: "/transactions", icon: PieChart, label: "Activity" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <motion.div
      className="fixed bottom-0 left-0 z-10 w-full border-t bg-white"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid h-16 grid-cols-5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center relative ${
              isActive(item.path) ? "text-primary" : "text-gray-500"
            }`}
          >
            {isActive(item.path) && (
              <motion.div
                layoutId="bottomNavIndicator"
                className="absolute -top-1 h-1 w-10 rounded-full bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ y: -2 }}>
              <item.icon className="h-5 w-5" />
              <span className="mt-1 text-xs">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

