import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("delays the execution of the callback function", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 500));

    act(() => {
      result.current("test");
      result.current("test2"); // Overwrites the previous call before timeout
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("test2");
  });

  it("calls the callback only once when called multiple times within delay", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 300));

    act(() => {
      result.current("call1");
      jest.advanceTimersByTime(100);
      result.current("call2");
      jest.advanceTimersByTime(100);
      result.current("call3");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith("call3");
  });

  it("resets the timer when unmounted", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useDebounce(callback, 400));

    act(() => {
      result.current("test");
      unmount();
      jest.advanceTimersByTime(400);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
