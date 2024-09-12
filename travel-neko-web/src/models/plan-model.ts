export const MapTypes = {
  google: "google",
  apple: "apple",
};
type MapTypesKey = (typeof MapTypes)[keyof typeof MapTypes];

export const PlanSectionTypes = {
  hotel: "hotel",
  restaurant: "restaurant",
  attraction: "attraction",
} as const;

export type PlanSectionTypesKey =
  (typeof PlanSectionTypes)[keyof typeof PlanSectionTypes];

export interface ITravelPlan {
  id: string;
  title: string;
  coverImage?: string;
  mapType: MapTypesKey;
  plansOnDay: IPlansOnDay[];
}

export interface IPlansOnDay {
  id: string;
  numOfDay: number;
  locations: IPlanSection[];
}

export interface IPlanSection {
  id: string;
  type: keyof PlanSectionTypesKey;
  name: string;
  address: string;
  openingTime: string;
  time: string;
  shouldBook?: boolean;
}

export type AddTravelPlanModel = Pick<
  ITravelPlan,
  "title" | "coverImage" | "mapType"
>;
