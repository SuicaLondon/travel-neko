import { fetchPlan } from "@/clients/plan";
import { ITravelPlan } from "@/models/plan-model";
import { QueryClient } from "@tanstack/react-query";

export const prefetchPlanQuery = async (planId: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ITravelPlan>({
    queryKey: ["fetch-plan", planId],
    queryFn: () => fetchPlan(planId),
  });
  return queryClient;
};
