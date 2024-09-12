import { ITravelPlan } from "@/models/plan-model";
import { planList } from "../plans";
import { Responses } from "@/utils/responses";

export async function GET(
  request: Request,
  { params }: { params: { planId: string } },
) {
  const { planId } = params;
  const plan = planList.find((plan) => plan.id === planId);
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
    const updatedPlan: ITravelPlan = await request.json();
    const index = planList.findIndex((plan) => plan.id === planId);
    if (index !== -1) {
      planList[index] = {
        ...planList[index],
        ...updatedPlan,
      };
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
  const index = planList.findIndex((plan) => plan.id === planId);
  if (index !== -1) {
    planList.splice(index, 1);
    return Responses.code200({ message: "Deleted success" });
  } else {
    return Responses.code404("Record not found");
  }
}
