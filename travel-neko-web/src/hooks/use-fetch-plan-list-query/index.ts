import { fetchPlanList } from "@/clients/plan";
import { FETCH_PLAN_LIST_QUERY_KEY } from "@/constants/query-constants";
import { ITravelPlan } from "@/models/plan-model";
import { useQuery } from "@tanstack/react-query";

export const useFetchPlanListQuery = () => {
  const { data, error, isLoading } = useQuery<ITravelPlan[]>({
    queryKey: FETCH_PLAN_LIST_QUERY_KEY,
    queryFn: fetchPlanList,
  });
  return { data, error, isLoading };
};
