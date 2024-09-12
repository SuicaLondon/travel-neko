import {
  AddTravelPlanModel,
  ITravelPlan,
  UpdateTravelPlanModel,
} from "@/models/plan-model";

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
}

export const planManager = new PlanManager();
function uuidV4(): string {
  throw new Error("Function not implemented.");
}
