import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import z from "zod";
import { format } from "date-fns";
import { getTransactionsByMonth } from "@/data/getTransactionsByMonth";
import Filters from "./filters";
import { getTransactionYearsRange } from "@/data/getTransactionYearsRange";
import TransactionsTable from "../transactions-table";
import PageContainer from "@/components/page-container";

const today = new Date();

const searchSchema = z.object({
   year: z.coerce
      .number()
      .min(today.getFullYear() - 100)
      .max(today.getFullYear() + 1).catch(today.getFullYear()),
   month: z.coerce.number().min(1).max(12).catch(today.getMonth() + 1)
})

async function TransactionsPage({
   searchParams
}: {
   searchParams: Promise<{ year?: string; month?: string }>
}) {
   const searchParamsValues = await searchParams;

   const { month, year } = searchSchema.parse(searchParamsValues);

   const selectedDate = new Date(year, month - 1, 1);

   const transactions = await getTransactionsByMonth({ month, year });

   const yearsRange = await getTransactionYearsRange();


   return <PageContainer className="py-6 sm:py-10">
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/dashboard">
                     Dashboard
                  </Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>
                  Transactions
               </BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4">
         <CardHeader>
            <CardTitle className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <span className="leading-tight">
                  {format(selectedDate, "MMM yyyy")} Transactions
               </span>
               <div className="w-full sm:w-auto">
                  <Filters year={year} month={month} yearsRange={yearsRange} />
               </div>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <Button asChild>
               <Link href="/dashboard/transactions/new">New Transaction</Link>
            </Button>


            {!transactions?.length &&
               <p className="text-center py-10 text-lg text-muted-foreground">
                  There are no transactions for selected month
               </p>
            }

            {!!transactions?.length &&
               <TransactionsTable transactions={transactions} hasEditBtn={true} />
            }
         </CardContent>
      </Card >
   </PageContainer>;
}

export default TransactionsPage;