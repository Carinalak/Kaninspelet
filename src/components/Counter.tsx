import { useEffect, useRef, useState } from "react";

interface CounterProps {
  isActive: boolean;
  duration?: number; // Total tid i sekunder, standardvärdet används om inte angivet
  onComplete?: () => void;
}

export const Counter = ({ isActive, duration = 180, onComplete }: CounterProps) => {
  const [remainingTime, setRemainingTime] = useState(duration); // Startar med 3 minuter (180 sekunder)
  const lastTimestamp = useRef<number | null>(null);

  useEffect(() => {
    let frameId: number;

    const updateRemainingTime = (timestamp: number) => {
      if (lastTimestamp.current !== null) {
        const delta = (timestamp - lastTimestamp.current) / 1000; // Delta i sekunder
        setRemainingTime((prev) => {
          const nextTime = prev - delta;

          if (nextTime <= 0) {
            onComplete?.();
            return 0;
          }

          return nextTime;
        });
      }
      lastTimestamp.current = timestamp;
      frameId = requestAnimationFrame(updateRemainingTime);
    };

    if (isActive) {
      frameId = requestAnimationFrame(updateRemainingTime);
    } else {
      lastTimestamp.current = null;
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isActive, onComplete]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);

  return (
    <div>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minuter
    </div>
  );
};