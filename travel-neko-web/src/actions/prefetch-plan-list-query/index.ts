import { fetchPlanList } from "@/clients/plan";
import { FETCH_PLAN_LIST_QUERY_KEY } from "@/constants/query-constants";
import { ITravelPlan } from "@/models/plan-model";
import { QueryClient } from "@tanstack/react-query";

export const prefetchPlanListQuery = async () => {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery<ITravelPlan[]>({
      queryKey: FETCH_PLAN_LIST_QUERY_KEY,
      queryFn: async () => {
        const planList = await fetchPlanList();
        return planList;
      },
    });
  } catch (error) {
    console.error("prefetch plan list Error", error);
    throw error;
  }
  return queryClient;
};
