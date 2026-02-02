"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="fixed right-6 top-6 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-all">
        <div className="size-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group fixed right-6 top-6 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-foreground/20 hover:bg-background"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="size-5 text-foreground transition-transform group-hover:rotate-12" />
      ) : (
        <Moon className="size-5 text-foreground transition-transform group-hover:-rotate-12" />
      )}
    </button>
  )
}
