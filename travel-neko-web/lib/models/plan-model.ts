import {
  AddDayOnPlanModel,
  AddTravelPlanModel,
  UpdateDayOnPlanModel,
  UpdateTravelPlanModel,
} from "@/models/plan-model";
import prisma from "lib/prisma";

class PlanManager {
  async getPlanList() {
    return await prisma.travelPlan.findMany({
      include: {
        plansOnDay: {
          include: {
            locations: true,
          },
        },
      },
    });
  }

  async getPlan(planId: string) {
    return await prisma.travelPlan.findUnique({
      where: { id: planId },
      include: {
        plansOnDay: {
          include: {
            locations: true,
          },
        },
      },
    });
  }

  async addPlan(plan: AddTravelPlanModel) {
    return await prisma.travelPlan.create({
      data: {
        ...plan,
        plansOnDay: {
          create: [],
        },
      },
    });
  }

  async updatePlan(newPlan: UpdateTravelPlanModel, planId: string) {
    return await prisma.travelPlan.update({
      where: { id: planId },
      data: newPlan,
    });
  }

  async deletePlan(planId: string) {
    return await prisma.travelPlan.delete({
      where: { id: planId },
    });
  }

  async addDayOnPlan(planId: string, day: AddDayOnPlanModel) {
    return await prisma.plansOnDay.create({
      data: {
        ...day,
        travelPlanId: planId,
        locations: {
          create: [],
        },
      },
    });
  }

  async updateDayOnPlan(
    planId: string,
    dayId: string,
    day: UpdateDayOnPlanModel,
  ) {
    return await prisma.plansOnDay.update({
      where: { id: dayId },
      data: {
        ...day,
        locations: {
          set: day.locations.map((location) => ({ id: location.id })),
        },
      },
    });
  }

  async deleteDayOnPlan(planId: string, dayId: string) {
    return await prisma.plansOnDay.delete({
      where: { id: dayId },
    });
  }
}

export const planManager = new PlanManager();
