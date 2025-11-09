"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { AccountRow } from "./account-columns"

interface LookupData {
  accountTypes: { id: number; name: string }[]
  accountGroups: { id: number; name: string }[]
  accountGroup2s: { id: number; name: string }[]
}

interface AccountFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account?: AccountRow | null
  onSuccess: () => void
}

export function AccountFormModal({ open, onOpenChange, account, onSuccess }: AccountFormModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [lookupData, setLookupData] = useState<LookupData | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    accountTypeId: "",
    accountGroupId: "",
    accountGroup2Id: "",
    balance1: "0",
  })

  useEffect(() => {
    if (open && !lookupData) {
      fetchLookupData()
    }
  }, [open])

  useEffect(() => {
    if (account) {
      setFormData({
        code: account.code,
        name: account.name,
        accountTypeId: account.accountType.id.toString(),
        accountGroupId: account.accountGroup.id.toString(),
        accountGroup2Id: account.accountGroup2.id.toString(),
        balance1: account.balance1.toString(),
      })
    } else {
      setFormData({
        code: "",
        name: "",
        accountTypeId: "",
        accountGroupId: "",
        accountGroup2Id: "",
        balance1: "0",
      })
    }
  }, [account, open])

  const fetchLookupData = async () => {
    try {
      const response = await fetch("/api/lookup")
      if (!response.ok) throw new Error("Failed to fetch lookup data")
      const data = await response.json()
      setLookupData(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load lookup data",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = account ? `/api/accounts/${account.id}` : "/api/accounts"
      const method = account ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save account")
      }

      toast({
        title: "Success",
        description: account ? "Account updated successfully" : "Account created successfully",
      })

      onOpenChange(false)
      onSuccess()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save account",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{account ? "Edit Account" : "Add New Account"}</DialogTitle>
          <DialogDescription>
            {account ? "Update the account details below" : "Fill in the details to create a new account"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="e.g., ACC001"
              required
              disabled={loading || !!account}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Account name"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountTypeId">Account Type</Label>
            <Select
              value={formData.accountTypeId}
              onValueChange={(value) => setFormData({ ...formData, accountTypeId: value })}
              disabled={loading}
            >
              <SelectTrigger id="accountTypeId">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                {lookupData?.accountTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountGroupId">Account Group</Label>
            <Select
              value={formData.accountGroupId}
              onValueChange={(value) => setFormData({ ...formData, accountGroupId: value })}
              disabled={loading}
            >
              <SelectTrigger id="accountGroupId">
                <SelectValue placeholder="Select account group" />
              </SelectTrigger>
              <SelectContent>
                {lookupData?.accountGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountGroup2Id">Account Group 2</Label>
            <Select
              value={formData.accountGroup2Id}
              onValueChange={(value) => setFormData({ ...formData, accountGroup2Id: value })}
              disabled={loading}
            >
              <SelectTrigger id="accountGroup2Id">
                <SelectValue placeholder="Select account group 2" />
              </SelectTrigger>
              <SelectContent>
                {lookupData?.accountGroup2s.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="balance1">Balance</Label>
            <Input
              id="balance1"
              type="number"
              step="0.01"
              value={formData.balance1}
              onChange={(e) => setFormData({ ...formData, balance1: e.target.value })}
              placeholder="0.00"
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : account ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
