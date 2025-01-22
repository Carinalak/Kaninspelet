import { useState, useEffect } from "react";
import { getUserSession } from "../services/CookieService";
import { styled } from "styled-components";
import { KOLSVART, KRITVIT } from "../components/styled/Variables";
import { ResultWrapper } from "../components/Wrappers";

const ScoreGrid = styled.div`
  background-color: ${KRITVIT};
  border: 1px solid ${KOLSVART};
  border-radius: 10px;
  color: ${KOLSVART};
  width: 100%;
  max-width: 400px;
  padding: 20px;
  display: grid;
  grid-template-rows: auto;
  row-gap: 10px;
`;

const Title = styled.div`
  font-weight: bold;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid ${KOLSVART};
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const ResultItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid ${KOLSVART};
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
    <ResultWrapper>
      <h1>{userName ? `${userName}s resultat` : 'Mina resultat'}</h1>
      {loading ? (
        <p>Laddar...</p>
      ) : (
        <ScoreGrid>
          <Title>
            <div>Datum</div>
            <div>Poäng</div>
          </Title>
  
          {gameResults.length > 0 ? (
            gameResults.map((result, index) => {
              const parsedDate = new Date(result.game_date);
              const formattedDate = isNaN(parsedDate.getTime())
                ? 'Ogiltigt datum'
                : parsedDate.toLocaleDateString();
  
              return (
                <ResultItem key={index}>
                  <div>{formattedDate}</div>
                  <div>{result.total_score}</div>
                </ResultItem>
              );
            })
          ) : (
            <p>Inga resultat funna.</p>
          )}
        </ScoreGrid>
      )}
    </ResultWrapper>
  );
  
};
