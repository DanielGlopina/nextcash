import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecentTransactions } from "@/data/getRecentTransactions";
import Link from "next/link";
import TransactionsTable from "./transactions-table";

async function RecentTransactions() {
   const recentTransactions = await getRecentTransactions();

   return <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
         <CardTitle>
            <span>Recent Transactions</span>
         </CardTitle>

         <div className="flex flex-row flex-wrap items-center gap-2">
            <Button asChild variant="outline">
               <Link href="/dashboard/transactions">View All</Link>
            </Button>

            <Button asChild>
               <Link href="/dashboard/transactions/new">Create New</Link>
            </Button>
         </div>
      </CardHeader>
      <CardContent>
         {!recentTransactions?.length &&
            <p className="text-center py-10 text-lg text-muted-foreground">
               You have no transactions yet. Start by hitting &quot;Create New&quot; to create your first transaction
            </p>
         }

         {!!recentTransactions?.length &&
            <TransactionsTable transactions={recentTransactions} hasEditBtn={false} />
         }
      </CardContent>
   </Card>;
}

export default RecentTransactions;