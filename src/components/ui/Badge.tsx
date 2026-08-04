import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger";
}

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-brand-light text-brand-primary border-brand-light",
    success:
      "bg-status-success/10 text-status-success border-status-success/20",
    warning: "bg-status-star/10 text-status-star border-status-star/20",
    danger: "bg-status-error/10 text-status-error border-status-error/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
