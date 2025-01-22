import { useState, useEffect } from "react";
import { getUserSession } from "../services/CookieService";

export const Results = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gameResults, setGameResults] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchResults = async () => {
      const user = getUserSession();
      if (user) {
        const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
        const response = await fetch(`${API_URL}/game_results/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setGameResults(data.results);
        } else {
          console.error('Error fetching game results:', data);
        }
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h1>My Results</h1>
      <ul>
        {gameResults.map((result, index) => (
          <li key={index}>
            <div>Score: {result.total_score}</div>
            <div>Date: {new Date(result.created_at).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
