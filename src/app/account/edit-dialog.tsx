"use client";

import {
  updateTransaction,
  deleteTransaction,
} from "@/actions/TransactionUpdate";
import { getAccountGroups, updateAccount } from "@/actions/AccountAction";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";

import { useRouter } from "next/navigation";

interface Account {
  id: number;
  code: string;
  name: string;
  balance1: number;
  accountTypeId: number;
  accountGroupId: number;
  accountGroup2Id: number;
}

interface EditDialogProps {
  children: React.ReactNode;
  account: Account;
  onSuccess?: () => void;
}

// export function EditDialog({ children, account }: EditDialogProps) {
export function EditDialog({ children, account, onSuccess }: EditDialogProps) {
  const router = useRouter();

  // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  //const [formData, setFormData] = useState(transaction)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { toast }: any = useToast();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState(account.id);
  const balancedefault = 0; // Set default value for balance
  const [balance1, setBalance1] = useState<number>(account.balance1);
  // const [balance1, setBalance1] = useState<string>(account.balance1?.toString() || '0');

  const [accountGroups, setAccountGroups] = useState<
    { id: number; name: string }[]
  >([]);

  // update balance1 when account changes
  useEffect(() => {
    setBalance1(account.balance1);
  }, [account.balance1]);

  // lookup AccountGroup items
  useEffect(() => {
    const loadAccountGroups = async () => {
      try {
        const groups = await getAccountGroups();
        setAccountGroups(groups);
      } catch (error) {
        console.error("Failed to load account groups:", error);
      }
    };

    loadAccountGroups();
  }, []);


  async function handleFormAction(formData: FormData) {
    setIsSubmitting(true);
    formData.set("accountId", selectedAccountId.toString());
    const updatedFormData = new FormData();
    // Copy all existing form data
    Array.from(formData.entries()).forEach(([key, value]) => {
      updatedFormData.append(key, value);
    });
    // Explicitly set the accountId
    updatedFormData.set("accountId", selectedAccountId.toString());
    // updatedFormData.set("balance1", balance1.replace(/[^\d.-]/g, '')); // Remove currency formatting

    try {
      const result = await updateAccount(formData);

      if (!result || result.error) {
        toast({
          title: "Gagal",
          description:
            result?.error || "Terjadi kesalahan saat memperbarui akun",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(false);
      toast({
        title: "Berhasil",
        description: "Akun telah diperbarui",
        variant: "default",
      });

      setOpen(false);
      // router.refresh();
      // Call the success callback to refresh the table
      if (onSuccess) {
        onSuccess();
        // onSuccess(account.id);
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui Akun",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTransaction(account.id);
      // const result = { success: true, error }; // Mock result for testing

      if (!result || result.error) {
        toast({
          title: "Gagal",
          description: result?.error || "Terjadi kesalahan saat menghapus Akun",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Berhasil",
        description: "Akun telah dihapus",
        variant: "default",
      });

      setOpen(false);
      setShowDeleteAlert(false);
      //window.location.reload() // Temporary solution - better to use React state management
    } catch (error) {
      console.error("Error deleting Akun:", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menghapus Akun",
        variant: "destructive",
      });
    }
  };


  // Modify the cancel button handler
  const handleCancel = () => {
    setBalance1(account.balance1); // Reset to original value
    setOpen(false);
  };
 
  const numBalance = balance1 < 0
      ? -Math.abs(balance1)
      : Math.abs(balance1);
  
  // Format functions
  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  const parseFormattedNumber = (str: string) => {
    return Number(str.replace(/[^\d-]/g, ''));
  };
  

  //
  return ( 

    <>
      {/* <Dialog open={open} onOpenChange={setOpen}> */}
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setBalance1(account.balance1); // Reset when dialog closes
        }
        setOpen(isOpen);
        }}>
        
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>UBAH AKUN</DialogTitle>
          </DialogHeader>
          {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
          <form action={handleFormAction} className="space-y-4">
            <input type="hidden" name="id" value={account.id} />
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-left">
                  Kode
                </Label>
                <Input
                  id="code"
                  name="code"
                  defaultValue={account.code}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Nama
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={account.name}
                  className="col-span-3 dark:border-gray-600"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="balance1" className="text-left w-[100%]">
                  Saldo Awal
                </Label>
                <Input
                  id="balance1"
                  name="balance1"
                  // type="number"
                  type="text"
                  // inputMode="numeric"                  
                  prefix="Rp. "
                  // step="0.01"
                  // value={balance1}
                  // value={numBalance}
                  // value={numBalanceFormatted}
                  value={formatNumber(numBalance)}
                  // value={numBalance.toLocaleString('id-ID')} // Format the number with Indonesian locale
                  // onChange={(e) => setBalance1(Number(e.target.value))}
                  onChange={(e) => {
                    const rawValue = parseFormattedNumber(e.target.value);
                    setBalance1(rawValue);
                  }}
                  // onChange={(e) => {
                  //   // Remove non-numeric characters and parse the value
                  //   const value = e.target.value.replace(/[^\d-]/g, '');
                  //   setBalance1(Number(value));
                  // }}
                  className="col-span-3 dark:border-gray-600"
                />
              </div>
              
            </div>
            <div className="flex justify-between space-x-2">
              <Button
                disabled={true}
                variant="link"
                onClick={handleDeleteClick}
              >
                {<Trash2Icon />}
              </Button>
              {/* <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button> */}
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : "SIMPAN PERUBAHAN"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Alert before Delete */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan.
              <br />
              Transaksi ini akan dihapus secara permanen.
              <br />
              Akan berpengaruh pada posisi Saldo Akun.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
