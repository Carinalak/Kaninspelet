import { useState, useEffect } from "react";
import { getUserSession } from "../services/CookieService";
import { styled } from "styled-components";
import { BREAKPOINT_TABLET, GAMMELROSA, KOLSVART, KRITVIT, SKUGGLILA } from "../components/styled/Variables";
import { ResultWrapper } from "../components/Wrappers";
import { H2Title } from "../components/styled/Fonts";
import { ResultBackButton } from "../components/styled/Buttons";
import { Link } from "react-router-dom";

const ScoreGrid = styled.div`
  background-color: ${KRITVIT};
  border-radius: 10px;
  color: ${KOLSVART};
  width: 100%;
  max-width: 300px;
  padding: 20px;
  display: grid;
  grid-template-rows: auto;
  border: 1px solid black;
  padding-bottom: 150px;

      @media screen and (min-width: ${BREAKPOINT_TABLET}) {
        max-width: 400px;
      }
`;

const Title = styled.div`
  font-weight: bold;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  //border-bottom: 2px solid ${KOLSVART};
  //padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const ResultItem = styled.div<{ index: number; isFirst: boolean; isLast: boolean }>`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  row-gap: 10px;
  padding: 10px 0;
  background-color: ${({ index }) => (index % 2 === 0 ? `${GAMMELROSA}` : `${SKUGGLILA}`)};
  color: ${KRITVIT};
  font-weight: 600;
  padding-left: 10px;

  border-radius: ${({ isFirst, isLast }) =>
    isFirst ? "10px 10px 0 0" : isLast ? "0 0 10px 10px" : "0"};
    
  border-left: 1px solid ${SKUGGLILA};
  border-right: 1px solid ${SKUGGLILA};

  border-top: ${({ isFirst }) => (isFirst ? `1px solid ${SKUGGLILA}` : "none")};
  border-bottom: ${({ isLast }) => (isLast ? `1px solid ${SKUGGLILA}` : "none")};

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    grid-template-columns: 2fr 1fr 1fr;
    }
`;

interface GameResult {
  total_score: number;
  game_date: string;
  golden_rabbits: number;
}

export const Results = () => {
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchResults = async () => {
      const session = getUserSession();

      if (session && session.user_id && session.token) {
        const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

        try {
          // Hämta både spelresultaten och användarens namn
          const [resultsResponse, userResponse] = await Promise.all([
            fetch(`${API_URL}/game_results/${session.user_id}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.token}`,
              },
            }),
            fetch(`${API_URL}/users`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.token}`,
              },
            }),
          ]);

          const resultsData = await resultsResponse.json();
          const userData = await userResponse.json();

          if (resultsResponse.ok && userResponse.ok) {
            setGameResults(resultsData.results);
            //setUserName(userData.name);
          } else {
            console.error("Error fetching game results or user data:", resultsData, userData);
          }
        } catch (error) {
          console.error("Error:", error);
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
      {/* <h1>{userName ? `${userName}s resultat` : "Mina resultat"}</h1>*/}
      
      {loading ? (
        <p>Laddar...</p>
      ) : (
        <ScoreGrid>
          <H2Title>Mina resultat</H2Title>
          <Title>
            <div>Datum</div>
            <div>Poäng</div>
            <div>Guldkaniner</div>
          </Title>

          {gameResults.length > 0 ? (
            gameResults.map((result, index) => {
              const parsedDate = new Date(result.game_date);
              const formattedDate = isNaN(parsedDate.getTime())
                ? "Ogiltigt datum"
                : parsedDate.toLocaleDateString();

              return (
                <ResultItem
                key={index}
                index={index}
                isFirst={index === 0}
                isLast={index === gameResults.length - 1}
              >
                  <div>{formattedDate}</div>
                  <div>{result.total_score}</div>
                  <div>{result.golden_rabbits}</div>
                </ResultItem>
              );
            })
          ) : (
            <p>Inga resultat funna.</p>
          )}
          
        </ScoreGrid>
      )}
      <Link to={"/"} ><ResultBackButton>Tillbaka</ResultBackButton></Link>
    </ResultWrapper>
  );
};