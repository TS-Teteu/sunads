"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddContactDialog } from "@/components/add-contact-dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Contact {
  id: string
  name: string
  companyName: string
  phone: string
  origin: string // Ex: "Website", "Indicação", "Evento"
  projectType: "gestao-trafego" | "criacao-ia" | "outros" // Tipos de projeto
  createdAt: string
}

const initialContacts: Contact[] = [
  {
    id: "c1",
    name: "João Silva",
    companyName: "ABC Marketing",
    phone: "(11) 98765-4321",
    origin: "Indicação",
    projectType: "gestao-trafego",
    createdAt: "2023-05-10",
  },
  {
    id: "c2",
    name: "Maria Santos",
    companyName: "Tech Solutions",
    phone: "(21) 99876-5432",
    origin: "Website",
    projectType: "criacao-ia",
    createdAt: "2023-06-20",
  },
  {
    id: "c3",
    name: "Pedro Costa",
    companyName: "Loja Virtual Plus",
    phone: "(31) 97654-3210",
    origin: "Evento",
    projectType: "gestao-trafego",
    createdAt: "2023-07-01",
  },
  {
    id: "c4",
    name: "Ana Lima",
    companyName: "Consultoria Empresarial",
    phone: "(41) 96543-2109",
    origin: "Website",
    projectType: "criacao-ia",
    createdAt: "2023-08-15",
  },
  {
    id: "c5",
    name: "Carlos Mendes",
    companyName: "Restaurante Gourmet",
    phone: "(51) 95432-1098",
    origin: "Indicação",
    projectType: "outros",
    createdAt: "2023-09-05",
  },
  {
    id: "c6",
    name: "Fernanda Oliveira",
    companyName: "Clínica Médica Vida",
    phone: "(61) 94321-0987",
    origin: "Website",
    projectType: "criacao-ia",
    createdAt: "2023-10-12",
  },
]

const projectTypeLabels = {
  "gestao-trafego": "Gestão de Tráfego",
  "criacao-ia": "Criação de IA",
  outros: "Outros",
}

const projectTypeColors = {
  "gestao-trafego": "bg-blue-100 text-blue-800",
  "criacao-ia": "bg-purple-100 text-purple-800",
  outros: "bg-gray-100 text-gray-800",
}

export function ContactsView() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false)

  const handleAddContact = (newContact: Omit<Contact, "id" | "createdAt">) => {
    const contact: Contact = {
      ...newContact,
      id: `c${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setContacts([...contacts, contact])
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Contatos</h3>
          <p className="text-muted-foreground">Gerencie seus leads e clientes</p>
        </div>
        <Button onClick={() => setIsAddContactDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Contato
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Pesquisar cliente por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Contacts List Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contatos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nome</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead>Tipo de Projeto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.companyName}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.origin}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("text-xs", projectTypeColors[contact.projectType])}>
                          {projectTypeLabels[contact.projectType]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Nenhum contato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddContactDialog
        open={isAddContactDialogOpen}
        onOpenChange={setIsAddContactDialogOpen}
        onAddContact={handleAddContact}
      />
    </div>
  )
}
