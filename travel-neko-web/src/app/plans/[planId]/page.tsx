import { prefetchPlanQuery } from "@/actions/prefetch-plan-query";
import PlanDetail from "@/modules/plan-detail";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function PlanPage({
  params,
  searchParams,
}: {
  params: { planId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { planId } = params;
  const queryClient = await prefetchPlanQuery(planId);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanDetail planId={decodeURIComponent(planId)} />
    </HydrationBoundary>
  );
}
