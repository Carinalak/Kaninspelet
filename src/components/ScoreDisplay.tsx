import { useEffect, useState } from "react";
import { ScoreDisplayStyle, PlayQuestionBox, ScoreDisplayInnerBunnies } from "./styled/ScoreDisplayStyle";
import RabbitBlack from "../assets/img/rabbits/rabbit_shadow_black.png";
import RabbitYellow from "../assets/img/rabbits/rabbit_shadow_yellow.png";
import { GameButton, MenuButton } from "./styled/Buttons";
import { Question, StyledLink, TextStyleInloggad } from "./Wrappers";
import { Counter } from "./Counter";
import { Login } from "../pages/Login";
import { getUserSession } from "../services/CookieService";

interface ScoreDisplayProps {
  score: number;
  onStartGame: () => void;
  gameStarted: boolean;
  question: string;
  gameFinished: boolean;
  goldenRabbits: number;
  elapsedTime: number;
  totalScore: number;
  onClose: () => void;
}

export const ScoreDisplay = ({
  score,
  onStartGame,
  gameStarted,
  question,
  gameFinished,
  elapsedTime,
  onClose,
}: ScoreDisplayProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const session = getUserSession();
    if (session) {
      setIsLoggedIn(true);
      setUserName(session.user.name);
    }
  }, []);

  const levels = Math.floor(score / 5);
  const bonusPoints = levels * 2;
  const totalScore = score + bonusPoints;

  const yellowBunniesCount = Math.floor(score / 5);
  const rabbits = new Array(5).fill(RabbitBlack).map((_, index) =>
    index < yellowBunniesCount ? RabbitYellow : RabbitBlack
  );

  const handleStartGame = () => {
    onStartGame();
  };

  const handleCancelGame = () => {
    console.log("Spelet avbryts");
    onClose();
  };

  const minutes = !isNaN(elapsedTime) ? Math.floor(elapsedTime / 60) : 0;
  const seconds = !isNaN(elapsedTime) ? elapsedTime % 60 : 0;

  return (
    <ScoreDisplayStyle>
      {!isLoggedIn ? (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            const session = getUserSession();
            setUserName(session?.user.name || null);
          }}
        />
      ) : (
        <PlayQuestionBox>
          <TextStyleInloggad>Inloggad som: {userName}</TextStyleInloggad>

          {gameStarted ? (
            <>
              <Question>{question} =</Question>
              <GameButton onClick={handleCancelGame} style={{ marginTop: "10px" }}>
                Avbryt spel
              </GameButton>
              <ScoreDisplayInnerBunnies>
                <div>Poäng: {totalScore}</div>
                <div className="timer-row">
                  Tid:{" "}
                  {!gameFinished && (
                    <Counter duration={120} isActive={gameStarted && !gameFinished} />
                  )}
                  {gameFinished && (
                    <div>
                      {minutes}:{seconds.toString().padStart(2, "0")} minuter
                    </div>
                  )}
                </div>
                <div className="rabbits-row">
                  {rabbits.map((rabbit, index) => (
                    <img key={index} src={rabbit} alt={`Rabbit ${index + 1}`} className="rabbit-image" />
                  ))}
                </div>
              </ScoreDisplayInnerBunnies>
            </>
          ) : (
            <>
              <MenuButton onClick={handleStartGame}>Spela</MenuButton>
              <StyledLink to="/spelregler">
                <MenuButton>Spelregler</MenuButton>
              </StyledLink>
              <StyledLink to="/results">
                <MenuButton>Mina resultat</MenuButton>
              </StyledLink>
              <MenuButton
                onClick={() => {
                  setIsLoggedIn(false);
                  setUserName(null);
                  onClose();
                }}
              >
                Logga ut
              </MenuButton>
            </>
          )}
        </PlayQuestionBox>
      )}
    </ScoreDisplayStyle>
  );
};