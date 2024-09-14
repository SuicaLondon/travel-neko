import { AddDayOnPlanModel, UpdateDayOnPlanModel } from "@/models/plan-model";
import { Responses } from "@/utils/responses";
import { planManager } from "lib/models/plan-model";
import { revalidatePath } from "next/cache";

export async function POST(
  request: Request,
  { params }: { params: { planId: string } },
) {
  const { planId } = params;
  const newDay: AddDayOnPlanModel = await request.json();
  const updatedPlan = planManager.addDayOnPlan(planId, newDay);
  if (updatedPlan) {
    revalidatePath("/plans");
    revalidatePath(`/plans/${planId}`);
    return Responses.code202("Created success");
  } else {
    return Responses.code404("Record not found");
  }
}
