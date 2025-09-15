"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [color, setColor] = useState("dark");

    useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const systemTheme = mediaQuery.matches ? "dark" : "light"
    setColor(systemTheme)
  }, [])
  const toggleTheme = () => {
    setColor(color === "light" ? "dark" : "light")
    setTheme(color)
  }
  return (
    <Button size="sm" variant="ghost" onClick={toggleTheme}>
      {color === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  )
}