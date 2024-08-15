import { PlanList } from "@/components/plan-list";
import { useTravelPlansStore } from "@/stores/plan.store";
import React from "react";

export default function PlansPage() {
  return (
    <div>
      <PlanList />
    </div>
  );
}
