"use client";
import { TravelPlan } from "@/app/models/plan-model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidV4 } from "uuid";
import { LOCAL_ID_PREFIX } from "@/app/constants/storage-constants";

interface TravelPlanProps {}

interface TravelPlanState {
  modifyingPlan: Partial<TravelPlan> | null;
  travelPlans: TravelPlan[];
  addPlan: (plan: Pick<TravelPlan, "title" | "coverImage" | "mapType">) => void;
  updatePlan: (plan: TravelPlan) => void;
}

export const useTravelPlansStore = create<TravelPlanState>((set) => ({
  modifyingPlan: null,
  travelPlans: [],
  addPlan: (plan: Pick<TravelPlan, "title" | "coverImage" | "mapType">) => {
    const newPlan = {
      ...plan,
      id: LOCAL_ID_PREFIX + uuidV4(),
      plansOnDay: [],
    };
    set((state) => ({
      modifyingPlan: null,
      travelPlans: [...state.travelPlans, newPlan],
    }));
  },
  updatePlan: (plan: TravelPlan) => {
    set((state) => ({
      modifyingPlan: null,
      travelPlans: state.travelPlans.map((travelPlan) =>
        travelPlan.id === plan.id ? plan : travelPlan,
      ),
    }));
  },
}));
