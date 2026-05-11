import {
   TransactionEditCardHeaderSkeleton,
   TransactionFormFieldsSkeleton,
} from "@/components/skeletons/transaction-loading-skeletons";

export default function Loading() {
   return (
      <div
         className="bg-zinc-200 mt-4 flex flex-col gap-4 overflow-hidden rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10"
         aria-busy="true"
      >
         <span className="sr-only">Loading transaction</span>

         <TransactionEditCardHeaderSkeleton />
         <TransactionFormFieldsSkeleton />
      </div>
   );
}
