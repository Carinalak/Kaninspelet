import { useEffect, useRef, useState } from "react";

interface CounterProps {
  isActive: boolean;
  duration?: number;
  onComplete?: () => void;
}

export const Counter = ({ isActive, duration, onComplete }: CounterProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const lastTimestamp = useRef<number | null>(null);

  useEffect(() => {
    let frameId: number;

    const updateElapsedTime = (timestamp: number) => {
      if (lastTimestamp.current !== null) {
        const delta = (timestamp - lastTimestamp.current) / 1000;
        setElapsedTime((prev) => {
          const nextTime = prev + delta;

          if (duration && nextTime >= duration) {
            onComplete?.();
            return duration;
          }

          return nextTime;
        });
      }
      lastTimestamp.current = timestamp;
      frameId = requestAnimationFrame(updateElapsedTime);
    };

    if (isActive) {
      frameId = requestAnimationFrame(updateElapsedTime);
    } else {
      lastTimestamp.current = null;
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isActive, duration, onComplete]);

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = Math.floor(elapsedTime % 60);

  return (
    <div>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minuter
    </div>
  );
};