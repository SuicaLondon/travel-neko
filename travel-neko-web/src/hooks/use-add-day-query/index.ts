import { addDayOnPlan } from "@/clients/day-of-plan";
import { AddDayOnPlanModel, AddTravelPlanModel } from "@/models/plan-model";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useAddDayQuery = (
  planId: string,
  options?: UseMutationOptions<
    AxiosResponse<any, any>,
    Error,
    AddDayOnPlanModel
  >,
) => {
  return useMutation<AxiosResponse<any, any>, Error, AddDayOnPlanModel>({
    mutationKey: ["add-day"],
    mutationFn: (data: AddDayOnPlanModel) => addDayOnPlan(planId, data),
    ...options,
  });
};
