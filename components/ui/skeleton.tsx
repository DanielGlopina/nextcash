import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-muted",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-[min(55%,20rem)]",
          "bg-gradient-to-r from-transparent via-foreground/[0.055] to-transparent",
          "dark:via-foreground/[0.09]",
          "motion-safe:animate-[skeleton-shimmer_1.85s_ease-in-out_infinite]",
          "motion-reduce:animate-none"
        )}
      />
    </div>
  )
}

export { Skeleton }
