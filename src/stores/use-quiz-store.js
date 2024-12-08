import { create } from 'zustand';

const useStore = create((set) => ({
  score: 0, // Puntuación inicial
  rewards: [], // Recompensas coleccionables
  addPoints: (points) => set((state) => ({ score: state.score + points })),
  addReward: (reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
}));

export default useStore;
