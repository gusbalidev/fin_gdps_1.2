'use client'

import { ColumnDef } from "@tanstack/react-table"

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
    //accountGroup: string
    //accountGroup2: string
    balance: number

}


export const columns: ColumnDef<Account>[] = [
    
    {
        accessorKey: "balance",
        header: () => <div className="text-right text-[1em]">Saldo</div>,
        cell: ({ row }) => {
            //const balance = row.original.balance;
            const balance = Math.abs(row.original.balance);
            return <div className="text-right">Rp. {balance.toLocaleString()}</div>;
        },
        enableSorting: true,
    },


]