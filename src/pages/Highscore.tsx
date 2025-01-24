import { useState, useEffect } from "react";
import { getUserSession } from "../services/CookieService";
import { ResultWrapper, TextStyleCentered } from "../components/Wrappers";
import { H2Title } from "../components/styled/Fonts";
import { ButtonArrowLeft, ButtonArrowRight, ResultBackButton } from "../components/styled/Buttons";
import { Link } from "react-router-dom";
import { PawSpinner } from "../components/PawSpinner";
import RabbitYellow from "../assets/img/rabbits/rabbit_shadow_yellow.png";
import { ScoreGrid, ResultTitle, ResultRabbit, ResultItem, PaginationControls } from "./Results";


interface UserScore {
  user_id: string;
  username: string;
  total_score: number;
  game_date: string;
  golden_rabbits: number;
}

export const Highscore = () => {
  const [, setUserScores] = useState<UserScore[]>([]);
  const [sortedScores, setSortedScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const resultsPerPage = 5;
  const totalPages = Math.ceil(sortedScores.length / resultsPerPage);

  useEffect(() => {
    const fetchScores = async () => {
      const session = getUserSession();

      if (session && session.user_id && session.token) {
        const API_URL =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

        try {
          const scoresResponse = await fetch(
            `${API_URL}/user_scores`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session.token}`,
              },
            }
          );

          const scoresData = await scoresResponse.json();

          if (scoresResponse.ok) {
            setUserScores(scoresData.scores);
            sortScores(scoresData.scores);
          } else {
            console.error("Error fetching user scores:", scoresData);
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

    fetchScores();
  }, []);

  const sortScores = (scores: UserScore[]) => {
    const sorted = [...scores];
    sorted.sort((a, b) => b.total_score - a.total_score);
    setSortedScores(sorted);
    setCurrentPage(1);
  };


  const currentScores = sortedScores.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <ResultWrapper>
      {loading ? (
        <PawSpinner />
      ) : (
        <ScoreGrid>
          <H2Title>Highscore</H2Title>
          {sortedScores.length > 0 && (
            <>
              <ResultTitle>
                <div>Användarnamn</div>
                <div>Poäng</div>
                <div>Golden Rabbits</div>
                <ResultRabbit src={RabbitYellow} />
              </ResultTitle>
            </>
          )}

          {currentScores.length > 0 ? (
            currentScores.map((score, index) => {
             // const formattedDate = score.game_date.split("T")[0];

              return (
                <ResultItem
                  key={score.user_id}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === currentScores.length - 1}
                >
                  <div>{score.username}</div>
                  <div>{score.total_score}</div>
                  <div>{score.golden_rabbits}</div>
                </ResultItem>
              );
            })
          ) : (
            <TextStyleCentered>Inga resultat funna.</TextStyleCentered>
          )}

          <PaginationControls>
            <ButtonArrowLeft
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1} />
            <ButtonArrowRight
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationControls>
        </ScoreGrid>
      )}
      <Link to={"/"}>
        <ResultBackButton>Tillbaka</ResultBackButton>
      </Link>
    </ResultWrapper>
  );
};