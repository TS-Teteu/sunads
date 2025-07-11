"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Facebook, Link, Wallet, CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface AdAccount {
  id: string
  name: string
  status: "ACTIVE" | "DISABLED" | "PENDING_REVIEW"
  balance: number
  currency: string
}

const mockAdAccounts: AdAccount[] = [
  {
    id: "1234567890",
    name: "Minha Agência - Conta Principal",
    status: "ACTIVE",
    balance: 1500.75,
    currency: "BRL",
  },
  {
    id: "0987654321",
    name: "Cliente ABC - Campanha Verão",
    status: "ACTIVE",
    balance: 800.0,
    currency: "BRL",
  },
  {
    id: "1122334455",
    name: "Cliente XYZ - Conta Bloqueada",
    status: "DISABLED",
    balance: 0.0,
    currency: "BRL",
  },
  {
    id: "6677889900",
    name: "Projeto Beta - Testes",
    status: "PENDING_REVIEW",
    balance: 250.5,
    currency: "BRL",
  },
]

export default function AccountsPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [accessToken, setAccessToken] = useState("")
  const [appId, setAppId] = useState("")
  const [appSecret, setAppSecret] = useState("")
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load saved credentials from localStorage (for demo purposes only)
    const savedAccessToken = localStorage.getItem("facebook_access_token")
    const savedAppId = localStorage.getItem("facebook_app_id")
    const savedAppSecret = localStorage.getItem("facebook_app_secret")

    if (savedAccessToken && savedAppId && savedAppSecret) {
      setAccessToken(savedAccessToken)
      setAppId(savedAppId)
      setAppSecret(savedAppSecret)
      setIsConnected(true)
      // In a real app, you'd fetch real data here
      setAdAccounts(mockAdAccounts)
    }
  }, [])

  const handleConnect = async () => {
    setError(null)
    setIsLoading(true)
    // Simulate API call to Facebook
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

    if (accessToken && appId && appSecret) {
      // In a real application, you would send these credentials to your backend
      // Your backend would then use the Facebook Graph API to fetch ad accounts
      // For this demo, we'll just use mock data
      localStorage.setItem("facebook_access_token", accessToken)
      localStorage.setItem("facebook_app_id", appId)
      localStorage.setItem("facebook_app_secret", appSecret)
      setIsConnected(true)
      setAdAccounts(mockAdAccounts)
    } else {
      setError("Por favor, preencha todos os campos de credenciais.")
    }
    setIsLoading(false)
  }

  const handleDisconnect = () => {
    localStorage.removeItem("facebook_access_token")
    localStorage.removeItem("facebook_app_id")
    localStorage.removeItem("facebook_app_secret")
    setIsConnected(false)
    setAccessToken("")
    setAppId("")
    setAppSecret("")
    setAdAccounts([])
    setError(null)
  }

  const getStatusColor = (status: AdAccount["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "DISABLED":
        return "bg-red-100 text-red-800"
      case "PENDING_REVIEW":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contas</h2>
          <p className="text-muted-foreground">Gerencie suas integrações e contas de anúncios</p>
        </div>
      </div>

      {/* Facebook Integration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Facebook className="h-5 w-5 text-blue-600" />
            Integração Facebook Ads
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
              <p className="text-sm text-muted-foreground">
                Para conectar, insira suas credenciais de acesso. Em um ambiente real, isso envolveria um fluxo OAuth
                seguro.
              </p>
              <div className="space-y-2">
                <Label htmlFor="facebook-access-token">Token de Acesso (Simulado)</Label>
                <Input
                  id="facebook-access-token"
                  placeholder="Cole seu token de acesso aqui"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook-app-id">ID do Aplicativo (Simulado)</Label>
                <Input
                  id="facebook-app-id"
                  placeholder="ID do seu aplicativo Facebook"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook-app-secret">App Secret (Simulado)</Label>
                <Input
                  id="facebook-app-secret"
                  placeholder="Seu App Secret do Facebook"
                  value={appSecret}
                  onChange={(e) => setAppSecret(e.target.value)}
                  type="password"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button onClick={handleConnect} className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Conectando...
                  </>
                ) : (
                  <>
                    <Link className="mr-2 h-4 w-4" /> Conectar ao Facebook
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Conectado com sucesso ao Facebook.
              </p>
              <Button onClick={handleDisconnect} variant="outline" className="w-full bg-transparent">
                <XCircle className="mr-2 h-4 w-4" /> Desconectar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ad Accounts List */}
      {isConnected && adAccounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Contas de Anúncio (Facebook)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID da Conta</TableHead>
                    <TableHead>Nome da Conta</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">{account.id}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={getStatusColor(account.status)}>
                          {account.status.replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {account.currency} {account.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {isConnected && adAccounts.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Facebook className="h-12 w-12 text-muted-foreground mb-4" />
          <div className="text-muted-foreground">Nenhuma conta de anúncio encontrada.</div>
          <p className="text-sm text-muted-foreground">Verifique suas permissões ou tente novamente.</p>
        </div>
      )}
    </div>
  )
}
