import { AddTravelPlanModel, ITravelPlan } from "@/models/plan-model";
import { Responses } from "@/utils/responses";
import { v4 as uuidV4 } from "uuid";

let planList: ITravelPlan[] = [];

export async function GET() {
  try {
    return Responses.code200({ planList });
  } catch (error) {
    return Responses.code403(error?.toString() ?? "Unknown Error");
  }
}

export async function POST(request: Request) {
  try {
    const plan: AddTravelPlanModel = await request.json();
    const newPlan: ITravelPlan = { ...plan, id: uuidV4(), plansOnDay: [] };
    planList.push(newPlan);
    return Responses.code201("Added success");
  } catch (error) {
    return Responses.code403(error?.toString() ?? "Unknown Error");
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPlan: ITravelPlan = await request.json();
    const index = planList.findIndex((plan) => plan.id === updatedPlan.id);
    planList[index] = {
      ...planList[index],
      ...updatedPlan,
    };
    return Responses.code202("Updated success");
  } catch (error) {
    return Responses.code403(error?.toString() ?? "Unknown Error");
  }
}
