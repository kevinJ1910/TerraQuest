import { create } from 'zustand';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config"; // Tu configuración de Firebase

const useStore = create((set) => ({
  score: 0,
  rewards: [],
  addPoints: async (points, userId) => {
    set((state) => ({ score: state.score + points }));
    if (userId) {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { score: state.score + points }, { merge: true });
    }
  },
  addReward: async (reward, userId) => {
    set((state) => ({ rewards: [...state.rewards, reward] })); // Actualiza el estado local
    if (userId) {
      const userRef = doc(db, "users", userId);
      const currentRewards = (await getDoc(userRef)).data()?.rewards || []; // Obtén recompensas existentes
      await setDoc(userRef, { rewards: [...currentRewards, reward] }, { merge: true });
    }
  },
  
  loadUserData: async (userId) => {
    if (userId) {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ score: data.score || 0, rewards: data.rewards || [] });
      }
    }
  },
}));
export default useStore;

