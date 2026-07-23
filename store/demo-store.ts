import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DemoState {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      isDemoMode: true, // Default to true for the hackathon
      toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
    }),
    {
      name: 'biotrace-demo-storage',
    }
  )
);
