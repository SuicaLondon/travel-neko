import { tryJsonParse } from "./json-utils";

export const convertListToStringForObject = <T extends object>(
  object: T,
): T => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [
          key,
          value.length === 0 ? JSON.stringify([]) : JSON.stringify(value),
        ];
      }
      return [key, value];
    }),
  ) as T;
};

export const convertStringToObjectForList = <T extends object>(
  object: T,
): T => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key, tryJsonParse(value)];
    }),
  ) as T;
};
