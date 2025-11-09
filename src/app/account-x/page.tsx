"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"
import { AccountDataTable } from "@/components/accounts/account-data-table"
import { AccountFormModal } from "@/components/accounts/account-form-modal"
import { createAccountColumns, type AccountRow } from "@/components/accounts/account-columns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const ITEMS_PER_PAGE = 10

export default function AccountsPage() {
  const { toast } = useToast()
  const [accounts, setAccounts] = useState<AccountRow[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<AccountRow | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const fetchAccounts = useCallback(
    async (page: number, search: string) => {
      setLoading(true)
      try {
        const skip = page * ITEMS_PER_PAGE
        const params = new URLSearchParams({
          skip: skip.toString(),
          take: ITEMS_PER_PAGE.toString(),
          ...(search && { search }),
        })

        const response = await fetch(`/api/accounts?${params}`)
        if (!response.ok) throw new Error("Failed to fetch accounts")

        const data = await response.json()
        setAccounts(data.accounts)
        setTotalItems(data.total)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load accounts",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  useEffect(() => {
    setCurrentPage(0)
    fetchAccounts(0, searchQuery)
  }, [searchQuery, fetchAccounts])

  useEffect(() => {
    if (currentPage > 0) {
      fetchAccounts(currentPage, searchQuery)
    }
  }, [currentPage, fetchAccounts, searchQuery])

  const handleEdit = (account: AccountRow) => {
    setSelectedAccount(account)
    setFormModalOpen(true)
  }

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/accounts/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete account")

      toast({
        title: "Success",
        description: "Account deleted successfully",
      })

      setDeleteDialogOpen(false)
      setDeleteId(null)
      fetchAccounts(currentPage, searchQuery)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete account",
        variant: "destructive",
      })
    }
  }

  const handleAddNew = () => {
    setSelectedAccount(null)
    setFormModalOpen(true)
  }

  const handleFormSuccess = () => {
    setCurrentPage(0)
    fetchAccounts(0, searchQuery)
  }

  const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const columns = createAccountColumns(handleEdit, handleDeleteClick)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
            <p className="text-muted-foreground mt-2">Manage your accounts with full CRUD operations</p>
          </div>
          <Button onClick={handleAddNew} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Account
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account List</CardTitle>
          </CardHeader>
          <CardContent>
            <AccountDataTable
              columns={columns}
              data={accounts}
              onSearch={setSearchQuery}
              isLoading={loading}
              pageCount={pageCount}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
            />
          </CardContent>
        </Card>
      </div>

      <AccountFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        account={selectedAccount}
        onSuccess={handleFormSuccess}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this account? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
