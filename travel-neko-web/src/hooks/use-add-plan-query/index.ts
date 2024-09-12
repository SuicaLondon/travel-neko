import { addPlan } from "@/clients/plan";
import { AddTravelPlanModel } from "@/models/plan-model";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useAddPlanQuery = (
  options?: UseMutationOptions<
    AxiosResponse<any, any>,
    Error,
    AddTravelPlanModel
  >,
) => {
  const { mutate, error, isPending } = useMutation<
    AxiosResponse<any, any>,
    Error,
    AddTravelPlanModel
  >({
    mutationKey: ["add-plan"],
    mutationFn: addPlan,
    ...options,
  });
  return { mutate, error, isPending };
};
