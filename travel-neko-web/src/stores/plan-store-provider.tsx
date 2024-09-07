"use client";
import React from "react";
import { planStore, PlanStoreContext } from "./plan.store";

export const PlanStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PlanStoreContext.Provider value={planStore}>
      {children}
    </PlanStoreContext.Provider>
  );
};
