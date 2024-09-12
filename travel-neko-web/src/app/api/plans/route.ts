import { AddTravelPlanModel, ITravelPlan } from "@/models/plan-model";
import { v4 as uuidV4 } from "uuid";

let planList: ITravelPlan[] = [];

export async function GET() {
  try {
    return new Response(JSON.stringify({ planList }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 403,
    });
  }
}

export async function POST(request: Request) {
  try {
    const plan: AddTravelPlanModel = await request.json();
    const newPlan: ITravelPlan = { ...plan, id: uuidV4(), plansOnDay: [] };
    planList.push(newPlan);
    return new Response(
      JSON.stringify({
        message: "Added success",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
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
    return new Response(
      JSON.stringify({
        message: "Updated success",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}
