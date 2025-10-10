'use client'

import { ColumnDef } from "@tanstack/react-table"

//
export type Account = {
    id: number
    code: string
    name: string
    accountType: string
    accountGroup: {
        id: number
        name: string
    }
    accountGroup2: {
        id: number
        name: string
    }
    balance: number

}

//
export const columns: ColumnDef<Account>[] = [

    {
        accessorKey: "name",
        header: () => null,
        cell: ({ row }) => {
            return <div className="text-left text-[0.9em] truncate w-[80%]">
                {row.original.name}
            </div>;
        },
        enableSorting: true,
    },


]