import { tryJsonParse } from "./json-utils";

export const convertListToStringForObject = (object: object): object => {
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
  );
};

export const convertStringToObjectForList = (object: object): object => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key, tryJsonParse(value)];
    }),
  );
};
