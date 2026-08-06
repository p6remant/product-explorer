"use client";

import { type ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";
import {
  applyThemeToDocument,
  getResolvedThemeFromDocument,
  setThemeCookie,
} from "@/lib/theme";
import { setTheme } from "@/store/redux/themeSlice";

function ThemeInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    let isInitialMountSync = true;

    const unsubscribeStore = store.subscribe(() => {
      if (isInitialMountSync) return;

      const activeThemeMode = store.getState().theme.mode;
      setThemeCookie(activeThemeMode);
      applyThemeToDocument(activeThemeMode);
    });

    store.dispatch(setTheme(getResolvedThemeFromDocument()));
    isInitialMountSync = false;

    return () => unsubscribeStore();
  }, []);

  return <>{children}</>;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeInitializer>{children}</ThemeInitializer>
    </Provider>
  );
}
