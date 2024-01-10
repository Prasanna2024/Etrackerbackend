import { create } from 'zustand';
import { InputType } from '../components/Tracker/Tracker';

export interface StoreState {
  expenses: InputType[];
  totalExpenses: number;
  setExpenses: (value: InputType[]) => void;
  setTotalExpense: (value: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  expenses: [],
  totalExpenses: 100,
  setExpenses: (value: InputType[]) => set((state) => ({ expenses: value })),
  setTotalExpense: (value: number) => set((state) => ({ totalExpenses: value })),
}));
