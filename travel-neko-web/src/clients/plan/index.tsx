import {
  AddTravelPlanModel,
  ITravelPlan,
  UpdateTravelPlanModel,
} from "@/models/plan-model";
import axios from "axios";

export const fetchPlanList = async () => {
  const response = await axios.get("/api/plans");
  return response.data.planList as ITravelPlan[];
};

export const fetchPlan = async (planId: string) => {
  const response = await axios.get(`/api/plans/${planId}`);
  return response.data as ITravelPlan;
};

export const addPlan = async (plan: AddTravelPlanModel) => {
  const response = await axios.post("/api/plans", plan);
  return response;
};

export const updatePlan = async (
  planId: string,
  plan: UpdateTravelPlanModel,
) => {
  const response = await axios.put(`/api/plans/${planId}`, plan);
  return response;
};

export const deletePlan = async (planId: string) => {
  const response = await axios.delete(`/api/plans/${planId}`);
  return response;
};
