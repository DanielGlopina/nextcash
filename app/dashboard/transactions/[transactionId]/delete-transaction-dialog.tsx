'use client';

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTransaction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



function DeleteTransactionDialog({
   transactionId,
   transactionDate
}: {
   transactionId: number,
   transactionDate: string,
}) {
   const router = useRouter();

   const handleDeleteConfirm = async () => {
      const result = await deleteTransaction(transactionId);

      if (result?.error) {
         toast.error('Error',
            {
               description: (<span className="text-black">{result.message}</span>)
            }
         )
         return;
      }

      toast.success('Success', {
         description: (<span className="text-black">Transaction deleted</span>)
      })

      const [year, month] = transactionDate.split("-");

      router.push(`/dashboard/transactions?month=${month}&year=${year}`)
   }

   return <AlertDialog>
      <AlertDialogTrigger asChild>
         <Button variant="destructive" size="icon">
            <Trash2 />
         </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
         <AlertDialogHeader>
            <AlertDialogTitle>
               Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
               This action cannot be undone. This transaction will be permanently deleted.
            </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
            <AlertDialogCancel>
               Cancel
            </AlertDialogCancel>
            <Button onClick={handleDeleteConfirm} variant="destructive">
               Delete
            </Button>
         </AlertDialogFooter>
      </AlertDialogContent>
   </AlertDialog>
}

export default DeleteTransactionDialog;