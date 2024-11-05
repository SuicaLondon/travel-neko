import { updatePlan } from "@/clients/plan";
import { UpdateTravelPlanModel } from "@/models/plan-model";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useUpdatePlanQuery = (
  planId: string,
  options?: UseMutationOptions<
    AxiosResponse<any, any>,
    Error,
    UpdateTravelPlanModel
  >,
) => {
  return useMutation<AxiosResponse<any, any>, Error, UpdateTravelPlanModel>({
    mutationKey: ["update-plan"],
    mutationFn: (data: UpdateTravelPlanModel) => updatePlan(planId, data),
    ...options,
  });
};
