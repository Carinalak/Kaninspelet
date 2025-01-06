import { useState, useEffect } from "react";

interface CounterProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
  onTick?: (elapsedTime: number) => void;
  gameFinished: boolean; 
}

export const Counter = ({ duration, isActive, onComplete, onTick, gameFinished }: CounterProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive || timeLeft <= 0 || gameFinished) { // Stoppa när spelet är klart
      if (timeLeft <= 0) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        if (newTimeLeft <= 0) {
          clearInterval(timer);
          onComplete();
        }
        return newTimeLeft;
      });

      if (onTick) onTick(timeLeft); // Uppdatera tiden varje sekund
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onComplete, onTick, gameFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return <span>{formatTime(timeLeft)}</span>;
};
