import { create } from "zustand";
import { questions } from "../constants/question";

interface UserData {
  name: string;
  age: number;
  gender: string;
  school: string;
  jurusan: string;
  class: string;
}

interface Store {
  userData: UserData | null;
  storeAnswers: typeof questions;
  setStoreAnswers: (payload: typeof questions) => void;
  setUserData: (payload: UserData) => void;
}

const store = create<Store>((set) => ({
  userData: null,
  storeAnswers: questions,
  setStoreAnswers: (payload: typeof questions) => set({ storeAnswers: payload }),
  setUserData: (payload: UserData) => set({userData: payload})
}))

export const useStore = () => {
  const { userData, storeAnswers, setStoreAnswers, setUserData } = store((state) => ({
    userData: state.userData,
    storeAnswers: state.storeAnswers,
    setStoreAnswers: state.setStoreAnswers,
    setUserData: state.setUserData
  }))

  return { userData, storeAnswers, setStoreAnswers, setUserData }
};