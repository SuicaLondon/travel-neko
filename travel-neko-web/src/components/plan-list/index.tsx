"use client";
import { AddTravelPlanModal } from "@/module/add-travel-plan-modal";
import { useTravelPlansStore } from "@/stores/plan.store";
import Link from "next/link";
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
          <Link
            key={travelPlan.id}
            href={`/plans/${travelPlan.id}`}
            className="cursor-pointer"
          >
            <div className="w-full max-w-80">
              <h1 className="text-4xl font-bold">{travelPlan.title}</h1>
              {travelPlan.coverImage && (
                <img
                  className="flex w-full items-center justify-center"
                  src={travelPlan.coverImage}
                  alt="Uploaded Image"
                />
              )}
            </div>
          </Link>
        );
      })}
      <AddButton label="Add Plan" onClick={onAddButtonClick} />
      <AddTravelPlanModal isOpened={isOpened} onModalClose={onModalClose} />
    </div>
  );
}
