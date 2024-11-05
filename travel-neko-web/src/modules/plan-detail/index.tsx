"use client";
import { AddButton } from "@/components/button/add-button";
import { DeleteButton } from "@/components/button/delete-button";
import { ConfirmModal } from "@/components/confirm-modal";
import { PlanCover } from "@/components/plan-cover";
import { FETCH_PLAN_LIST_QUERY_KEY } from "@/constants/query-constants";
import { useAddDayQuery } from "@/hooks/use-add-day-query";
import { useDeleteDayQuery } from "@/hooks/use-delete-day-query";
import { useDeletePlanQuery } from "@/hooks/use-delete-plan-query";
import { useFetchPlanQuery } from "@/hooks/use-fetch-plan-query";
import { useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateTravelPlanModal } from "../update-travel-plan-modal";
type PlanDetailProps = {
  planId: string;
};

export default function PlanDetail({ planId }: PlanDetailProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: plan,
    isError: isFetchPlanError,
    error: fetchPlanError,
    isLoading,
    refetch: refetchPlan,
  } = useFetchPlanQuery(planId);
  const {
    mutate: deletePlan,
    isPending: isDeletingPlan,
    isError: isDeletePlanError,
    error: deletePlanError,
  } = useDeletePlanQuery({
    onSuccess: () => {
      setIsDeleteModalOpened(false);
      queryClient.invalidateQueries({ queryKey: FETCH_PLAN_LIST_QUERY_KEY });
      router.replace("/plans");
    },
  });
  const { mutate: addDay, isPending: isAddingDay } = useAddDayQuery(planId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch-plan", planId] });
      refetchPlan();
    },
  });
  const { mutate: deleteDay, isPending: isDeletingDay } = useDeleteDayQuery(
    planId,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["fetch-plan", planId] });
        refetchPlan();
        setIsDeleteDayModalOpened(false);
        setSelectedDayId(null);
      },
    },
  );
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isDeleteDayModalOpened, setIsDeleteDayModalOpened] = useState(false);
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const handleDeleteDayModalOpen = (dayId: string) => {
    setSelectedDayId(dayId);
    setIsDeleteDayModalOpened(true);
  };

  const handleDeleteDayModalClose = () => {
    setIsDeleteDayModalOpened(false);
    setSelectedDayId(null);
  };

  const handleDeleteDayPlan = async () => {
    if (!selectedDayId) return;
    deleteDay(selectedDayId);
  };

  const addDayOnPlan = () => {
    if (!plan) return;
    addDay({ numOfDay: plan.plansOnDay.length + 1, locations: [] });
  };

  const handleUpdateModalOpen = () => {
    setIsUpdateModalOpened(true);
  };
  const handleUpdateModalClose = () => {
    setIsUpdateModalOpened(false);
  };

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

  const isDisabled = isAddingDay || isDeletingPlan || isDeletingDay;

  return (
    <div className="flex flex-col space-y-4">
      <PlanCover
        title={plan.title}
        coverImage={plan.coverImage}
        onClick={handleUpdateModalOpen}
      />
      {plan.plansOnDay.map((planOnDay) => {
        return (
          <div key={planOnDay.id} className="flex justify-between gap-4">
            <h2 className="text-4xl font-bold">Day {planOnDay.numOfDay}</h2>
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
            <DeleteButton
              disabled={isDisabled}
              label="Delete Day"
              onClick={() => handleDeleteDayModalOpen(planOnDay.id)}
            />
          </div>
        );
      })}
      <AddButton
        disabled={isDisabled}
        label="Add Day on Plan"
        onClick={addDayOnPlan}
      />
      <DeleteButton
        disabled={isDisabled}
        label="Delete Plan"
        onClick={handleDeleteModalOpen}
      />

      <ConfirmModal
        disabled={isDeletingPlan}
        isOpened={isDeleteModalOpened}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeletePlan}
        title="Delete Travel Plan"
        content="Are you sure you want to delete this travel plan?"
      />
      <ConfirmModal
        disabled={isDeletingDay}
        isOpened={isDeleteDayModalOpened}
        onClose={handleDeleteDayModalClose}
        onConfirm={handleDeleteDayPlan}
        title="Delete Travel Day"
        content="Are you sure you want to delete this travel day?"
      />
      <UpdateTravelPlanModal
        planId={planId}
        plan={plan}
        isOpened={isUpdateModalOpened}
        onModalClose={handleUpdateModalClose}
      />
    </div>
  );
}
