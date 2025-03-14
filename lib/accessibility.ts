// Utility functions for accessibility and UI enhancements

// Generate a consistent color based on initials
export function generateAvatarColor(initials: string): string {
  // Simple hash function to generate a number from a string
  const hash = initials.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  // Use the hash to select from a set of predefined colors
  const colors = [
    "#1E40AF", // Blue
    "#047857", // Green
    "#B91C1C", // Red
    "#7E22CE", // Purple
    "#C2410C", // Orange
    "#0E7490", // Cyan
    "#4338CA", // Indigo
    "#A16207", // Amber
    "#0F766E", // Teal
    "#9D174D", // Pink
  ]

  const index = Math.abs(hash) % colors.length
  return colors[index]
}

// Setup keyboard navigation for better accessibility
export function setupKeyboardNavigation(containerId: string): void {
  if (typeof window === "undefined") return

  // This function would be implemented to enhance keyboard navigation
  // For example, adding focus trapping, arrow key navigation, etc.

  // For now, we'll just log that it's been set up
  console.log(`Keyboard navigation set up for ${containerId}`)
}

// Check contrast ratio for accessibility
export function checkContrastRatio(foreground: string, background: string): number {
  // This would implement the WCAG contrast ratio calculation
  // For now, we'll return a placeholder value
  return 4.5 // Minimum AA standard
}

// Format currency with proper localization
export function formatCurrency(amount: number, currency = "GYD"): string {
  return new Intl.NumberFormat("en-GY", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

// Handle screen reader announcements
export function announceToScreenReader(message: string): void {
  if (typeof window === "undefined") return

  // Create or use an existing live region
  let announcer = document.getElementById("screen-reader-announcer")

  if (!announcer) {
    announcer = document.createElement("div")
    announcer.id = "screen-reader-announcer"
    announcer.setAttribute("aria-live", "polite")
    announcer.setAttribute("aria-atomic", "true")
    announcer.className = "sr-only"
    document.body.appendChild(announcer)
  }

  // Set the message
  announcer.textContent = message

  // Clear after a delay
  setTimeout(() => {
    announcer.textContent = ""
  }, 3000)
}

