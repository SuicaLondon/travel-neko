import { deletePlan } from "@/clients/plan";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useDeletePlanQuery = (
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, any>,
) => {
  const { mutate, error, isError, isPending } = useMutation<
    AxiosResponse<any, any>,
    Error,
    any
  >({
    mutationKey: ["delete-plan"],
    mutationFn: (planId: string) => deletePlan(planId),
    ...options,
  });
  return { mutate, error, isError, isPending };
};
