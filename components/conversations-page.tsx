"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatwootWidget } from "@/components/chatwoot-widget"
import { ConversationsList } from "@/components/conversations-list"
import { ConversationStats } from "@/components/conversation-stats"
import { MessageCircle, Search, Settings, RefreshCw } from "lucide-react"

export interface Conversation {
  id: string
  contact: {
    name: string
    email: string
    phone?: string
    avatar?: string
  }
  status: "open" | "resolved" | "pending"
  priority: "low" | "medium" | "high"
  assignee?: string
  lastMessage: {
    content: string
    timestamp: string
    sender: "customer" | "agent"
  }
  unreadCount: number
  tags: string[]
  source: "website" | "whatsapp" | "email" | "facebook" | "instagram"
  createdAt: string
}

const mockConversations: Conversation[] = []

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simular chamada para API do Chatwoot
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "unread" && conv.unreadCount > 0) ||
      (selectedTab === "open" && conv.status === "open") ||
      (selectedTab === "resolved" && conv.status === "resolved")

    return matchesSearch && matchesTab
  })

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
  const openConversations = conversations.filter((conv) => conv.status === "open").length
  const resolvedToday = conversations.filter(
    (conv) =>
      conv.status === "resolved" && new Date(conv.lastMessage.timestamp).toDateString() === new Date().toDateString(),
  ).length

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Conversas</h2>
          <p className="text-muted-foreground">Central de atendimento integrada com Chatwoot</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <ConversationStats
        totalUnread={totalUnread}
        openConversations={openConversations}
        resolvedToday={resolvedToday}
        totalConversations={conversations.length}
      />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Conversas
                </CardTitle>
                <Badge variant="secondary">{filteredConversations.length}</Badge>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tabs */}
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="unread">
                    Não Lidas
                    {totalUnread > 0 && (
                      <Badge variant="destructive" className="ml-1 h-4 w-4 p-0 text-xs">
                        {totalUnread}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="open">Abertas</TabsTrigger>
                  <TabsTrigger value="resolved">Resolvidas</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0">
              <ConversationsList conversations={filteredConversations} />
            </CardContent>
          </Card>
        </div>

        {/* Chatwoot Widget */}
        <div className="lg:col-span-1">
          <ChatwootWidget />
        </div>
      </div>
    </div>
  )
}
