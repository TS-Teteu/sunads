import "@/styles/globals.css"
import type { Metadata } from "next"
import type React from "react"

import { ResponsiveSidebar } from "@/components/responsive-sidebar"

export const metadata: Metadata = {
  title: {
    default: "Sistema de Monitoramento",
    template: "%s | Sistema Monitor",
  },
  description: "Sistema completo de monitoramento empresarial",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex h-screen overflow-hidden bg-background">
          <ResponsiveSidebar /> {/* Sempre visível */}
          <main className="flex-1 overflow-y-auto bg-background ml-16">{children}</main>
        </div>
      </body>
    </html>
  )
}
