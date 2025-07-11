"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FinancialChart } from "@/components/financial-chart"
import { DollarSign, Building2, ExternalLink, TrendingUp, Calendar, Plus, Trash2, Receipt } from "lucide-react"
import { AddExpenseDialog } from "@/components/add-expense-dialog"
import { AddRevenueDialog } from "@/components/add-revenue-dialog" // Importar o novo diálogo de receita
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUp } from "lucide-react" // Ícone para Receitas
import { FinancialSummaryChart } from "@/components/financial-summary-chart" // Importar o novo componente de resumo

interface BankAccount {
  id: string
  name: string
  balance: number
  url: string
  color: string
}

interface FinancialData {
  date: string
  total: number
  interpj: number
  asaas: number
}

interface Expense {
  id: string
  date: string
  description: string
  amount: number
  paymentMethod: "dinheiro" | "pix" | "cartao-credito" | "cartao-debito" | "transferencia"
  createdAt: string
}

interface Revenue {
  id: string
  date: string
  description: string
  amount: number
  source: "servico" | "investimento" | "outros"
  createdAt: string
}

const initialExpenses: Expense[] = [
  {
    id: "exp1",
    date: "2024-01-15",
    description: "Aluguel do escritório",
    amount: 3500.0,
    paymentMethod: "transferencia",
    createdAt: "2024-01-15",
  },
  {
    id: "exp2",
    date: "2024-01-10",
    description: "Material de escritório",
    amount: 450.75,
    paymentMethod: "cartao-credito",
    createdAt: "2024-01-10",
  },
  {
    id: "exp3",
    date: "2024-01-08",
    description: "Software de design",
    amount: 299.9,
    paymentMethod: "pix",
    createdAt: "2024-01-08",
  },
  {
    id: "exp4",
    date: "2024-01-05",
    description: "Combustível",
    amount: 180.0,
    paymentMethod: "cartao-debito",
    createdAt: "2024-01-05",
  },
]

const initialRevenues: Revenue[] = [
  {
    id: "rev1",
    date: "2024-01-20",
    description: "Pagamento Projeto ABC",
    amount: 12000.0,
    source: "servico",
    createdAt: "2024-01-20",
  },
  {
    id: "rev2",
    date: "2024-01-18",
    description: "Consultoria de Marketing",
    amount: 2500.0,
    source: "servico",
    createdAt: "2024-01-18",
  },
  {
    id: "rev3",
    date: "2024-01-12",
    description: "Rendimento de Investimento",
    amount: 500.0,
    source: "investimento",
    createdAt: "2024-01-12",
  },
]

const paymentMethodLabels = {
  dinheiro: "Dinheiro",
  pix: "PIX",
  "cartao-credito": "Cartão de Crédito",
  "cartao-debito": "Cartão de Débito",
  transferencia: "Transferência",
}

const revenueSourceLabels = {
  servico: "Serviço",
  investimento: "Investimento",
  outros: "Outros",
}

const bankAccounts: BankAccount[] = [
  {
    id: "interpj",
    name: "InterPJ",
    balance: 125430.5,
    url: "https://internetbanking.bancointer.com.br/",
    color: "bg-orange-500",
  },
  {
    id: "asaas",
    name: "Asaas",
    balance: 87650.25,
    url: "https://www.asaas.com/",
    color: "bg-blue-500",
  },
]

// Dados mockados para o gráfico - últimos 12 meses
const generateFinancialData = (): FinancialData[] => {
  const data: FinancialData[] = []
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  for (let i = 0; i < 12; i++) {
    const interpj = 80000 + Math.random() * 60000
    const asaas = 60000 + Math.random() * 40000
    data.push({
      date: months[i],
      total: interpj + asaas,
      interpj: interpj,
      asaas: asaas,
    })
  }

  return data
}

const financialData = generateFinancialData()

