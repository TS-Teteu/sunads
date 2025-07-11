"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Nov 24", value: 45000 },
  { month: "Dez 24", value: 52000 },
  { month: "Jan 25", value: 48000 },
  { month: "Fev 25", value: 61407 },
  { month: "Mar 25", value: 58000 },
  { month: "Abr 25", value: 62000 },
]

export function TicketMedioChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={10} />
        <YAxis hide />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
