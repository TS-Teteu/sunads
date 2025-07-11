"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Campaign A", throughput: 4.5 },
  { name: "Campaign B", throughput: 3.8 },
  { name: "Campaign C", throughput: 5.2 },
  { name: "Campaign D", throughput: 2.9 },
  { name: "Campaign E", throughput: 3.5 },
]

export function ThroughputChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} days`}
        />
        <Tooltip />
        <Bar dataKey="throughput" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
