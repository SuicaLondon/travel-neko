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

export interface TravelPlan {
  id: string;
  title: string;
  coverImage?: File;
  mapType: MapTypesKey;
  plansOnDay: PlansOnDay[];
}

export interface PlansOnDay {
  id: string;
  numOfDay: number;
  locations: string[];
}

export interface PlanSection {
  id: string;
  type: keyof PlanSectionTypesKey;
  name: string;
  address: string;
  openingTime: string;
  time: string;
  shouldBook?: boolean;
}
