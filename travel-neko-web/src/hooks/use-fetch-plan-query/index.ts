import { useQuery } from "@tanstack/react-query";
import { fetchPlan } from "@/clients/plan";
import { ITravelPlan } from "@/models/plan-model";
import { FETCH_PLAN_QUERY_KEY } from "@/constants/query-constants";

export const useFetchPlanQuery = (planId: string) => {
  return useQuery<ITravelPlan>({
    queryKey: [FETCH_PLAN_QUERY_KEY, planId] as const,
    queryFn: () => fetchPlan(planId),
  });
};
