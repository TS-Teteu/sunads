"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Settings, Zap, CheckCircle } from "lucide-react"

export function ChatwootWidget() {
  const [isConnected, setIsConnected] = useState(false)
  const [chatwootUrl, setChatwootUrl] = useState("")
  const [apiKey, setApiKey] = useState("")

  // Simular conexão com Chatwoot
  useEffect(() => {
    // Verificar se já existe configuração salva
    const savedUrl = localStorage.getItem("chatwoot_url")
    const savedKey = localStorage.getItem("chatwoot_api_key")

    if (savedUrl && savedKey) {
      setChatwootUrl(savedUrl)
      setApiKey(savedKey)
      setIsConnected(true)
    }
  }, [])

  const handleConnect = () => {
    if (chatwootUrl && apiKey) {
      localStorage.setItem("chatwoot_url", chatwootUrl)
      localStorage.setItem("chatwoot_api_key", apiKey)
      setIsConnected(true)
    }
  }

  const handleDisconnect = () => {
    localStorage.removeItem("chatwoot_url")
    localStorage.removeItem("chatwoot_api_key")
    setChatwootUrl("")
    setApiKey("")
    setIsConnected(false)
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Integração Chatwoot
            {isConnected ? (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Conectado
              </Badge>
            ) : (
              <Badge variant="secondary">Desconectado</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="chatwoot-url">URL do Chatwoot</Label>
                <Input
                  id="chatwoot-url"
                  placeholder="https://app.chatwoot.com"
                  value={chatwootUrl}
                  onChange={(e) => setChatwootUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Sua chave de API"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button onClick={handleConnect} className="w-full">
                Conectar ao Chatwoot
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Conectado a: {chatwootUrl}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDisconnect}>
                  Desconectar
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-1" />
                  Configurar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chatwoot Embed */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Dashboard Chatwoot</span>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                Abrir
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-sm font-medium">Widget do Chatwoot</div>
                <div className="text-xs text-muted-foreground">Aqui seria exibido o iframe do Chatwoot</div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Abrir no Chatwoot
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            📊 Relatórios de Atendimento
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            👥 Gerenciar Agentes
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            🏷️ Configurar Tags
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            🤖 Configurar Chatbot
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
