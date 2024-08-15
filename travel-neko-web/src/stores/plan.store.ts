"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TravelPlanProps {}

interface TravelPlanState {
  modifyingPlan: Partial<TravelPlan> | null;
  travelPlans: TravelPlan[];
}

export const useTravelPlansStore = create<TravelPlanState>((set) => ({
  modifyingPlan: null,
  travelPlans: [],
  addPlan: (plan: TravelPlan) => {
    set((state) => ({
      modifyingPlan: null,
      travelPlans: [...state.travelPlans, plan],
    }));
  },
  updatePlan: (plan: TravelPlan) => {
    set((state) => ({
      modifyingPlan: null,
      travelPlans: state.travelPlans.map((travelPlan) =>
        travelPlan.id === plan.id ? plan : travelPlan
      ),
    }));
  },
}));
