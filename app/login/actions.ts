"use server"

import { redirect } from "next/navigation"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import type { SessionData } from "@/lib/session"
import { sessionOptions } from "@/lib/session"

export async function login(_: unknown, formData?: FormData) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  // Garantia de que formData existe
  if (!formData) {
    return { error: "Dados do formulário ausentes." }
  }

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulação de validação de usuário
  if (email === "mateus@sunads.com.br" && password === "Mateu$2850") {
    session.isLoggedIn = true
    session.email = email
    await session.save()
  } else {
    return { error: "Credenciais inválidas. Tente novamente." }
  }

  redirect("/")
}
