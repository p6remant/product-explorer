import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getOppositeTheme, THEME, type ThemeMode } from "@/lib/theme";

export type { ThemeMode };

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: THEME.light,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode = getOppositeTheme(state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
