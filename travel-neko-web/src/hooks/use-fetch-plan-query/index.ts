import { useQuery } from "@tanstack/react-query";
import { fetchPlan } from "@/clients/plan";
import { ITravelPlan } from "@/models/plan-model";

export const useFetchPlanQuery = (planId: string) => {
  const { data, error, isError, isLoading } = useQuery<ITravelPlan>({
    queryKey: ["fetch-plan", planId],
    queryFn: () => fetchPlan(planId),
  });

  return { data, error, isError, isLoading };
};
