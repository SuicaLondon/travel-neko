import { useEffect, useRef } from "react";

export function useUnmount(callback: () => void) {
  const funcRef = useRef(callback);

  funcRef.current = callback;

  useEffect(
    () => () => {
      funcRef.current();
    },
    [],
  );
}
