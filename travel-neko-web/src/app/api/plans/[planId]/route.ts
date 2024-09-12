import { ITravelPlan } from "@/models/plan-model";
import { Responses } from "@/utils/responses";
import { planManager } from "../plans";
import { revalidatePath } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { planId: string } },
) {
  const { planId } = params;
  const plan = planManager.getPlan(planId);
  if (plan) {
    return Responses.code200({ plan });
  } else {
    return Responses.code404("Record not found");
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { planId: string } },
) {
  const { planId } = params;
  try {
    const newPlan: ITravelPlan = await request.json();

    const updatedPlan = planManager.updatePlan(newPlan, planId);
    if (updatedPlan) {
      revalidatePath("/plans");
      return Responses.code202("Updated success");
    } else {
      return Responses.code404("Record not found");
    }
  } catch (error) {
    return Responses.code403(error?.toString() ?? "Unknown Error");
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { planId: string } },
) {
  const { planId } = params;
  const removedPlan = planManager.deletePlan(planId);
  if (removedPlan) {
    revalidatePath("/plans");
    return Responses.code200({ message: "Deleted success" });
  } else {
    return Responses.code404("Record not found");
  }
}
