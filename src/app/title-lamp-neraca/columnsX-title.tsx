'use client'

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

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
        accessorKey: "name",
        // header: () => <div className="text-left text-[1.2em]">Akun</div>,
        header: () => null,
        cell: ({ row }) => {
            return <div className="text-left text-[0.9em] truncate w-[80%]">
                {/* <Link
                    href={`/coa/${row.original.id}/transactions`}
                    className="text-blue-600 hover:underline"
                >
                    {row.original.name}
                </Link> */}

                {row.original.name}
            </div>;
        },
        enableSorting: true,
    },


    // {
    //     accessorKey: "balance",
    //     // header: () => <div className="text-right text-[1.2em]">Saldo</div>,
    //     header: () => null,
    //     cell: ({ row }) => {
    //         //const balance = row.original.balance;
    //         const balance = Math.abs(row.original.balance);
    //         return <div className="text-right  text-gray-700 dark:text-gray-400 ">Rp. {balance.toLocaleString()}</div>;
    //         return <div className="text-right ">Rp. {balance.toLocaleString()}</div>;
    //     },
    //     enableSorting: true,
    // },



]