import { UpdateDayOnPlanModel } from "@/models/plan-model";
import { Responses } from "@/utils/responses";
import { planManager } from "lib/models/plan-model";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: { planId: string; dayId: string } },
) {
  const { planId, dayId } = params;
  const newDay: UpdateDayOnPlanModel = await request.json();
  const updatedPlan = await planManager.updateDayOnPlan(planId, dayId, newDay);
  if (updatedPlan) {
    revalidatePath("/plans");
    revalidatePath(`/plans/${planId}`);
    return Responses.code202("Updated success");
  } else {
    return Responses.code404("Record not found");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { planId: string; dayId: string } },
) {
  const { planId, dayId } = params;
  const deletedPlan = await planManager.deleteDayOnPlan(planId, dayId);
  if (deletedPlan) {
    revalidatePath("/plans");
    revalidatePath(`/plans/${planId}`);
    return Responses.code200("Deleted success");
  } else {
    return Responses.code404("Record not found");
  }
}
