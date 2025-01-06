import { useEffect, useRef, useState } from "react";

interface CounterProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
  gameFinished: boolean;
}

export const Counter = ({ duration, isActive, onComplete, gameFinished }: CounterProps) => {
  const [timeLeft, setTimeLeft] = useState(duration); // Tiden som är kvar i sekunder
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isActive || timeLeft <= 0 || gameFinished) {
      // Om spelet är klart eller om tiden har gått ut, stoppa timern
      if (timerRef.current) {
        clearInterval(timerRef.current); // Stoppa timern
        timerRef.current = null; // Sätt referens till null
      }
      if (timeLeft <= 0) onComplete(); // När tiden är slut, anropa onComplete
      return;
    }

    // Starta timern om den är aktiv
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        if (newTimeLeft <= 0) {
          clearInterval(timerRef.current!); // Stäng av timern när tiden är slut
          timerRef.current = null;
          onComplete(); // Callback när timern är klar
        }
        return newTimeLeft;
      });
    }, 1000);

    // När komponenten unmountar eller om någon beroende ändras, rensa intervallet
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, timeLeft, onComplete, gameFinished]);

  // Omvandla sekunder till minuter och sekunder
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minuter
    </div>
  );
};