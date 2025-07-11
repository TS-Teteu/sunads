import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, MessageSquare, CheckCircle, Clock } from "lucide-react"

interface ConversationStatsProps {
  totalUnread: number
  openConversations: number
  resolvedToday: number
  totalConversations: number
}

export function ConversationStats({
  totalUnread,
  openConversations,
  resolvedToday,
  totalConversations,
}: ConversationStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Não Lidas</CardTitle>
          <MessageCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{totalUnread}</div>
          <p className="text-xs text-muted-foreground">Mensagens pendentes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversas Abertas</CardTitle>
          <MessageSquare className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{openConversations}</div>
          <p className="text-xs text-muted-foreground">Em andamento</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolvidas Hoje</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{resolvedToday}</div>
          <p className="text-xs text-muted-foreground">Finalizadas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
          <Clock className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{totalConversations}</div>
          <p className="text-xs text-muted-foreground">Todas as conversas</p>
        </CardContent>
      </Card>
    </div>
  )
}
