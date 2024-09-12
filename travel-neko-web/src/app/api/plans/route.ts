import { AddTravelPlanModel, ITravelPlan } from "@/models/plan-model";
import { Responses } from "@/utils/responses";
import { v4 as uuidV4 } from "uuid";
import { planManager } from "./plans";

export async function GET() {
  try {
    const planList = planManager.getPlanList();
    return Responses.code200({ planList });
  } catch (error) {
    return Responses.code403(error?.toString() ?? "Unknown Error");
  }
}

export async function POST(request: Request) {
  try {
    const plan: AddTravelPlanModel = await request.json();
    planManager.addPlan(plan);
    return Responses.code201("Added success");
  } catch (error) {
    return Responses.code403(error?.toString() ?? "Unknown Error");
  }
}
