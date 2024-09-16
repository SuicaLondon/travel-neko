export const cacheWithTimeout = <T>(time: number, defaultValue: T) => {
  let timer: NodeJS.Timeout | null = null;
  let value: T = defaultValue;
  return async (fetchCallback: () => Promise<T>) => {
    if (timer == null) {
      value = await fetchCallback();
      timer = setTimeout(async () => {
        timer = null;
      }, time);
    }
    return value;
  };
};
