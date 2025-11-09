"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface AccountRow {
  id: number
  code: string
  name: string
  accountType: { id: number; name: string }
  accountGroup: { id: number; name: string }
  accountGroup2: { id: number; name: string }
  balance1: number
  createdAt: string
}

export const createAccountColumns = (
  onEdit: (account: AccountRow) => void,
  onDelete: (id: number) => void,
): ColumnDef<AccountRow>[] => [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Code
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "accountType.name",
    header: "Account Type",
    cell: ({ row }) => row.original.accountType.name,
  },
  {
    accessorKey: "accountGroup.name",
    header: "Account Group",
    cell: ({ row }) => row.original.accountGroup.name,
  },
  {
    accessorKey: "accountGroup2.name",
    header: "Account Group 2",
    cell: ({ row }) => row.original.accountGroup2.name,
  },
  {
    accessorKey: "balance1",
    header: "Balance",
    cell: ({ row }) => {
      const balance = Number.parseFloat(row.getValue("balance1"))
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(balance)
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(row.original)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(row.original.id)} className="text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
