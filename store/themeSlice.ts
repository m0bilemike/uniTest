import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark";

interface ThemeState {
  current: ThemeType;
}

const initialState: ThemeState = { current: "light" }; // ✅ correct

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.current = action.payload;
    },
    toggleTheme: (state) => {
      state.current = state.current === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;