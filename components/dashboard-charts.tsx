"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

const data = [
  {
    mes: "Jul",
    receita: 180000,
    vendas: 45000,
    clientes: 120,
    projetos: 15,
  },
  {
    mes: "Ago",
    receita: 195000,
    vendas: 48000,
    clientes: 125,
    projetos: 16,
  },
  {
    mes: "Set",
    receita: 210000,
    vendas: 52000,
    clientes: 132,
    projetos: 17,
  },
  {
    mes: "Out",
    receita: 225000,
    vendas: 49000,
    clientes: 138,
    projetos: 19,
  },
  {
    mes: "Nov",
    receita: 235000,
    vendas: 51000,
    clientes: 140,
    projetos: 18,
  },
  {
    mes: "Dez",
    receita: 245890,
    vendas: 54320,
    clientes: 142,
    projetos: 18,
  },
]

export function DashboardCharts() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="mes" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === "receita" || name === "vendas") {
              return [`R$ ${Number(value).toLocaleString("pt-BR")}`, name === "receita" ? "Receita" : "Vendas"]
            }
            return [value, name === "clientes" ? "Clientes" : "Projetos"]
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="receita" stroke="#8884d8" strokeWidth={2} name="Receita" />
        <Line type="monotone" dataKey="vendas" stroke="#82ca9d" strokeWidth={2} name="Vendas" />
      </LineChart>
    </ResponsiveContainer>
  )
}
