"use client";
import { AddButton } from "@/components/button/add-button";
import { ConfirmModal } from "@/components/confirm-modal";
import { PlanCover } from "@/components/plan-cover";
import { useFetchPlanQuery } from "@/hooks/use-fetch-plan-query";
import { useTravelPlansStore } from "@/stores/plan.store";
import { redirect } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type PlanDetailProps = {
  planId: string;
};

export default function PlanDetail({ planId }: PlanDetailProps) {
  const { data: plan, isLoading } = useFetchPlanQuery(planId);
  // const accessPlan = useTravelPlansStore((state) => state.accessPlan);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  // const [travelPlan, modifyingPlan] = useMemo(
  //   () => accessPlan(planId),
  //   [accessPlan, planId],
  // );

  // if (!travelPlan) {
  //   redirect("/plans");
  // }

  const addDayOnPlan = () => {};

  const deleteTravelPlan = () => {
    setIsDeleteModalOpened(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpened(false);
  };
  console.log(plan, isLoading);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!plan) {
    redirect("/plans");
  }

  return (
    <div>
      <PlanCover title={plan.title} coverImage={plan.coverImage} />
      {plan.plansOnDay.map((planOnDay) => {
        return (
          <div key={planOnDay.id}>
            <div>{planOnDay.id}</div>
            <div>{planOnDay.numOfDay}</div>
            {planOnDay.locations.map((location) => {
              return (
                <div key={location.id}>
                  <div>{location.type.toString()}</div>
                  <div>{location.name}</div>
                  <div>{location.address}</div>
                  <div>{location.openingTime}</div>
                  <div>{location.time}</div>
                  <div>{location.shouldBook}</div>
                </div>
              );
            })}
          </div>
        );
      })}
      <AddButton label="Add Day on Plan" onClick={() => {}} />

      <ConfirmModal
        isOpened={isDeleteModalOpened}
        onClose={handleDeleteModalClose}
        onConfirm={deleteTravelPlan}
        title="Delete Travel Plan"
        content="Are you sure you want to delete this travel plan?"
      />
    </div>
  );
}
