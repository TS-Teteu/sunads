"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    type: "venda",
    description: "Nova venda realizada - Cliente ABC Corp",
    user: "João Silva",
    time: "2 min atrás",
    status: "success",
  },
  {
    id: 2,
    type: "tarefa",
    description: "Tarefa 'Revisar proposta' foi concluída",
    user: "Maria Santos",
    time: "15 min atrás",
    status: "completed",
  },
  {
    id: 3,
    type: "cliente",
    description: "Novo cliente cadastrado - Tech Solutions",
    user: "Pedro Costa",
    time: "1 hora atrás",
    status: "new",
  },
  {
    id: 4,
    type: "projeto",
    description: "Projeto 'Website E-commerce' iniciado",
    user: "Ana Lima",
    time: "2 horas atrás",
    status: "started",
  },
  {
    id: 5,
    type: "financeiro",
    description: "Pagamento recebido - R$ 15.000",
    user: "Carlos Mendes",
    time: "3 horas atrás",
    status: "received",
  },
  {
    id: 6,
    type: "alerta",
    description: "Prazo do projeto 'App Mobile' próximo",
    user: "Sistema",
    time: "4 horas atrás",
    status: "warning",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "new":
      return "bg-purple-100 text-purple-800"
    case "started":
      return "bg-orange-100 text-orange-800"
    case "received":
      return "bg-emerald-100 text-emerald-800"
    case "warning":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "success":
      return "Venda"
    case "completed":
      return "Concluído"
    case "new":
      return "Novo"
    case "started":
      return "Iniciado"
    case "received":
      return "Recebido"
    case "warning":
      return "Alerta"
    default:
      return "Atividade"
  }
}

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">{activity.description}</p>
              <Badge variant="secondary" className={`text-xs ${getStatusColor(activity.status)}`}>
                {getStatusText(activity.status)}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>{activity.user}</span>
              <span>•</span>
              <span>{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
