"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationToastProps {
  type: NotificationType
  title: string
  message: string
  duration?: number
  onClose?: () => void
  className?: string
}

export function NotificationToast({
  type,
  title,
  message,
  duration = 5000,
  onClose,
  className,
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) setTimeout(onClose, 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) setTimeout(onClose, 300)
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-secondary" />
      case "error":
        return <X className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-accent" />
      case "info":
        return <Info className="h-5 w-5 text-primary" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-secondary-50 border-l-4 border-secondary"
      case "error":
        return "bg-red-50 border-l-4 border-red-500"
      case "warning":
        return "bg-accent-50 border-l-4 border-accent"
      case "info":
        return "bg-primary-50 border-l-4 border-primary"
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed right-4 top-4 z-50 w-full max-w-sm overflow-hidden rounded-lg shadow-lg",
            getBackgroundColor(),
            className,
          )}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">{getIcon()}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className="h-1 bg-primary-200"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

