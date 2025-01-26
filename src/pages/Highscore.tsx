import styled from "styled-components";
import { useState, useEffect } from "react";
import { getUserSession } from "../services/CookieService";
import { ResultWrapper, TextStyleCentered } from "../components/Wrappers";
import { H2Title } from "../components/styled/Fonts";
import { ButtonArrowLeft, ButtonArrowRight, ResultBackButton } from "../components/styled/Buttons";
import { Link } from "react-router-dom";
import { PawSpinner } from "../components/PawSpinner";
import RabbitYellow from "../assets/img/rabbits/rabbit_shadow_yellow.png";
import { ScoreGrid, ResultRabbit, PaginationControls, PaginationInner } from "./Results";
import { KRITVIT, BREAKPOINT_TABLET, GAMMELROSA, SKUGGLILA, SOLGUL } from "../components/styled/Variables";
import { format } from "date-fns";

interface ApiScore {
  user_id: string;
  total_score: number;
  golden_rabbits: number;
  game_date: string;
  users?: {
    name: string;
  };
}

interface UserScore {
  user_id: string;
  name: string;
  total_score: number;
  game_date: string;
  golden_rabbits: number;
}

export const HighScoreTitle = styled.div`
  font-weight: bold;
  display: grid;
  grid-template-columns: 1.8fr 1.2fr 0.8fr 2.6fr;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    grid-template-columns: 1.8fr 1fr 0.8fr 2.0fr;
  }
`;

export const HighScoreItem = styled.div<{ index: number; isFirst: boolean; isLast: boolean; isCurrentUser: boolean }>`
  display: grid;
  grid-template-columns: 2fr 0.8fr 0.7fr 2.7fr;
  row-gap: 10px;
  padding: 10px 0;
  background-color: ${({ index }) => (index % 2 === 0 ? `${GAMMELROSA}` : `${SKUGGLILA}`)};
  color: ${({ isCurrentUser }) => (isCurrentUser ? `${SOLGUL}` : `${KRITVIT}`)};
  font-weight: 600;
  padding-left: 10px;

  border-radius: ${({ isFirst, isLast }) =>
    isFirst ? "10px 10px 0 0" : isLast ? "0 0 10px 10px" : "0"};
  border-left: 1px solid ${SKUGGLILA};
  border-right: 1px solid ${SKUGGLILA};
  border-top: ${({ isFirst }) => (isFirst ? `1px solid ${SKUGGLILA}` : "none")};
  border-bottom: ${({ isLast }) => (isLast ? `1px solid ${SKUGGLILA}` : "none")};

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    grid-template-columns: 1.8fr 1fr 0.8fr 2.2fr;
  }
`;

export const Highscore = () => {
  const [sortedScores, setSortedScores] = useState<UserScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const resultsPerPage = 8;
  const totalPages = Math.ceil(sortedScores.length / resultsPerPage);

  useEffect(() => {
    const fetchScores = async () => {
      const session = getUserSession();

      if (session && session.user_id && session.token) {
        setCurrentUserId(session.user_id);
        const API_URL =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

        try {
          const scoresResponse = await fetch(`${API_URL}/game_results`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          });

          const scoresData: ApiScore[] = await scoresResponse.json();

          if (scoresResponse.ok) {
            const mappedScores = scoresData.map((score) => ({
              user_id: score.user_id,
              name: score.users?.name || "Okänd",
              total_score: score.total_score,
              golden_rabbits: score.golden_rabbits,
              game_date: score.game_date,
            }));

            sortScores(mappedScores);
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

  // Padding the results to fill up the page with empty rows
  const paddedScores: (UserScore | null)[] = [...currentScores];
  while (paddedScores.length < resultsPerPage) {
    paddedScores.push(null);
  }

  const handleLinkClick = () => {
    const topElement = document.getElementById("top");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <ResultWrapper>
      {loading ? (
        <PawSpinner />
      ) : (
        <ScoreGrid key={currentPage}>
          <H2Title>Toppresultat</H2Title>
          {sortedScores.length > 0 && (
            <>
              <HighScoreTitle>
                <div>Namn</div>
                <div>Poäng</div>
                <ResultRabbit src={RabbitYellow} />
                <div>Datum</div>
              </HighScoreTitle>
            </>
          )}

          {sortedScores.length > 0 ? (
            paddedScores.map((score, index) => {
              if (score) {
                const formattedDate = format(new Date(score.game_date), "dd MMMM yyyy");
                return (
                  <HighScoreItem
                    key={`${score.user_id}-${index}`}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === paddedScores.length - 1}
                    isCurrentUser={score.user_id === currentUserId}
                  >
                    <div>{score.name}</div>
                    <div>{score.total_score}</div>
                    <div>{score.golden_rabbits}</div>
                    <div>{formattedDate}</div>
                  </HighScoreItem>
                );
              } else {
                return (
                  <HighScoreItem
                    key={`empty-${index}`}
                    index={index}
                    isFirst={index === 0}
                    isLast={index === paddedScores.length - 1}
                    isCurrentUser={false}
                  >
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                  </HighScoreItem>
                );
              }
            })
          ) : (
            <TextStyleCentered>Inga resultat funna.</TextStyleCentered>
          )}

          <PaginationControls>
            <ButtonArrowLeft
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            />
            <PaginationInner>
              Sida {currentPage} av {totalPages}
            </PaginationInner>
            <ButtonArrowRight
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationControls>
        </ScoreGrid>
      )}
      <Link to={"/"} onClick={handleLinkClick}>
        <ResultBackButton>Tillbaka</ResultBackButton>
      </Link>
    </ResultWrapper>
  );
};