"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  hoverScale?: number;
  hoverY?: number;
}

export function AnimatedCard({
  children,
  hoverScale = 1.01,
  hoverY = -6,
  className = "",
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: hoverY, scale: hoverScale }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
