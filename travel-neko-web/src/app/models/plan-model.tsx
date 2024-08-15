const PlanSectionTypes = {
  hotel: "hotel",
  restaurant: "restaurant",
  attraction: "attraction",
} as const;

type PlanSectionTypesKey =
  (typeof PlanSectionTypes)[keyof typeof PlanSectionTypes];
interface TravelPlan {
  id: string;
  title: string;
  coverImage: string;
  plansOnDay: PlansOnDay[];
}

interface PlansOnDay {
  id: string;
  numOfDay: number;
  locations: string[];
}

interface PlanSection {
  id: string;
  type: keyof PlanSectionTypesKey;
  name: string;
  address: string;
  openingTime: string;
  time: string;
  shouldBook?: boolean;
}
