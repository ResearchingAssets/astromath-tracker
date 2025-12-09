// src/app/page.tsx
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession()
  redirect(session ? "/dashboard" : "/login")
}