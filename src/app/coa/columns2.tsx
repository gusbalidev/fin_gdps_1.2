'use client'

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
//import { EditDialog } from "./edit-dialog"
import { Button } from "@/components/ui/button"
import { EditDialog2 } from "./edit-dialog2"
import { PencilIcon } from "lucide-react";
//import AccountDialog from "./AccountDialog"

// export type Account = {
//     id: number
//     code: string
//     name: string
//     accountType: { name: string, id: string  } 
//     accountGroup: { name: string, id: string } 
//     accountGroup2: { name: string, id: string } 
//     balance: number
// }

export type Account = {
    id: number
    code: string
    name: string
    balance1: number
    accountType: { 
        id: string
        name: string 
    }
    accountGroup: { 
        id: string
        name: string 
    }
    accountGroup2: { 
        id: string
        name: string 
    }
    accountTypeId: number
    accountGroupId: number
    accountGroup2Id: number
    balance: number
}

// export const columns2: ColumnDef<Account>[] = [
// export const columns = (refreshData: () => void): ColumnDef<Account>[] => [
// export const columns = (refreshData: (editedId: number) => void): ColumnDef<Account>[] => [
export const columns = (
        refreshData: (editedId: number) => void, 
        highlightedId: number | null
    ): ColumnDef<Account>[] => [

    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },

    {
        id: "id",
        accessorKey: "accountId",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.id}</div>;
        },
        enableSorting: true,
    },
    {
        id: "code",
        accessorKey: "code",
        // header: () => <div className="text-left">Kode</div>,
        // cell: ({ row }) => {
        //     return <div className="text-left">
        //         {row.original.code}
        //         {/* <EditDialog transaction={row.original}>
        //             <Button variant="custom1" size="custom1">
        //                 {row.original.code}
        //             </Button>
        //         </EditDialog> */}
        //     </div>;
        // },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-left"
                >
                    Kode
                    {column.getIsSorted() === "asc" ? " ↑" : column.getIsSorted() === "desc" ? " ↓" : ""}
                </Button>
            )
        },
        cell: ({ row }) => {
            const isHighlighted = row.original.id === highlightedId;
            return (
                <div className={`text-left w-[100%] ${
                    isHighlighted ? "bg-slate-700 transition-colors duration-1000" : ""
                }`}>
                    {row.original.code}
                </div>
            );
        },
        enableSorting: true,
        filterFn: "includesString",
    },
    {
        id: "nama-akun",
        accessorKey: "name",
        header: () => <div className="text-left w-[100%]">Nama</div>,
        cell: ({ row }) => {
            const isHighlighted = row.original.id === highlightedId;
            return <div className="text-left w-[100%]">
                <Link
                    href={`/coa/${row.original.id}/transactions`}
                    className="text-blue-600 hover:underline"
                >
                    {row.original.name}
                </Link>
            </div>;
        },
        enableSorting: true,
    },
    {
        id: "id-group",
        accessorKey: "accountGroup.code",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.accountGroup.id}</div>;
        },
        enableSorting: true,
    },
    {
        id: "nama-group",
        accessorKey: "accountGroup.name",
        header: "Grup",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountGroup.name}</div>;
        },
        enableSorting: true,
    },
    {
        id: "id-group2",
        accessorKey: "accountGroup2.code",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.accountGroup2.id}</div>;
        },
        enableSorting: true,
    },
    {
        id: "nama-group2",
        accessorKey: "accountGroup2.name",
        header: "Grup 2",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountGroup2.name}</div>;
        },
        enableSorting: true,
    },
    {
        id: "id-tipe",
        accessorKey: "accountType.id",
        header: () => <div className="text-right w-[100%]">id</div>,
        cell: ({ row }) => {
            return <div className="text-right w-[100%]">{row.original.accountType.id}</div>;
        },
        enableSorting: true,
    },
    {
        id: "nama-tipe",
        accessorKey: "accountType.name",
        header: "Tipe",
        cell: ({ row }) => {
            return <div className="text-left w-[100%]">{row.original.accountType.name}</div>;
        },
        enableSorting: true,
    },
    {
        id: "saldo-berjalan",
        accessorKey: "balance",
        header: () => <div className="text-right w-[100%]">Saldo Berjalan</div>,
        cell: ({ row }) => {
            const balance = row.original.balance;
            const positiveBalance = Math.abs(balance);
            return <div className="text-right w-[100%]">Rp. {positiveBalance.toLocaleString()}</div>;
        },
        enableSorting: true,
    },
    // {
    //     accessorKey: "balance1",
    //     header: () => <div className="text-right w-[100%]">Saldo Awal</div>,
    //     cell: ({ row }) => {
    //         // const balance = row.original.balance;
    //         const balance = 0;
    //         const positiveBalance = Math.abs(balance);
    //         return <div className="text-right w-[100%]">Rp. {positiveBalance.toLocaleString()}</div>;
    //     },
    //     enableSorting: true,
    // },
    {
        id: "saldo-awal",
        accessorKey: "balance1",
        header: () => <div className="text-right w-[100%]">Saldo Awal</div>,
        cell: ({ row }) => {
            const balance1 = row.original.balance1;
            const positiveBalance = Math.abs(balance1);
            // const trueBalance = row.original.balance1;
            if (balance1 < 0) {
                return <div className="text-right w-[100%]">(Rp. {positiveBalance.toLocaleString()})</div>;
            }
            return <div className="text-right w-[100%]">Rp. 
                {/* {positiveBalance.toLocaleString()} */}
                {positiveBalance.toLocaleString()}
                </div>;
        },
        enableSorting: true,
    },
    {
            id: "action",
            cell: ({ row }) => {
                return (
                    <div className="text-right">
                        {/* <EditDialog2 
                            account={row.original} onSuccess={refreshData}> */}
                        <EditDialog2 
                        account={row.original} 
                        onSuccess={() => refreshData(row.original.id)}
                        >
                            <Button variant="ghost" size="icon">
                                <PencilIcon />
                            </Button>
                        </EditDialog2>
                    </div>
                )
            },
        },

]