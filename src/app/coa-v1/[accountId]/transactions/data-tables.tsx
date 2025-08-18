"use client"

import React, { useEffect, useState, useCallback } from "react"
import { ArrowLeft, ArrowRight, ChevronDown, ArrowLeftToLine, ArrowRightToLine } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PaginationInfo } from "@/components/PaginationInfo"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [totalDebit, setTotalDebit] = useState<number>(0);
    const [totalCredit, setTotalCredit] = useState<number>(0);
    const [totalBalance, setBalance] = useState<number>(0);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // Wrap calculateTotals in useCallback
    const calculateTotals = useCallback((rows: any[]) => {
        const totals = rows.reduce((acc, row) => {
            return {
                debit: acc.debit + (Number(row.original.debit) || 0),
                credit: acc.credit + (Number(row.original.credit) || 0)
            };
        }, { debit: 0, credit: 0 });

        setTotalDebit(totals.debit);
        setTotalCredit(totals.credit);
        setBalance(totals.debit - totals.credit);
    }, [setTotalDebit, setTotalCredit, setBalance]);

    useEffect(() => {
        calculateTotals(table.getFilteredRowModel().rows);
    }, [calculateTotals, table]);

    return (
        <>


            {/* TOTAL  */}

            <div className="ml-auto flex gap-4 mr-4">
                <div className="text-xl">
                    <span className="font-semibold">Total Debit: </span>

                    <span className="font-bold text-orange-500">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(totalDebit)}
                    </span>

                </div>
                <div className="text-xl">
                    <span className="font-semibold">Total Kredit: </span>

                    <span className="font-bold text-orange-500">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(totalCredit)}
                    </span>

                </div>
                <div className="text-xl">
                    <span className="font-semibold">Total Saldo: </span>

                    <span className="font-bold text-orange-500">
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                        }).format(totalBalance)}
                    </span>
                </div>
            </div>

            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Filter Ref ...."
                    value={(table.getColumn("ref")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("ref")?.setFilterValue(event.target.value)
                    }
                    className="w-[140px]"
                />

                <Input
                    placeholder="Filter Uraian ...."
                    value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("description")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                    <PaginationInfo 
                        totalRows={table.getFilteredRowModel().rows.length} 
                        pageIndex={table.getState().pagination.pageIndex}
                        pageSize={table.getState().pagination.pageSize}
                    />
            
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <ArrowLeftToLine className="mr-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                      >
                        <ArrowRightToLine className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
        </>
    )
}