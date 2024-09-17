import {
  AddTravelPlanModel,
  ITravelPlan,
  UpdateTravelPlanModel,
} from "@/models/plan-model";
import axios, { AxiosRequestHeaders } from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

axiosInstance.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    const { headers } = config;
    config.headers = {
      ...headers,
      "User-Agent": "NextJS Server",
    } as AxiosRequestHeaders;
  }
  return config;
});
export const fetchPlanList = async () => {
  const response = await axiosInstance.get("/api/plans");
  return response.data.planList as ITravelPlan[];
};

export const fetchPlan = async (planId: string) => {
  const response = await axiosInstance.get(`/api/plans/${planId}`);
  return response.data.plan as ITravelPlan;
};

export const addPlan = async (plan: AddTravelPlanModel) => {
  const response = await axiosInstance.post("/api/plans", plan);
  return response;
};

export const updatePlan = async (
  planId: string,
  plan: UpdateTravelPlanModel,
) => {
  const response = await axiosInstance.put(`/api/plans/${planId}`, plan);
  return response;
};

export const deletePlan = async (planId: string) => {
  const response = await axiosInstance.delete(`/api/plans/${planId}`);
  return response;
};
