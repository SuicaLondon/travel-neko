import {
  AddDayOnPlanModel,
  AddTravelPlanModel,
  IPlansOnDay,
  ITravelPlan,
  UpdateDayOnPlanModel,
  UpdateTravelPlanModel,
} from "@/models/plan-model";
import { v4 as uuidV4 } from "uuid";
class PlanManager {
  private planList: ITravelPlan[];

  constructor() {
    this.planList = [];
  }

  getPlanList() {
    return this.planList;
  }

  getPlan(planId: string) {
    return this.planList.find((plan) => plan.id === planId);
  }

  addPlan(plan: AddTravelPlanModel) {
    this.planList.push({ ...plan, id: uuidV4(), plansOnDay: [] });
  }

  updatePlan(newPlan: UpdateTravelPlanModel, planId: string) {
    const index = this.planList.findIndex((plan) => plan.id === planId);
    if (index === -1) {
      return null;
    }
    const updatedPlan = {
      ...this.planList[index],
      ...newPlan,
    };
    this.planList[index] = updatedPlan;
    return updatedPlan;
  }

  deletePlan(planId: string) {
    const index = this.planList.findIndex((plan) => plan.id === planId);
    if (index === -1) {
      return null;
    }
    const removedPlan = this.planList.splice(index, 1);
    return removedPlan;
  }

  addDayOnPlan(planId: string, day: AddDayOnPlanModel) {
    const index = this.planList.findIndex((plan) => plan.id === planId);
    if (index === -1) {
      return null;
    }
    const newDay = { id: uuidV4(), ...day };
    this.planList[index].plansOnDay.push(newDay);
    return newDay;
  }

  updateDayOnPlan(planId: string, dayId: string, day: UpdateDayOnPlanModel) {
    const index = this.planList.findIndex((plan) => plan.id === planId);
    if (index === -1) {
      return null;
    }
    const dayIndex = this.planList[index].plansOnDay.findIndex(
      (day) => day.id === dayId,
    );
    if (dayIndex === -1) {
      return null;
    }
    this.planList[index].plansOnDay[dayIndex] = {
      ...this.planList[index].plansOnDay[dayIndex],
      ...day,
    };
    return this.planList[index].plansOnDay[dayIndex];
  }

  deleteDayOnPlan(planId: string, dayId: string) {
    const index = this.planList.findIndex((plan) => plan.id === planId);
    if (index === -1) {
      return null;
    }
    const dayIndex = this.planList[index].plansOnDay.findIndex(
      (day) => day.id === dayId,
    );
    if (dayIndex === -1) {
      return null;
    }
    const removedDay = this.planList[index].plansOnDay.splice(dayIndex, 1);
    return removedDay;
  }
}

export const planManager = new PlanManager();
