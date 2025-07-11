"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LeadsOriginTableProps {
  period: "month" | "year"
}

const leadsData = {
  month: [
    { canal: "Google", icon: "🔍", leads: 0, convertidos: 0, valor: 0 },
    { canal: "Facebook", icon: "📘", leads: 0, convertidos: 0, valor: 0 },
    { canal: "Instagram", icon: "📷", leads: 0, convertidos: 0, valor: 0 },
    { canal: "Site da agência", icon: "🌐", leads: 0, convertidos: 0, valor: 0 },
    { canal: "Formulário (NAMTAB)", icon: "📝", leads: 0, convertidos: 0, valor: 0 },
    { canal: "Indicação", icon: "👥", leads: 0, convertidos: 0, valor: 0 },
    { canal: "Visita ao estabelecimento", icon: "🏢", leads: 0, convertidos: 0, valor: 0 },
    { canal: "Evento", icon: "🎪", leads: 0, convertidos: 0, valor: 0 },
  ],
  year: [
    { canal: "Google", icon: "🔍", leads: 45, convertidos: 12, valor: 125000 },
    { canal: "Facebook", icon: "📘", leads: 38, convertidos: 8, valor: 89000 },
    { canal: "Instagram", icon: "📷", leads: 29, convertidos: 6, valor: 67000 },
    { canal: "Site da agência", icon: "🌐", leads: 22, convertidos: 5, valor: 45000 },
    { canal: "Formulário (NAMTAB)", icon: "📝", leads: 18, convertidos: 4, valor: 38000 },
    { canal: "Indicação", icon: "👥", leads: 35, convertidos: 15, valor: 180000 },
    { canal: "Visita ao estabelecimento", icon: "🏢", leads: 12, convertidos: 3, valor: 25000 },
    { canal: "Evento", icon: "🎪", leads: 8, convertidos: 2, valor: 15000 },
  ],
}

export function LeadsOriginTable({ period }: LeadsOriginTableProps) {
  const data = leadsData[period]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Canal</TableHead>
            <TableHead className="text-center">Leads</TableHead>
            <TableHead className="text-center">Convertidos</TableHead>
            <TableHead className="text-right">Valor R$</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.canal}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.canal}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">{item.leads}</TableCell>
              <TableCell className="text-center">{item.convertidos}</TableCell>
              <TableCell className="text-right">
                {item.valor > 0 ? `R$ ${item.valor.toLocaleString("pt-BR")}` : "R$ 0"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
