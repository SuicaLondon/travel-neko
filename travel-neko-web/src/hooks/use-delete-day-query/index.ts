import { deleteDayOnPlan } from "@/clients/day-of-plan";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useDeleteDayQuery = (
  planId: string,
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, string>,
) => {
  return useMutation<AxiosResponse<any, any>, Error, string>({
    mutationKey: ["delete-day"],
    mutationFn: (dayId: string) => deleteDayOnPlan(planId, dayId),
    ...options,
  });
};
