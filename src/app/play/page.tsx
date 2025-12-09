// src/app/play/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Timer, Brain } from "lucide-react"
import Link from "next/link"

export default function PlayPage() {
  // Sample questions — you can add 1000s later
  const questions = [
    {
      id: 1,
      topic: "M1: Kinematics & Projectiles",
      difficulty: "Hard",
      olympiad: true,
      source: "IPhO 2023",
      text: "A hunter aims directly at a monkey in a tree. At the instant the bullet leaves the barrel, the monkey lets go and falls straight down. Does the bullet hit the monkey?",
    },
    {
      id: 2,
      topic: "E4: Lorentz Force",
      difficulty: "Insane",
      olympiad: true,
      source: "IOAA 2024",
      text: "A charged particle moves in a region with both electric and magnetic fields. Find the condition for the particle to move in a straight line.",
    },
    {
      id: 3,
      topic: "Algebra: Polynomials",
      difficulty: "Medium",
      olympiad: false,
      source: "RMO 2022",
      text: "Let p(x) be a polynomial with integer coefficients. Prove that if p(a) = p(b) = 2 and a ≠ b, then p(n) ≠ 1 for any integer n.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-cyan-950 text-white">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-black/70 backdrop-blur-xl border-b border-purple-500/30 z-40 flex items-center justify-between px-10">
        <Link href="/dashboard" className="flex items-center gap-4 hover:text-purple-400 transition">
          <ArrowLeft className="w-8 h-8" />
          <span className="text-2xl font-bold">Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm opacity-70">Total Questions</p>
            <p className="text-3xl font-black">{questions.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-12">
        <h1 className="text-center text-8xl font-black mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Play
        </h1>

        <div className="max-w-5xl mx-auto space-y-8">
          {questions.map((q) => (
            <Card
              key={q.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold text-white">{q.topic}</h3>
                  <div className="flex gap-3">
                    <Badge variant={q.difficulty === "Insane" ? "destructive" : q.difficulty === "Hard" ? "default" : "secondary"}>
                      {q.difficulty}
                    </Badge>
                    {q.olympiad && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                        <Trophy className="w-4 h-4 mr-1" />
                        Olympiad
                      </Badge>
                    )}
                    <Badge variant="outline">{q.source}</Badge>
                  </div>
                </div>
              </div>

              <p className="text-xl leading-relaxed text-white/90">{q.text}</p>

              <div className="mt-8 flex gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                  <Brain className="w-5 h-5 mr-2" />
                  Solve
                </Button>
                <Button variant="outline">Hint</Button>
                <Button variant="outline">Solution</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}