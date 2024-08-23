"use client";
import { AddTravelPlanModal } from "@/module/add-travel-plan-modal";
import { useTravelPlansStore } from "@/stores/plan.store";
import { useCallback, useState } from "react";
import { AddButton } from "../button/add-button";

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
        return (
          <div className="w-full max-w-80" key={travelPlan.id}>
            <h1 className="text-4xl font-bold">{travelPlan.title}</h1>
            {travelPlan.coverImage && (
              <img
                className="flex w-full items-center justify-center"
                src={URL.createObjectURL(travelPlan.coverImage)}
                alt="Uploaded Image"
              />
            )}
          </div>
        );
      })}
      <AddButton onClick={onAddButtonClick} />
      <AddTravelPlanModal isOpened={isOpened} onModalClose={onModalClose} />
    </div>
  );
}
