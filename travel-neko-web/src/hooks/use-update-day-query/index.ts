import { updateDayOnPlan } from "@/clients/day-of-plan";
import { UpdateDayOnPlanModel } from "@/models/plan-model";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useUpdateDayQuery = (
  planId: string,
  dayId: string,
  options?: UseMutationOptions<
    AxiosResponse<any, any>,
    Error,
    UpdateDayOnPlanModel
  >,
) => {
  return useMutation<AxiosResponse<any, any>, Error, UpdateDayOnPlanModel>({
    mutationKey: ["update-day"],
    mutationFn: (data: UpdateDayOnPlanModel) =>
      updateDayOnPlan(planId, dayId, data),
    ...options,
  });
};
