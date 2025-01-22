// Denna komponent skickar poängen till backend
import { useEffect } from "react";
import { getUserSession } from "../services/CookieService";

interface ScoreManagerProps {
  score: number;
  elapsedTime: number;
  gameFinished: boolean;
}

export const ScoreManager = ({ score, elapsedTime, gameFinished }: ScoreManagerProps) => {
  useEffect(() => {
    const saveGameResult = async () => {
      const session = getUserSession();

      if (!session || !session.user_id) {
        console.error("Ingen giltig användarsession hittades.");
        return;
      }

      const userId = session.user_id;

      try {
        const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await fetch(`${API_URL}/game_results`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.token}`,
            },
            body: JSON.stringify({
              user_id: userId,
              score: score,
              elapsed_time: elapsedTime,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.error("Error saving result: ", error);
        } else {
          console.log("Game result saved successfully!");
        }
      } catch (error) {
        console.error("Ett fel inträffade vid sparning av resultat: ", error);
      }
    };

    if (gameFinished) {
      console.log("Saving game result...");
      console.log("Score:", score);
      console.log("Elapsed Time:", elapsedTime);

      saveGameResult();
    }
  }, [gameFinished, score, elapsedTime]);

  return null;
};