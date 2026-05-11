import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide";
};

export default function PageContainer({
  children,
  className,
  size = "default",
}: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "wide"
          ? "max-w-screen-xl 2xl:max-w-screen-2xl"
          : "max-w-screen-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

