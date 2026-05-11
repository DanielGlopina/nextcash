import Link from "next/link";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/data/getCategories";
import NewTransactionForm from "./new-transaction-form";
import PageContainer from "@/components/page-container";


async function NewTransactionPage() {
   const categories = await getCategories();

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
               <BreadcrumbLink asChild>
                  <Link href="/dashboard/transactions">
                     Transactions
                  </Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbPage>
                  New Transaction
               </BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
      <Card className="mt-4">
         <CardHeader>
            <CardTitle>New Transaction</CardTitle>
            <CardContent>
               <NewTransactionForm categories={categories} />
            </CardContent>
         </CardHeader>
      </Card>
   </PageContainer>;
}

export default NewTransactionPage;