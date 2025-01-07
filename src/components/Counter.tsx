import { useEffect, useRef, useState } from "react";

interface CounterProps {
  isActive: boolean; // Timern körs endast om denna är true
  duration?: number; // Maximal tid i sekunder
  onComplete?: () => void; // Callback när timern når max-tiden
}

export const Counter = ({ isActive, duration, onComplete }: CounterProps) => {
  const [elapsedTime, setElapsedTime] = useState(0); // Tid som gått
  const lastTimestamp = useRef<number | null>(null); // För att spåra tid mellan uppdateringar

  useEffect(() => {
    let frameId: number;

    const updateElapsedTime = (timestamp: number) => {
      if (lastTimestamp.current !== null) {
        const delta = (timestamp - lastTimestamp.current) / 1000; // Skillnad i sekunder
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
      lastTimestamp.current = null; // Pausa tidräkningen
    }

    return () => {
      cancelAnimationFrame(frameId); // Rensa animation frame vid avmontering
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
