import PageContainer from "@/components/page-container";
import {
   TransactionBreadcrumbSkeleton,
   TransactionFormFieldsSkeleton,
} from "@/components/skeletons/transaction-loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
   return (
      <PageContainer className="py-6 sm:py-10">
         <span className="sr-only">Loading new transaction</span>

         <TransactionBreadcrumbSkeleton />

         <div
            className="bg-zinc-200 mt-4 flex flex-col gap-1 overflow-hidden rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10"
            aria-busy="true"
         >
            <Skeleton className="h-7 w-44 rounded-md sm:h-8 sm:w-52" />
            <TransactionFormFieldsSkeleton />
         </div>
      </PageContainer>
   );
}
