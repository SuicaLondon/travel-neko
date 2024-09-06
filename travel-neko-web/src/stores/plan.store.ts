"use client";
import { ITravelPlan } from "@/app/models/plan-model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidV4 } from "uuid";
import { LOCAL_ID_PREFIX } from "@/app/constants/storage-constants";

interface ITravelPlanState {
  modifyingPlan: Partial<ITravelPlan> | null;
  travelPlans: ITravelPlan[];
  addPlan: (
    plan: Pick<ITravelPlan, "title" | "coverImage" | "mapType">,
  ) => void;
  updatePlan: (plan: ITravelPlan) => void;
}

export const useTravelPlansStore = create<ITravelPlanState>((set) => ({
  modifyingPlan: null,
  travelPlans: [],
  addPlan: (plan: Pick<ITravelPlan, "title" | "coverImage" | "mapType">) => {
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
  updatePlan: (plan: ITravelPlan) => {
    set((state) => ({
      modifyingPlan: null,
      travelPlans: state.travelPlans.map((travelPlan) =>
        travelPlan.id === plan.id ? plan : travelPlan,
      ),
    }));
  },
}));
