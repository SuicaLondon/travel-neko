"use client";
import { useTravelPlansStore } from "@/stores/plan.store";
import React, { useCallback, useState } from "react";
import { AddButton } from "../button/add-button";
import { Modal } from "../modal";
import { AddTravelPlanModal } from "@/module/add-travel-plan-modal";

export function PlanList() {
  const [isOpened, setIsOpened] = useState(false);
  const travelPlans = useTravelPlansStore((state) => state.travelPlans);

  const onAddButtonClick = useCallback(() => {
    setIsOpened(true);
  }, []);
  const onModalClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <div>
      {travelPlans.map((travelPlan) => {
        return <div key={travelPlan.id}>{travelPlan.title}</div>;
      })}
      <AddButton onClick={onAddButtonClick} />
      <AddTravelPlanModal isOpened={isOpened} onModalClose={onModalClose} />
    </div>
  );
}
