"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  Users,
  DollarSign,
  Bell,
  Megaphone,
  Building2,
} from "lucide-react"
import { LogoutButton } from "./logout-button"

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/tarefas", icon: CheckSquare, label: "Tarefas" },
    { href: "/empresas", icon: Building2, label: "Empresas" }, // Atualizado para Empresas
    { href: "/conversas", icon: MessageSquare, label: "Conversas" },
    { href: "/comercial", icon: TrendingUp, label: "Comercial" },
    { href: "/clientes", icon: Users, label: "Contatos" }, // Mantido como Contatos
    { href: "/financeiro", icon: DollarSign, label: "Financeiro" },
    { href: "/contas", icon: Megaphone, label: "Contas" },
    { href: "/avisos", icon: Bell, label: "Avisos" },
  ]

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <span className="font-bold text-white text-lg">S</span>
            </div>
            <span className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700">
              Sun Ads
            </span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="text-xs font-semibold text-muted-foreground px-3 py-2">NAVEGAÇÃO</div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
