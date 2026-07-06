import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";
export type Density = "compact" | "comfortable";

type UiState = {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  setDensity: (density: Density) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "light",
      density: "comfortable",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
      setDensity: (density) => set({ density }),
    }),
    {
      name: "gamevault.ui",
      // partialize: only save the data, not the action functions
      partialize: (state) => ({ theme: state.theme, density: state.density }),
    }
  )
);