export default function FinancialPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("12m")
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses)
  const [revenues, setRevenues] = useState<Revenue[]>(initialRevenues) // Novo estado para receitas
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false)
  const [isAddRevenueDialogOpen, setIsAddRevenueDialogOpen] = useState(false) // Novo estado para diálogo de receita

  const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0)

  const getFilteredData = () => {
    switch (selectedPeriod) {
      case "3m":
        return financialData.slice(-3)
      case "6m":
        return financialData.slice(-6)
      case "12m":
        return financialData
      default:
        return financialData
    }
  }

  const handleAddExpense = (newExpense: Omit<Expense, "id" | "createdAt">) => {
    const expense: Expense = {
      ...newExpense,
      id: `exp${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setExpenses([expense, ...expenses])
  }

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId))
  }

  const handleAddRevenue = (newRevenue: Omit<Revenue, "id" | "createdAt">) => {
    const revenue: Revenue = {
      ...newRevenue,
      id: `rev${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setRevenues([revenue, ...revenues])
  }

  const handleDeleteRevenue = (revenueId: string) => {
    setRevenues(revenues.filter((revenue) => revenue.id !== revenueId))
  }

  const totalRevenues = revenues.reduce((sum, rev) => sum + rev.amount, 0)
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const netBalance = totalRevenues - totalExpenses

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
          <p className="text-muted-foreground">Acompanhe seus saldos e movimentações financeiras</p>
        </div>
      </div>

      {/* Cards de Saldos */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Saldo Total */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Soma de todas as contas</p>
          </CardContent>
        </Card>

        {/* Saldos por Banco */}
        {bankAccounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {account.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => window.open(account.url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {account.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className={`w-3 h-3 rounded-full ${account.color}`} />
                <p className="text-xs text-muted-foreground">
                  {((account.balance / totalBalance) * 100).toFixed(1)}% do total
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de Movimentação */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <CardTitle>Evolução dos Saldos</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">3 meses</SelectItem>
                  <SelectItem value="6m">6 meses</SelectItem>
                  <SelectItem value="12m">12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FinancialChart data={getFilteredData()} />
        </CardContent>
      </Card>

      {/* Resumo Estatístico */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Saldo</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {Math.max(...getFilteredData().map((d) => d.total)).toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">No período selecionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menor Saldo</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {Math.min(...getFilteredData().map((d) => d.total)).toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">No período selecionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média InterPJ</CardTitle>
            <div className="w-3 h-3 rounded-full bg-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R${" "}
              {(getFilteredData().reduce((sum, d) => sum + d.interpj, 0) / getFilteredData().length).toLocaleString(
                "pt-BR",
              )}
            </div>
            <p className="text-xs text-muted-foreground">Saldo médio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Asaas</CardTitle>
            <div className="w-3 h-3 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R${" "}
              {(getFilteredData().reduce((sum, d) => sum + d.asaas, 0) / getFilteredData().length).toLocaleString(
                "pt-BR",
              )}
            </div>
            <p className="text-xs text-muted-foreground">Saldo médio</p>
          </CardContent>
        </Card>
      </div>

      {/* Seções de Receitas e Despesas + Resumo Geral */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Seção de Receitas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-5 w-5 text-green-600" />
                  <CardTitle>Receitas Recentes</CardTitle>
                </div>
                <Button onClick={() => setIsAddRevenueDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Receita
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenues.length > 0 ? (
                      revenues.map((revenue) => (
                        <TableRow key={revenue.id}>
                          <TableCell>{new Date(revenue.date).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell className="font-medium">{revenue.description}</TableCell>
                          <TableCell className="text-right font-bold text-green-600">
                            R$ {revenue.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{revenueSourceLabels[revenue.source]}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:bg-red-100"
                              onClick={() => handleDeleteRevenue(revenue.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          Nenhuma receita registrada.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Despesas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  <CardTitle>Despesas Recentes</CardTitle>
                </div>
                <Button onClick={() => setIsAddExpenseDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Despesa
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Forma de Pagamento</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.length > 0 ? (
                      expenses.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{new Date(expense.date).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell className="font-medium">{expense.description}</TableCell>
                          <TableCell className="text-right font-bold text-red-600">
                            -R$ {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{paymentMethodLabels[expense.paymentMethod]}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:bg-red-100"
                              onClick={() => handleDeleteExpense(expense.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          Nenhuma despesa registrada.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Geral com Gráfico de Pizza */}
        <div className="lg:col-span-1">
          <FinancialSummaryChart totalRevenues={totalRevenues} totalExpenses={totalExpenses} netBalance={netBalance} />
        </div>
      </div>

      <AddExpenseDialog
        open={isAddExpenseDialogOpen}
        onOpenChange={setIsAddExpenseDialogOpen}
        onAddExpense={handleAddExpense}
      />
      <AddRevenueDialog
        open={isAddRevenueDialogOpen}
        onOpenChange={setIsAddRevenueDialogOpen}
        onAddRevenue={handleAddRevenue}
      />
    </div>
  )
}
