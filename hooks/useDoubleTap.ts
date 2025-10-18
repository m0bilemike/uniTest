import { useCallback, useRef } from "react";

/**
 * Returns a callback that detects double taps.
 * Only triggers onDoubleTap if two taps occur within `delay` ms.
 */
export function useDoubleTap(onDoubleTap: () => void, delay = 300) {
  const lastTapRef = useRef<number | null>(null);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < delay) {
      // Double tap detected
      onDoubleTap();
      lastTapRef.current = null; // reset
    } else {
      // First tap
      lastTapRef.current = now;
    }
  }, [onDoubleTap, delay]);

  return handleTap;
}
