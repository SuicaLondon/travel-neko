import { fetchPlan } from "@/clients/plan";
import { ITravelPlan } from "@/models/plan-model";
import { QueryClient } from "@tanstack/react-query";

export const prefetchPlanQuery = async (planId: string) => {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery<ITravelPlan>({
      queryKey: ["fetch-plan", planId],
      queryFn: () => fetchPlan(planId),
    });
  } catch (error) {
    console.log("prefetchPlanQuery error: ", error);
  }
  return queryClient;
};
