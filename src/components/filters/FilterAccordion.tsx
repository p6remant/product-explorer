"use client";

import { useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FilterAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function FilterAccordion({
  title,
  defaultOpen = true,
  children,
}: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-divider border-b pb-4">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-content-main hover:text-brand-primary w-full justify-between px-0 py-2 font-semibold transition hover:bg-transparent"
        rightIcon={
          isOpen ? (
            <ChevronUp className="text-content-muted h-4 w-4" />
          ) : (
            <ChevronDown className="text-content-muted h-4 w-4" />
          )
        }
      >
        <span className="text-base">{title}</span>
      </Button>

      {isOpen && (
        <div className="animate-in fade-in mt-2 space-y-2.5 duration-150">
          {children}
        </div>
      )}
    </div>
  );
}
