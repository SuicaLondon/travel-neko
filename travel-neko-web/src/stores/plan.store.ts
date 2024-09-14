"use client";
import {
  LOCAL_DAY_ID_PREFIX,
  LOCAL_PLAN_ID_PREFIX,
} from "@/constants/storage-constants";
import { type ITravelPlan } from "@/models/plan-model";
import { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { createStore, useStore } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

export interface ITravelPlanState {
  modifyingPlan: Partial<ITravelPlan> | null;
  travelPlans: ITravelPlan[];
  addPlan: (
    plan: Pick<ITravelPlan, "title" | "coverImage" | "mapType">,
  ) => void;
  updatePlan: (plan: ITravelPlan) => void;
  accessPlan: (
    planId: string,
  ) => [plan: ITravelPlan | null, modifyingPlan: ITravelPlan | null];
}

export const planStore = createStore(
  persist<ITravelPlanState>(
    (set, get) => ({
      modifyingPlan: null,
      travelPlans: [],
      addPlan: (
        plan: Pick<ITravelPlan, "title" | "coverImage" | "mapType">,
      ) => {
        const newPlan = {
          ...plan,
          id: LOCAL_PLAN_ID_PREFIX + uuidV4(),
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
      accessPlan: (planId: string) => {
        const plan =
          get().travelPlans.find((plan) => {
            return plan.id === planId;
          }) ?? null;
        const modifyingPlan = structuredClone(plan);
        set((state) => ({
          ...state,
          modifyingPlan: modifyingPlan,
        }));
        return [plan, modifyingPlan];
      },
      addDayOnPlan: () => {
        set((state) => ({
          ...state,
          modifyingPlan: {
            ...state.modifyingPlan,
            plansOnDay: [
              ...(state.modifyingPlan?.plansOnDay ?? []),
              {
                id: LOCAL_DAY_ID_PREFIX + uuidV4(),
                numOfDay: 0,
                locations: [],
              },
            ],
          },
        }));
      },
    }),
    {
      name: "plan-storage",
      storage: {
        getItem: (name: string) => {
          if (typeof window === "undefined") return null;
          return JSON.parse(window.localStorage.getItem(name) || "null");
        },
        setItem: (name: string, value: StorageValue<ITravelPlanState>) => {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(name, JSON.stringify(value));
          }
        },
        removeItem: (name: string) => {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem(name);
          }
        },
      },
    },
  ),
);

export const PlanStoreContext = createContext(planStore);

export const useTravelPlansStore = <T>(
  selector: (state: ITravelPlanState) => T,
) => {
  const store = useContext(PlanStoreContext);
  return useStore(store, selector);
};
