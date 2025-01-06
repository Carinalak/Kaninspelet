import { useEffect, useRef, useState } from "react";

interface CounterProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
  gameFinished: boolean;
}

export const Counter = ({ duration, isActive, onComplete, gameFinished }: CounterProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0); // Startar på 0 och räknar upp
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isActive || gameFinished) {
      // Stoppa timern om den inte är aktiv eller om spelet är klart
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Starta timern om den är aktiv
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => {
        // När timern når den angivna durationen (slut)
        if (prev >= duration) {
          clearInterval(timerRef.current!);
          onComplete(); // Kalla onComplete för att meddela att tiden är slut
          return prev;
        }
        return prev + 1; // Öka tiden varje sekund
      });
    }, 1000);

    // Rensa intervallet när komponenten unmountar eller när isActive ändras
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, duration, onComplete, gameFinished]);

  // Omvandla sekunder till minuter och sekunder
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  return (
    <div>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minuter
    </div>
  );
};
