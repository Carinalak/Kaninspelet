// Denna komponent skickar poängen till backend
import  { useEffect } from 'react';
import { getUserSession } from '../services/CookieService';


interface ScoreManagerProps {
  score: number;
  elapsedTime: number;
  gameFinished: boolean;
}

export const ScoreManager = ({ score, elapsedTime, gameFinished }: ScoreManagerProps) => {
  useEffect(() => {
    if (gameFinished) {
      const saveGameResult = async () => {
        const user = getUserSession();
        const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        
        if (user) {
          console.log('Saving game result...');
          console.log('User ID:', user.id);
          console.log('Score:', score);
          console.log('Elapsed Time:', elapsedTime);

          const response = await fetch(`${API_URL}/game_results`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              user_id: user.id,
              total_score: score,
              time_taken: elapsedTime,
            }),
          });

          const data = await response.json();
          if (response.ok) {
            console.log("Result saved:", data);
          } else {
            console.error("Error saving result:", data);
          }
        }
      };

      saveGameResult();
    }
  }, [gameFinished, score, elapsedTime]);

  return null;
};