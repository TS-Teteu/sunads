"use client"

import { BarChart, DollarSign, CheckSquare, TrendingUp, Users, Building2, Home, Megaphone, Bell } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Financeiro", icon: DollarSign, url: "/financeiro" },
  { title: "Tarefas", icon: CheckSquare, url: "/tarefas" },
  { title: "Comercial", icon: TrendingUp, url: "/comercial" },
  { title: "Clientes", icon: Users, url: "/clientes" },
  { title: "Empresas", icon: Building2, url: "/empresas" }, // Alterado de Projetos para Empresas
  { title: "Contas", icon: Megaphone, url: "/contas" },
  { title: "Avisos", icon: Bell, url: "/avisos" },
]

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="group/sidebar transition-all duration-300 ease-in-out hover:w-64 data-[state=collapsed]:w-16"
    >
      <SidebarHeader className="flex items-center px-4 py-3 border-b group-hover/sidebar:px-4 group-data-[state=collapsed]/sidebar:px-2 transition-all duration-300">
        <div className="flex items-center gap-2 min-w-0">
          <BarChart className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <h2 className="text-lg font-semibold truncate group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:w-0 group-hover/sidebar:opacity-100 group-hover/sidebar:w-auto transition-all duration-300">
            Sun Ads
          </h2>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[state=collapsed]/sidebar:opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="group/menu-item relative flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all duration-200 min-h-[44px]"
                  >
                    <a href={item.url}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate group-data-[state=collapsed]/sidebar:opacity-0 group-data-[state=collapsed]/sidebar:w-0 group-hover/sidebar:opacity-100 group-hover/sidebar:w-auto transition-all duration-300 delay-75">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
