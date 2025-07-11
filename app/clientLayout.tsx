"use client"

import "@/styles/globals.css"
import type React from "react"

import { ResponsiveSidebar } from "@/components/responsive-sidebar"
import { getServerSession } from "next-auth"
import { AuthProvider } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react" // Importar signOut para o cliente

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  // Se não houver sessão e a rota não for a de login, redireciona para o login
  const session = getServerSession() as any

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <div className="flex h-screen overflow-hidden bg-background">
            {session && <ResponsiveSidebar />}
            <main className="flex-1 overflow-y-auto bg-background ml-16">
              {children}
              {session && (
                <div className="fixed bottom-4 right-4">
                  <Button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    variant="outline"
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </div>
              )}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
