import { create } from "zustand";
import { saveUserData, getUserData } from "../api";

const useStore = create((set, get) => ({
  // Logged-in user's MongoDB ID
  // userId: null,
  // setUserId: (id) => set({ userId: id }),
  username: null,
  setUsername: (name) => set({username: name}),

  macros: {
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  },
  setMacros: (macros) => {
    set({ macros });
    const { userId } = get();
    if (userId) saveUserData(userId, { macros });
  },

  weightLog: [],
  addWeight: (date, weight) => {
    console.log('in useStore')
    const updated = [...get().weightLog, {date, weight}];
    set({ weightLog: updated });
    const { username } = get();
    console.log('username:', username);
    if (username) saveUserData(username, { weightLog: updated });
  },

  workouts: [],
  addWorkout: (workout) => {
    const updated = [...get().workouts, workout];
    set({ workouts: updated });
    const { userId } = get();
    if (userId) saveUserData(userId, { workouts: updated });
  },

  phases: [],
  addPhase: (phase) => {
    const updated = [...get().phases, phase];
    set({ phases: updated });
    const { userId } = get();
    if (userId) saveUserData(userId, { phases: updated });
  },

  // --- Load data from MongoDB after login ---
  loadUserData: async () => {
    const { userId } = get();
    if (!userId) return;

    try {
      const data = await getUserData(userId);
      set({
        macros: data.macros || {
          protein: 0,
          carbs: 0,
          fats: 0,
          calories: 0,
        },
        weightLog: data.weightLog || [],
        workouts: data.workouts || [],
        phases: data.phases || [],
      });
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  },
}));

export default useStore;
