import { useQuery } from "@tanstack/react-query";
import { fetchPlan } from "@/clients/plan";
import { ITravelPlan } from "@/models/plan-model";

export const useFetchPlanQuery = (planId: string) => {
  return useQuery<ITravelPlan>({
    queryKey: ["fetch-plan", planId],
    queryFn: () => fetchPlan(planId),
  });
};
