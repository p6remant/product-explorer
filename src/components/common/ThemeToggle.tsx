"use client";

import { useSyncExternalStore } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { toggleTheme } from "@/store/redux/themeSlice";
import { THEME } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";
import { ScaleToggle } from "@/components/ui/animations/ScaleToggle";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle Theme"
      className="bg-app-muted text-content-main hover:bg-app-surface-hover cursor-pointer rounded-lg p-2 transition"
    >
      {mounted ? (
        <ScaleToggle toggleKey={themeMode}>
          {themeMode === THEME.dark ? (
            <Sun className="text-status-warning h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </ScaleToggle>
      ) : (
        <span className="inline-block h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
