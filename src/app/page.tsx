// src/app/page.tsx  ← REPLACE OR CREATE THIS FILE
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function RootPage() {
  const session = await getServerSession()
  
  if (session) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}