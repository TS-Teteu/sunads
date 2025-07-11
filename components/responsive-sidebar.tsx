"use client"

import { useState } from "react"
import {
  BarChart,
  DollarSign,
  CheckSquare,
  TrendingUp,
  Users,
  FolderOpen,
  Home,
  Megaphone,
  Bell,
  MessageCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Tarefas", icon: CheckSquare, url: "/tarefas" },
  { title: "Projetos", icon: FolderOpen, url: "/projetos" },
  { title: "Conversas", icon: MessageCircle, url: "/conversas" },
  { title: "Comercial", icon: TrendingUp, url: "/comercial" },
  { title: "Clientes", icon: Users, url: "/clientes" },
  { title: "Financeiro", icon: DollarSign, url: "/financeiro" },
  { title: "Contas", icon: Megaphone, url: "/contas" },
  { title: "Avisos", icon: Bell, url: "/avisos" },
]

export function ResponsiveSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200 h-16">
        <div className="flex items-center gap-2 min-w-0">
          <BarChart className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <h2
            className={cn(
              "text-lg font-semibold text-gray-900 whitespace-nowrap transition-all duration-300",
              isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
            )}
          >
            Sun Ads
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 py-4">
        <div className="space-y-1">
          {/* Label */}
          <div
            className={cn(
              "px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider transition-all duration-300",
              isExpanded ? "opacity-100" : "opacity-0",
            )}
          >
            Navegação
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 relative",
                "min-h-[44px]",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span
                className={cn(
                  "font-medium whitespace-nowrap transition-all duration-300",
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                )}
              >
                {item.title}
              </span>

              {/* Tooltip para quando está recolhido */}
              {!isExpanded && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                </div>
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Indicador de expansão */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div
          className={cn(
            "w-8 h-1 bg-gray-300 rounded-full transition-all duration-300",
            isExpanded ? "bg-blue-500" : "bg-gray-300",
          )}
        />
      </div>
    </div>
  )
}
