"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface FinancialSummaryChartProps {
  totalRevenues: number
  totalExpenses: number
  netBalance: number
}

const COLORS = ["#10b981", "#ef4444", "#3b82f6"] // Green for Revenue, Red for Expenses, Blue for Net Balance

export function FinancialSummaryChart({ totalRevenues, totalExpenses, netBalance }: FinancialSummaryChartProps) {
  const data = [
    { name: "Receitas", value: totalRevenues },
    { name: "Despesas", value: totalExpenses },
    { name: "Saldo Líquido", value: netBalance },
  ]

  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg text-sm">
          <p
            className="font-medium"
            style={{ color: payload[0].color }}
          >{`${payload[0].name}: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Resumo Geral</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-0">
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full p-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Receitas Totais</TableCell>
                <TableCell className="text-right font-bold text-green-600">{formatCurrency(totalRevenues)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Despesas Totais</TableCell>
                <TableCell className="text-right font-bold text-red-600">{formatCurrency(totalExpenses)}</TableCell>
              </TableRow>
              <TableRow className="bg-muted/50">
                <TableCell className="font-medium">Saldo Líquido</TableCell>
                <TableCell className={cn("text-right font-bold", netBalance >= 0 ? "text-blue-600" : "text-red-600")}>
                  {formatCurrency(netBalance)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
