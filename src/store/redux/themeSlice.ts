import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "app-theme";

function getTheme(): ThemeMode {
  const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export const themeScript = `(function(){try{var s=localStorage.getItem('${STORAGE_KEY}'),m=s==='light'||s==='dark'?s:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.toggle('dark',m==='dark')}catch(e){}})();`;

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" as ThemeMode },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, state.mode);
        applyTheme(state.mode);
      }
    },
    initTheme: (state) => {
      if (typeof window !== "undefined") {
        state.mode = getTheme();
        applyTheme(state.mode);
      }
    },
  },
});

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
