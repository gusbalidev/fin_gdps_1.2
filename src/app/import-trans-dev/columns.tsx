"use client"

import { ColumnDef } from "@tanstack/react-table"

// Add a type for your CSV data
export type CsvData = {
  [key: string]: string
}

export function createColumns(headers: string[]): ColumnDef<CsvData>[] {
  return headers.map((header) => ({
    accessorKey: header,
    header: header,
    cell: ({ row }) => {
      const value = row.getValue(header) as string
      return <div className="font-medium">{value}</div>
    },
  }))
}