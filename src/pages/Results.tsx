import { useState, useEffect } from "react";
import { getUserSession } from "../services/CookieService";
import { styled } from "styled-components";
import { KRITVIT } from "../components/styled/Variables";

const ScoreList = styled.ul `
  background-color: "${KRITVIT}";
  border: 1px solid ${KRITVIT};
  color: "${KRITVIT}";
`;

interface GameResult {
  total_score: number;
  game_date: string;
}

export const Results = () => {
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('');


  useEffect(() => {
    const fetchResults = async () => {
      const session = getUserSession();
  
      if (session && session.user_id && session.token) {
        const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  
        try {
          // Hämta både spelresultaten och användarens namn
          const [resultsResponse, userResponse] = await Promise.all([
            fetch(`${API_URL}/game_results/${session.user_id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${session.token}`,
              },
            }),
            fetch(`${API_URL}/users`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${session.token}`,
              },
            }),
          ]);
  
          const resultsData = await resultsResponse.json();
          const userData = await userResponse.json();
  
          if (resultsResponse.ok && userResponse.ok) {
            setGameResults(resultsData.results);
            setUserName(userData.name);
          } else {
            console.error('Error fetching game results or user data:', resultsData, userData);
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Användarsession saknas eller är ogiltig.");
        setLoading(false);
      }
    };
  
    fetchResults();
  }, []);

  return (
    <div>
      <h1>{userName ? `${userName}s resultat` : 'Mina resultat'}</h1>
      {loading ? (
        <p>Laddar...</p>
      ) : (
        <ScoreList>
          {gameResults.length > 0 ? (
            gameResults.map((result, index) => {
              console.log('Result object:', result);
              console.log('Raw date string:', result.game_date);
  
              const parsedDate = new Date(result.game_date);
  
              const formattedDate = isNaN(parsedDate.getTime())
                ? 'Ogiltigt datum'
                : parsedDate.toLocaleDateString();
  
              return (
                <li key={index}>
                  <div>Poäng: {result.total_score}</div>
                  <div>Datum: {formattedDate}</div>
                </li>
              );
            })
          ) : (
            <p>Inga resultat funna.</p>
          )}
        </ScoreList>
      )}
    </div>
  );
}  