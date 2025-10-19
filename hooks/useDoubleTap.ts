import { useCallback, useRef } from "react";

export function useDoubleTap(onDoubleTap: () => void, delay = 300) {
  const lastTapRef = useRef<number | null>(null);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < delay) {
      onDoubleTap();
      lastTapRef.current = null;
    } else {
      lastTapRef.current = now;
    }
  }, [onDoubleTap, delay]);

  return handleTap;
}
