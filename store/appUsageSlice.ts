import { createSlice } from "@reduxjs/toolkit";

interface AppUsageState {
  totalOpens: number;
  lastOpenDate: string | null;
  streak: number;
}

const today = new Date().toISOString().split("T")[0];

const initialState: AppUsageState = {
  totalOpens: 0,
  lastOpenDate: null,
  streak: 0,
};

const appUsageSlice = createSlice({
  name: "appUsage",
  initialState,
  reducers: {
    registerAppOpen: (state) => {
      const todayStr = new Date().toISOString().split("T")[0];

      state.totalOpens += 1;

      if (state.lastOpenDate) {
        const lastDate = new Date(state.lastOpenDate);
        const diff =
          (new Date(todayStr).getTime() - lastDate.getTime()) /
          (1000 * 60 * 60 * 24);

        if (diff === 1) {
          state.streak += 1;
        } else if (diff > 1) {
          state.streak = 1;
        }
      } else {
        state.streak = 1;
      }

      state.lastOpenDate = todayStr;
    },
    resetStreak: (state) => {
      state.streak = 0;
    },
  },
});

export const { registerAppOpen, resetStreak } = appUsageSlice.actions;
export default appUsageSlice.reducer;

export const selectAppUsage = (state: { appUsage: AppUsageState }) =>
  state.appUsage;
export const selectTotalOpens = (state: { appUsage: AppUsageState }) =>
  state.appUsage.totalOpens;
export const selectStreak = (state: { appUsage: AppUsageState }) =>
  state.appUsage.streak;
