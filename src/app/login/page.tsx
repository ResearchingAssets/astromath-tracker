"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Login()
  {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-black to-cyan-950">
      <Card className="w-96 p-10 bg-black/60 backdrop-blur-xl border-purple-500/30">
        <h1 className="text-center text-5xl font-black mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AstroMathTracker
        </h1>
        <div className="space-y-6">
          <Button
            onClick={() => signIn("credentials", { username: "reminiscxnt" })}
            className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600"
          >
            Reminiscxnt
          </Button>
          <Button
            onClick={() => signIn("credentials", { username: "jaelyn" })}
            className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600"
          >
            Jaelyn
          </Button>
        </div>
      </Card>
    </div>
  )
}