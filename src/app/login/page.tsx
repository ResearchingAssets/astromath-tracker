// src/app/login/page.tsx
"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function Login() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-cyan-900/50" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-800/40 via-transparent to-cyan-800/40 animate-pulse" />
      </div>

      <div className="relative z-10 text-center space-y-20">
        <h1 className="text-8xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
            AstroMathTracker
          </span>
        </h1>

        <div className="space-y-10">
          <Button
            onClick={() => signIn("credentials", { username: "reminiscxnt", callbackUrl: "/dashboard" })}
            className="h-28 w-96 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 text-4xl font-bold text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300"
          >
            Reminiscxnt
          </Button>

          <Button
            onClick={() => signIn("credentials", { username: "jaelyn", callbackUrl: "/dashboard" })}
            className="h-28 w-96 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 text-4xl font-bold text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300"
          >
            Jaelyn
          </Button>
        </div>

        <p className="text-white/60 text-xl font-light">Choose your universe</p>
      </div>
    </div>
  )
}