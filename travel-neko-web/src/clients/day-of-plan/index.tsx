import { AddDayOnPlanModel, UpdateDayOnPlanModel } from "@/models/plan-model";
import axios from "axios";

export const addDayOnPlan = async (planId: string, day: AddDayOnPlanModel) => {
  const response = await axios.post(`/api/plans/${planId}/days`, day);
  return response;
};

export const updateDayOnPlan = async (
  planId: string,
  dayId: string,
  day: UpdateDayOnPlanModel,
) => {
  const response = await axios.put(`/api/plans/${planId}/days/${dayId}`, day);
  return response;
};

export const deleteDayOnPlan = async (planId: string, dayId: string) => {
  const response = await axios.delete(`/api/plans/${planId}/days/${dayId}`);
  return response;
};
