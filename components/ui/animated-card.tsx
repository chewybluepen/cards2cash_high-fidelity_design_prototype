"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverEffect?: "lift" | "scale" | "glow" | "none"
  clickEffect?: boolean
  delay?: number
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, hoverEffect = "lift", clickEffect = true, delay = 0, ...props }, ref) => {
    const getHoverAnimation = () => {
      switch (hoverEffect) {
        case "lift":
          return { y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }
        case "scale":
          return { scale: 1.02 }
        case "glow":
          return { boxShadow: "0 0 15px rgba(31, 58, 147, 0.5)" }
        case "none":
          return {}
      }
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
        whileHover={getHoverAnimation()}
        whileTap={clickEffect ? { scale: 0.98 } : {}}
        className={cn("", className)}
        {...props}
      >
        <Card className="border-none shadow-md">{children}</Card>
      </motion.div>
    )
  },
)
AnimatedCard.displayName = "AnimatedCard"

export { AnimatedCard }

