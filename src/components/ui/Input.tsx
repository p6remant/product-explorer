import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="text-content-subtle pointer-events-none absolute left-3">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "bg-app-surface text-content-main placeholder-content-subtle w-full rounded-lg border py-2 text-base transition focus:ring-2 focus:outline-none sm:text-sm",
              icon ? "pr-4 pl-9" : "px-4",
              error
                ? "border-status-error focus:ring-status-error"
                : "border-divider focus:ring-brand-primary",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-status-error mt-1 text-xs">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
