import { AddTravelPlanModel, ITravelPlan } from "@/models/plan-model";
import axios from "axios";

export const fetchPlanList = async () => {
  const response = await axios.get("/api/plans");
  return response.data.planList as ITravelPlan[];
};

export const addPlan = async (plan: AddTravelPlanModel) => {
  const response = await axios.post("/api/plans", plan);
  return response;
};
