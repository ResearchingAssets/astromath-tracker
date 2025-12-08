// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"

const users = {
  reminiscxnt: { id: "1", name: "Reminiscxnt" },
  jaelyn:     { id: "2", name: "Jaelyn"     },
} as const

const handler = NextAuth({
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        // credentials is now properly typed – no more 'any'
        const username = credentials?.username as keyof typeof users | undefined

        if (!username) return null

        return users[username] ?? null
      },
    },
  ],
  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }