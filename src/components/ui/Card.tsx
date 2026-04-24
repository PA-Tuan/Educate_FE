import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-card border border-border bg-white text-text-main shadow-card p-card-p", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
