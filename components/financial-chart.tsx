"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

interface FinancialData {
  date: string
  total: number
  interpj: number
  asaas: number
}

interface FinancialChartProps {
  data: FinancialData[]
}

export function FinancialChart({ data }: FinancialChartProps) {
  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#10b981"
          strokeWidth={3}
          name="Total"
          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="interpj"
          stroke="#f97316"
          strokeWidth={2}
          name="InterPJ"
          dot={{ fill: "#f97316", strokeWidth: 2, r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="asaas"
          stroke="#3b82f6"
          strokeWidth={2}
          name="Asaas"
          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
