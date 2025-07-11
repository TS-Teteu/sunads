"use client"

import type { Conversation } from "@/components/conversations-page"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { MessageCircle, Phone, Mail } from "lucide-react"

interface ConversationsListProps {
  conversations: Conversation[]
}

const statusColors = {
  open: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  resolved: "bg-gray-100 text-gray-800",
}

const statusLabels = {
  open: "Aberta",
  pending: "Pendente",
  resolved: "Resolvida",
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const priorityLabels = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
}

const sourceIcons = {
  website: "🌐",
  whatsapp: "📱",
  email: "📧",
  facebook: "📘",
  instagram: "📷",
}

export function ConversationsList({ conversations }: ConversationsListProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m atrás`
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`
    } else {
      return date.toLocaleDateString("pt-BR")
    }
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <div className="text-muted-foreground">Nenhuma conversa encontrada</div>
        <p className="text-sm text-muted-foreground">Tente ajustar os filtros de busca</p>
      </div>
    )
  }

  return (
    <div className="divide-y">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cn(
            "p-4 hover:bg-muted/50 cursor-pointer transition-colors",
            conversation.unreadCount > 0 && "bg-blue-50/50 border-l-4 border-l-blue-500",
          )}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {conversation.contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm truncate">{conversation.contact.name}</h4>
                  <span className="text-lg">{sourceIcons[conversation.source]}</span>
                </div>
                <div className="flex items-center gap-1">
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{conversation.contact.email}</span>
                </div>
                {conversation.contact.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{conversation.contact.phone}</span>
                  </div>
                )}
              </div>

              {/* Last Message */}
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{conversation.lastMessage.content}</p>

              {/* Tags and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={cn("text-xs", statusColors[conversation.status])}>
                    {statusLabels[conversation.status]}
                  </Badge>
                  <Badge variant="secondary" className={cn("text-xs", priorityColors[conversation.priority])}>
                    {priorityLabels[conversation.priority]}
                  </Badge>
                  {conversation.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {conversation.assignee && (
                  <span className="text-xs text-muted-foreground">Atribuído: {conversation.assignee}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
