"use client"

import { signOut } from "next-auth/react"
import { LogOut, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-md border-b border-purple-500/20 z-50">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AstroMathTracker
        </h1>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </Button>
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="outline"
            size="lg"
            className="gap-3"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </div>
      </div>
    </nav>
  )
}