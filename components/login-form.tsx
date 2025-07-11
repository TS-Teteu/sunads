"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { signIn } from "next-auth/react" // Importa a função signIn do NextAuth.js

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await signIn("credentials", {
      redirect: false, // Não redireciona automaticamente, vamos lidar com isso manualmente
      email,
      password,
      callbackUrl: "/", // URL para onde redirecionar após o login bem-sucedido
    })

    if (result?.error) {
      setError("Credenciais inválidas. Tente 'test@example.com' e 'password123'.")
    } else {
      router.push("/") // Redireciona para o dashboard após o login
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image src="/images/sunads-logo.png" alt="Sun Ads Logo" width={200} height={60} className="h-auto w-auto" />
          <CardDescription>Entre com seu e-mail e senha para acessar</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
