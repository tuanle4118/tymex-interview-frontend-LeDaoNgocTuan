import { useCallback, useEffect, useRef } from "react";

function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number = 300,
) {
  let timer: ReturnType<typeof setTimeout>;

  const debouncedFunction = (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timer);
  };

  return debouncedFunction;
}

export function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = useCallback(
    debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay),
    [delay],
  );

  useEffect(() => {
    return () => {
      debouncedFunction.cancel?.(); // Ensure cleanup on unmount
    };
  }, [debouncedFunction]);

  return debouncedFunction;
}
