import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession()

  if (!session?.user?.name) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Redirecting to login...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-cyan-950 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-8xl font-black mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {session.user.name}
        </h1>
        <p className="text-4xl text-white/90">Welcome back</p>
      </div>
    </div>
  )
  console.log("Dashboard loading for user:", session?.user?.name)
  console.log("Full session:", session)
}