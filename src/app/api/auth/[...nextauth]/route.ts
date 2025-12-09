import NextAuth from "next-auth"

const users = {
  reminiscxnt: { id: "1", name: "Reminiscxnt" },
  jaelyn:     { id: "2", name: "Jaelyn"     },
} as const

const handler = NextAuth({
  providers: [
    {
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username) return null
        return users[credentials.username as keyof typeof users] || null
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
})

export { handler as GET, handler as POST }