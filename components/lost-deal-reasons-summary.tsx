"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { XCircle } from "lucide-react"
import type { Deal } from "@/components/commercial-page" // Importar Deal do CommercialPage

interface LostDealReasonsSummaryProps {
  deals: Deal[]
}

export function LostDealReasonsSummary({ deals }: LostDealReasonsSummaryProps) {
  const lostDeals = deals.filter((deal) => deal.stage === "perdido") // Filtrar por 'perdido'

  const reasonCounts: { [key: string]: number } = {}
  lostDeals.forEach((deal) => {
    if (deal.reasonForLoss) {
      reasonCounts[deal.reasonForLoss] = (reasonCounts[deal.reasonForLoss] || 0) + 1
    }
  })

  const sortedReasons = Object.entries(reasonCounts).sort(([, countA], [, countB]) => countB - countA)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-500" />
          Motivos de Negócios Perdidos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Motivo</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedReasons.length > 0 ? (
                sortedReasons.map(([reason, count]) => (
                  <TableRow key={reason}>
                    <TableCell className="font-medium">{reason}</TableCell>
                    <TableCell className="text-right">{count}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                    Nenhum negócio perdido registrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
