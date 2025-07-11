"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { login } from "@/app/login/actions"

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await login(formData)

    if (result.error) {
      setError(result.error)
    } else {
      router.push("/")
      router.refresh() // Força a atualização do layout para mostrar a sidebar
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image src="/images/sunads-logo.png" alt="Sun Ads Logo" width={200} height={60} className="h-auto w-auto" />
          <CardTitle>Acessar Painel</CardTitle>
          <CardDescription>Entre com seu e-mail e senha para acessar</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" name="password" type="password" required />
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
