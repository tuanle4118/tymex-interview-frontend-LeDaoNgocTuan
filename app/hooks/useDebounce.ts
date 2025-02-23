import { useCallback } from "react";

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  return useCallback(debounce(callback, delay), [callback, delay]);
}
