"use client";

import { type ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/redux/store";
import { initTheme } from "@/store/redux/themeSlice";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(initTheme());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
