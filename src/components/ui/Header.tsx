import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Header({
  title,
  description,
  className,
  children,
}: HeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center",
        className,
      )}
    >
      <div>
        <h1 className="text-content-main text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-content-muted mt-1 text-sm">{description}</p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
