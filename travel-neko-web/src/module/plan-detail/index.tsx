"use client";
import { AddButton } from "@/components/button/add-button";
import { DeleteButton } from "@/components/button/delete-button";
import { ConfirmModal } from "@/components/confirm-modal";
import { PlanCover } from "@/components/plan-cover";
import { useDeletePlanQuery } from "@/hooks/use-delete-plan-query";
import { useFetchPlanQuery } from "@/hooks/use-fetch-plan-query";
import { useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
type PlanDetailProps = {
  planId: string;
};

export default function PlanDetail({ planId }: PlanDetailProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: plan,
    error,
    isError: isFetchPlanError,
    error: fetchPlanError,
    isLoading,
  } = useFetchPlanQuery(planId);
  const {
    mutate: deletePlan,
    isPending: isDeletingPlan,
    isError: isDeletePlanError,
    error: deletePlanError,
  } = useDeletePlanQuery({
    onSuccess: () => {
      setIsDeleteModalOpened(false);
      queryClient.invalidateQueries({ queryKey: ["fetch-plans"] });
      router.replace("/plans");
    },
  });
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const addDayOnPlan = () => {};

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpened(true);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpened(false);
  };

  const handleDeletePlan = () => {
    deletePlan(planId);
  };

  if (isFetchPlanError && fetchPlanError) {
    toast.error(fetchPlanError?.message);
    redirect("/plans");
  }

  if (isDeletePlanError && fetchPlanError) {
    toast.error(deletePlanError?.message);
    redirect("/plans");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!plan) {
    redirect("/plans");
  }

  return (
    <div>
      <PlanCover title={plan.title} coverImage={plan.coverImage} />
      {plan.plansOnDay.map((planOnDay) => {
        return (
          <div key={planOnDay.id}>
            <div>{planOnDay.id}</div>
            <div>{planOnDay.numOfDay}</div>
            {planOnDay.locations.map((location) => {
              return (
                <div key={location.id}>
                  <div>{location.type.toString()}</div>
                  <div>{location.name}</div>
                  <div>{location.address}</div>
                  <div>{location.openingTime}</div>
                  <div>{location.time}</div>
                  <div>{location.shouldBook}</div>
                </div>
              );
            })}
          </div>
        );
      })}
      <AddButton label="Add Day on Plan" onClick={() => {}} />
      <DeleteButton label="Delete Plan" onClick={handleDeleteModalOpen} />

      <ConfirmModal
        isOpened={isDeleteModalOpened}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeletePlan}
        title="Delete Travel Plan"
        content="Are you sure you want to delete this travel plan?"
      />
    </div>
  );
}
