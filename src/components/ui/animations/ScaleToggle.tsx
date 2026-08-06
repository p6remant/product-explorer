"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";

interface ScaleToggleProps {
  children: ReactNode;
  toggleKey: string | number | boolean;
}

export function ScaleToggle({ children, toggleKey }: ScaleToggleProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={String(toggleKey)}
        initial={{ scale: 0.7, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
