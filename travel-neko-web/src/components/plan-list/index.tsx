"use client";
import { useFetchPlanListQuery } from "@/hooks/use-fetch-plan-list-query";
import { AddTravelPlanModal } from "@/module/add-travel-plan-modal";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AddButton } from "../button/add-button";

export function PlanList() {
  const { data: planList, error, isLoading } = useFetchPlanListQuery();
  const [isOpened, setIsOpened] = useState(false);

  const onAddButtonClick = useCallback(() => {
    setIsOpened(true);
  }, []);
  const onModalClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {planList?.map((plan) => {
        return (
          <Link
            key={plan.id}
            href={`/plans/${plan.id}`}
            className="cursor-pointer"
          >
            <div className="w-full max-w-96">
              <h1 className="text-4xl font-bold">{plan.title}</h1>
              {plan.coverImage && (
                <img
                  className="flex w-full items-center justify-center"
                  src={plan.coverImage}
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
