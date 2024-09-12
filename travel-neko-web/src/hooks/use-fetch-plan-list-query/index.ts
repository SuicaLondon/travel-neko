import { fetchPlanList } from "@/clients/plan";
import { ITravelPlan } from "@/models/plan-model";
import { useQuery } from "@tanstack/react-query";

export const useFetchPlanListQuery = () => {
  const { data, error, isLoading } = useQuery<ITravelPlan[]>({
    queryKey: ["fetch-plans"],
    queryFn: fetchPlanList,
  });
  return { data, error, isLoading };
};
