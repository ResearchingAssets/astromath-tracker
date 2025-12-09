// src/app/dashboard/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { 
  Brain, Atom, Trophy, Target, BarChart3, Flame, 
  Home, Play, RotateCcw, Settings, HelpCircle, LogOut, 
  ChevronUp, ChevronDown
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const { data: session } = useSession()
  const name = session?.user?.name || "Warrior"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showUpArrow, setShowUpArrow] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const [mathHours, setMathHours] = useState(0)
  const [physicsHours, setPhysicsHours] = useState(0)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    if (name) {
      setMathHours(Number(localStorage.getItem(`${name}_math`) || 0))
      setPhysicsHours(Number(localStorage.getItem(`${name}_physics`) || 0))
      setStreak(Number(localStorage.getItem(`${name}_streak`) || 0))
    }
  }, [name])

  const addHour = (subject: "math" | "physics") => {
    if (subject === "math") {
      const newVal = mathHours + 1
      setMathHours(newVal)
      localStorage.setItem(`${name}_math`, String(newVal))
    } else {
      const newVal = physicsHours + 1
      setPhysicsHours(newVal)
      localStorage.setItem(`${name}_physics`, String(newVal))
    }
    const newStreak = streak + 1
    setStreak(newStreak)
    localStorage.setItem(`${name}_streak`, String(newStreak))
  }

  const scrollToStats = () => statsRef.current?.scrollIntoView({ behavior: "smooth" })
  const scrollToTop = () => heroRef.current?.scrollIntoView({ behavior: "smooth" })

  useEffect(() => {
    const handleScroll = () => setShowUpArrow(window.scrollY > window.innerHeight / 2)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hide scrollbar completely
  useEffect(() => {
    document.documentElement.style.overflow = "hidden"
    return () => { document.documentElement.style.overflow = "auto" }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-cyan-950 text-white">
      {/* Sidebar */}
      <div 
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        className={`fixed inset-y-0 left-0 bg-black/80 backdrop-blur-xl border-r border-purple-500/30 transition-all duration-300 z-50 ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex flex-col h-full py-8 items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl font-black mb-12 shadow-2xl">
            {name[0]}
          </div>

          <nav className="flex-1 space-y-4 w-full px-4">
  {[
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Play, label: "Play", href: "/play" },
    { icon: RotateCcw, label: "Review", href: "#" },
    { icon: Settings, label: "Setup", href: "#" },
    { icon: Trophy, label: "Leaderboard", href: "#" },
    { icon: HelpCircle, label: "Help", href: "#" },
  ].map((item) => (
    <Link
      key={item.label}
      href={item.href}
      className="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-white/10 transition-all block"
    >
      <item.icon className="w-6 h-6 flex-shrink-0" />
      <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
        {item.label}
      </span>
    </Link>
  ))}
</nav>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-4 px-4 py-4 hover:bg-white/10 rounded-xl transition-all"
          >
            <LogOut className="w-6 h-6" />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Hero */}
        <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center p-12">
          <h1 className="text-9xl font-black mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl w-full">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-purple-500/30 text-center">
              <Brain className="w-28 h-28 mx-auto mb-8 text-purple-400" />
              <p className="text-9xl font-black text-white">{mathHours}</p>
              <p className="text-3xl mt-6 opacity-80">Math Hours</p>
              <Button onClick={() => addHour("math")} className="mt-10 w-64 h-20 text-3xl rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                +1 Hour
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-cyan-500/30 text-center">
              <Atom className="w-28 h-28 mx-auto mb-8 text-cyan-400" />
              <p className="text-9xl font-black text-white">{physicsHours}</p>
              <p className="text-3xl mt-6 opacity-80">Physics Hours</p>
              <Button onClick={() => addHour("physics")} className="mt-10 w-64 h-20 text-3xl rounded-full bg-gradient-to-r from-cyan-500 to-blue-600">
                +1 Hour
              </Button>
            </div>
          </div>

          <button onClick={scrollToStats} className="absolute bottom-10 animate-bounce">
            <ChevronDown className="w-16 h-16 text-white/60 hover:text-white transition" />
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="py-32 px-12">
          <h2 className="text-center text-7xl font-black mb-20 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Your Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-yellow-500/30">
              <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
              <p className="text-8xl font-black text-white">{streak}</p>
              <p className="text-2xl opacity-80">Day Streak</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-green-500/30">
              <Target className="w-24 h-24 mx-auto mb-6 text-green-400" />
              <p className="text-8xl font-black text-white">0</p>
              <p className="text-2xl opacity-80">Correct</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-red-500/30">
              <BarChart3 className="w-24 h-24 mx-auto mb-6 text-red-400" />
              <p className="text-8xl font-black text-white">0</p>
              <p className="text-2xl opacity-80">Attempted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center border border-orange-500/30">
              <Flame className="w-24 h-24 mx-auto mb-6 text-orange-400" />
              <p className="text-8xl font-black text-white">0</p>
              <p className="text-2xl opacity-80">Win Streak</p>
            </div>
          </div>
        </div>

        {/* Up Arrow */}
        {showUpArrow && (
          <button onClick={scrollToTop} className="fixed bottom-10 right-10 z-50 bg-white/20 backdrop-blur-xl p-6 rounded-full hover:bg-white/30 animate-bounce">
            <ChevronUp className="w-12 h-12" />
          </button>
        )}
      </div>
    </div>
  )
}