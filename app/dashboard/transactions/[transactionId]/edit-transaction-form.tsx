'use client';

import type { Category } from "@/types/Category";
import z from "zod";
import { toast } from "sonner";

import TransactionForm, { transactionFormSchema } from "@/components/transaction-form";
import { useRouter } from "next/navigation";
import { updateTransaction } from "./actions";
import { format } from "date-fns";


function EditTransactionForm({
   categories,
   transaction,
}: {
   categories: Category[],
   transaction: {
      id: number,
      categoryId: number,
      amount: string,
      description: string,
      transactionDate: string,
   }
}) {
   const router = useRouter();

   const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
      const result = await updateTransaction({
         id: transaction.id,
         amount: data.amount,
         description: data.description,
         categoryId: data.categoryId,
         transactionDate: format(data.transactionDate, 'yyyy-MM-dd')
      });

      if (result?.error) {
         toast.error('Error was occured', {
            description: (<span className="text-black">{result.message}</span>),
         })
         return;
      }

      toast.success('Transation edited!');

      router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`);

   }

   return (
      <TransactionForm defaultValues={{
         amount: Number(transaction.amount),
         categoryId: transaction.categoryId,
         description: transaction.description,
         transactionDate: new Date(transaction.transactionDate),
         transactionType: categories.find(category => category.id === transaction.categoryId)?.type ?? 'income',
      }} onSubmit={handleSubmit} categories={categories} />
   );
}

export default EditTransactionForm;