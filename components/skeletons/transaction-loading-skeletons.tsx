import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function FormFieldSkeleton({ labelClassName }: { labelClassName?: string }) {
  return (
    <div className="space-y-2">
      <Skeleton
        className={cn("h-3.5 w-[5.5rem] rounded-sm bg-muted/70 sm:w-24", labelClassName)}
      />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

/** Соответствует `BreadcrumbList`: flex, gap-1.5, разделители ChevronRight. */
export function TransactionBreadcrumbSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <nav
      aria-hidden
      className={cn(className)}
      data-slot="breadcrumb-skeleton"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li className="inline-flex items-center gap-1">
          <Skeleton className="h-4 w-[4.75rem] rounded-sm sm:w-24" />
        </li>
        <li className="inline-flex items-center" role="presentation">
          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/35" />
        </li>
        <li className="inline-flex items-center gap-1">
          <Skeleton className="h-4 w-[6.75rem] rounded-sm sm:w-[7.25rem]" />
        </li>
        <li className="inline-flex items-center" role="presentation">
          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/35" />
        </li>
        <li className="inline-flex min-w-0 max-w-full items-center gap-1">
          <Skeleton className="h-4 w-[min(100%,10.5rem)] rounded-sm sm:w-36" />
        </li>
      </ol>
    </nav>
  );
}

/**
 * Тело формы как в `TransactionForm`: два fieldset по 2 колонки (sm+),
 * затем description и submit.
 */
export function TransactionFormFieldsSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)} aria-hidden>
      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2">
        <FormFieldSkeleton />
        <FormFieldSkeleton labelClassName="w-28 sm:w-32" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2">
        <FormFieldSkeleton labelClassName="w-[7.5rem] sm:w-36" />
        <FormFieldSkeleton labelClassName="w-16 sm:w-20" />
      </div>

      <div className="mt-4 flex flex-col gap-5">
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-28 rounded-sm bg-muted/70 sm:w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="mt-4 h-10 w-full rounded-md" />
      </div>
    </div>
  );
}

/** Заголовок карточки редактирования: заголовок + зона кнопки (адаптив как `CardTitle`). */
export function TransactionEditCardHeaderSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      aria-hidden
    >
      <Skeleton className="h-7 w-[11rem] rounded-md sm:h-8 sm:w-48" />
      <Skeleton className="h-9 w-full rounded-md sm:ml-4 sm:w-[8.75rem] sm:shrink-0" />
    </div>
  );
}
