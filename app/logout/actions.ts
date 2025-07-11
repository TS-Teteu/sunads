"use server"

import { redirect } from "next/navigation"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import type { SessionData } from "@/lib/session"
import { sessionOptions } from "@/lib/session"

export async function logout() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  session.destroy()
  redirect("/login")
}
