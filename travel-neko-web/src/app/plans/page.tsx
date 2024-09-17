import { prefetchPlanListQuery } from "@/actions/prefetch-plan-list-query";
import { PlanList } from "@/module/plan-list";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function PlansPage() {
  const queryClient = await prefetchPlanListQuery();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanList />
    </HydrationBoundary>
  );
}
