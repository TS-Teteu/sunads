"use client"

import { useActionState } from "react"
import { login } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginState = { error?: string }

export function LoginForm() {
  // `login` returns either void (redirect) or { error: string }
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(login, { error: undefined })

  return (
    <form action={formAction} className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-lg border p-6 shadow">
      <div className="text-center">
        <div className="mx-auto mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 text-xl font-extrabold text-white">
          SA
        </div>
        <h1 className="text-2xl font-bold">Sun&nbsp;Ads</h1>
        <p className="text-sm text-muted-foreground">Digital&nbsp;Marketing</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" placeholder="seu@email.com" required autoComplete="email" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
      </div>

      {state?.error && <p className="rounded-md bg-red-50 p-2 text-sm text-red-700">{state.error}</p>}

      <Button disabled={isPending}>{isPending ? "Entrando…" : "Entrar"}</Button>
    </form>
  )
}

/* Exportação default para compatibilidade com imports existentes */
export default LoginForm
