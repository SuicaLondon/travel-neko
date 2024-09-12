"use client";
import { AddButton } from "@/components/button/add-button";
import { PlanCover } from "@/components/plan-cover";
import { useTravelPlansStore } from "@/stores/plan.store";
import { redirect } from "next/navigation";
import React, { useEffect, useMemo } from "react";

type PlanDetailProps = {
  planId: string;
};

export default function PlanDetail({ planId }: PlanDetailProps) {
  const accessPlan = useTravelPlansStore((state) => state.accessPlan);
  const [travelPlan, modifyingPlan] = useMemo(
    () => accessPlan(planId),
    [accessPlan, planId],
  );

  if (!travelPlan) {
    redirect("/plans");
  }

  const addDayOnPlan = () => {};

  return (
    <div>
      <PlanCover title={travelPlan.title} coverImage={travelPlan.coverImage} />
      {modifyingPlan?.plansOnDay.map((planOnDay) => {
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
    </div>
  );
}
