import PlanDetail from "@/module/plan-detail";
import React from "react";

export default function PlanPage({
  params,
  searchParams,
}: {
  params: { planId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { planId } = params;
  return <PlanDetail planId={decodeURIComponent(planId)} />;
}
