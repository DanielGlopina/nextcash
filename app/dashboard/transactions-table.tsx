import { format } from "date-fns";
import numeral from "numeral";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";


type Transaction = {
   id: number;
   description: string;
   amount: string;
   transactionDate: string;
   category: string | null;
   transactionType: "income" | "expense" | null;
}


function TransactionsTable({ transactions, hasEditBtn }: {
   transactions: Transaction[],
   hasEditBtn: boolean,
}) {
   return (
      <>
         <div className="mt-4 space-y-3 md:hidden">
            {transactions.map((transaction) => (
               <div
                  key={transaction.id}
                  className="rounded-xl border bg-card text-card-foreground p-4"
               >
                  <div className="flex items-start justify-between gap-3">
                     <div className="min-w-0">
                        <div className="font-medium leading-tight truncate">
                           {transaction.description}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                           {format(transaction.transactionDate, "do MMM yyyy")}
                           {transaction.category ? ` • ${transaction.category}` : null}
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        {hasEditBtn && (
                           <Button
                              variant="outline"
                              asChild
                              size="icon"
                              aria-label="Edit Transaction"
                           >
                              <Link href={`/dashboard/transactions/${transaction.id}`}>
                                 <PencilIcon />
                              </Link>
                           </Button>
                        )}
                     </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                     <Badge
                        className={cn(
                           "capitalize",
                           transaction.transactionType === "income"
                              ? "bg-lime-500"
                              : "bg-orange-500"
                        )}
                     >
                        {transaction.transactionType}
                     </Badge>
                     <div className="text-base font-semibold tabular-nums">
                        ${numeral(transaction.amount).format("0,0[.]00")}
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div className="hidden md:block">
            <Table className="mt-4">
               <TableHeader>
                  <TableRow>
                     <TableHead>Date</TableHead>
                     <TableHead>Description</TableHead>
                     <TableHead>Type</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>Amount</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {transactions.map((transaction) => (
                     <TableRow key={transaction.id}>
                        <TableCell>{format(transaction.transactionDate, "do MMM yyyy")}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell className="capitalize">
                           <Badge className={transaction.transactionType === 'income' ? "bg-lime-500" : 'bg-orange-500'}>
                              {transaction.transactionType}
                           </Badge>
                        </TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>${numeral(transaction.amount).format("0,0[.]00")}</TableCell>

                        {hasEditBtn && (
                           <TableCell className="text-right">
                              <Button variant="outline" asChild size="icon" aria-label="Edit Transaction">
                                 <Link href={`/dashboard/transactions/${transaction.id}`}>
                                    <PencilIcon />
                                 </Link>
                              </Button>
                           </TableCell>
                        )}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </>
   );
}

export default TransactionsTable;