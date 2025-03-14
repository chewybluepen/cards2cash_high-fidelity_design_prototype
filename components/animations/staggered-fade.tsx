"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggeredFadeProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredFade({ children, staggerDelay = 0.1, className }: StaggeredFadeProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className={className}>
      {children.map((child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

