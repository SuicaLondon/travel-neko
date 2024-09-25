"use client";
import { PlanListComponent } from "@/components/plan-list";
import { useFetchPlanListQuery } from "@/hooks/use-fetch-plan-list-query";
import { AddTravelPlanModal } from "@/modules/add-travel-plan-modal";
import { useCallback, useState } from "react";
import { AddButton } from "@/components/button/add-button";

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
    <div className="flex flex-col space-y-4">
      <PlanListComponent planList={planList} />
      <AddButton label="Add Plan" onClick={onAddButtonClick} />
      <AddTravelPlanModal isOpened={isOpened} onModalClose={onModalClose} />
    </div>
  );
}
