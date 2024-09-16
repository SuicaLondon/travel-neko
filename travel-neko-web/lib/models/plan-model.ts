import {
  AddDayOnPlanModel,
  AddTravelPlanModel,
  UpdateDayOnPlanModel,
  UpdateTravelPlanModel,
} from "@/models/plan-model";
import {
  convertListToStringForObject,
  convertStringToObjectForList,
} from "@/utils/redis-utils";
import { TravelPlan } from "@prisma/client";
import prisma from "lib/prisma";
import redis from "lib/redis";

const PLAN_LIST_ID_SET_CACHE_KEY = "plans";
const PLAN_LIST_CACHE_KEY = "plan:";

class PlanManager {
  async getPlanList() {
    const cachedIds = await redis.zrange(PLAN_LIST_ID_SET_CACHE_KEY, 0, -1);
    if (cachedIds.length > 0) {
      const cachedList = await Promise.all(
        cachedIds.map((id) => redis.hgetall(PLAN_LIST_CACHE_KEY + id)),
      );

      return cachedList;
    }

    const planList = await prisma.travelPlan.findMany({
      include: {
        plansOnDay: {
          include: {
            locations: true,
          },
        },
      },
    });

    await Promise.all(planList.map((plan) => this.addPlanCache(plan)));
    return planList;
  }

  async getPlan(planId: string) {
    const result = await redis.hgetall(PLAN_LIST_CACHE_KEY + planId);
    const cachedPlan = convertStringToObjectForList(result);
    if (Object.keys(cachedPlan).length > 0) {
      return cachedPlan;
    }

    const plan = await prisma.travelPlan.findUnique({
      where: { id: planId },
      include: {
        plansOnDay: {
          include: {
            locations: true,
          },
        },
      },
    });

    if (plan) {
      await this.addPlanCache(plan);
    }
    return plan;
  }

  async addPlan(plan: AddTravelPlanModel) {
    const addedPlan = await prisma.travelPlan.create({
      data: {
        ...plan,
        plansOnDay: {
          create: [],
        },
      },
      include: {
        plansOnDay: {
          include: {
            locations: true,
          },
        },
      },
    });
    console.log(addedPlan);
    await this.addPlanCache(addedPlan);
    return addedPlan;
  }

  async updatePlan(newPlan: UpdateTravelPlanModel, planId: string) {
    const updatedPlan = await prisma.travelPlan.update({
      where: { id: planId },
      data: newPlan,
      include: {
        plansOnDay: {
          include: {
            locations: true,
          },
        },
      },
    });
    await this.updatePlanCache(updatedPlan);
    return updatedPlan;
  }

  async deletePlan(planId: string) {
    const deletedPlan = await prisma.travelPlan.delete({
      where: { id: planId },
      include: {
        plansOnDay: {
          include: {
            locations: true,
          },
        },
      },
    });
    await this.deletePlanCache(planId);
    return deletedPlan;
  }

  async addDayOnPlan(planId: string, day: AddDayOnPlanModel) {
    const plan = await this.getPlan(planId);
    if (!plan) {
      return null;
    }
    const planOnDay = await prisma.plansOnDay.create({
      data: {
        ...day,
        travelPlanId: planId,
        locations: {
          create: [],
        },
      },
      include: {
        locations: true,
      },
    });
    if (plan && Array.isArray(plan.plansOnDay)) {
      plan.plansOnDay.push(planOnDay);
      await this.updatePlanCache(plan as TravelPlan);
    }
    return plan;
  }

  async updateDayOnPlan(
    planId: string,
    dayId: string,
    day: UpdateDayOnPlanModel,
  ) {
    const plan = await this.getPlan(planId);
    if (!plan) {
      return null;
    }
    const planOnDay = await prisma.plansOnDay.update({
      where: { id: dayId },
      data: {
        ...day,
        locations: {
          set: day.locations.map((location) => ({ id: location.id })),
        },
      },
    });
    if (plan && Array.isArray(plan.plansOnDay)) {
      const index = plan.plansOnDay.findIndex((day) => day.id === dayId);
      if (index !== -1) {
        plan.plansOnDay[index] = { ...plan.plansOnDay[index], ...planOnDay };
        await this.updatePlanCache(plan as TravelPlan);
      }
    }
    return plan;
  }

  async deleteDayOnPlan(planId: string, dayId: string) {
    const plan = await this.getPlan(planId);
    if (!plan) {
      return null;
    }
    const deletedDay = await prisma.plansOnDay.delete({
      where: { id: dayId },
    });
    if (plan && Array.isArray(plan.plansOnDay)) {
      const index = plan.plansOnDay.findIndex((day) => day.id === dayId);
      if (index !== -1) {
        plan.plansOnDay.splice(index, 1);
        await this.updatePlanCache(plan as TravelPlan);
      }
    }
    return plan;
  }

  private async addPlanCache(plan: TravelPlan) {
    const convertedPlan = convertListToStringForObject(plan);
    return Promise.all([
      redis.zadd(PLAN_LIST_ID_SET_CACHE_KEY, Date.now(), plan.id),
      redis.expire(PLAN_LIST_ID_SET_CACHE_KEY, 3600),
      redis.hset(PLAN_LIST_CACHE_KEY + plan.id, convertedPlan),
      redis.expire(PLAN_LIST_CACHE_KEY + plan.id, 3600),
    ]);
  }

  private async updatePlanCache(plan: TravelPlan) {
    const convertedPlan = convertListToStringForObject(plan);
    return redis.hset(PLAN_LIST_CACHE_KEY + plan.id, convertedPlan);
  }

  private async deletePlanCache(planId: string) {
    return Promise.all([
      redis.hdel(PLAN_LIST_CACHE_KEY + planId, "*"),
      redis.zrem(PLAN_LIST_ID_SET_CACHE_KEY, planId),
    ]);
  }
}

export const planManager = new PlanManager();
