import { useEffect, useState } from "react";
import {
  ScoreDisplayStyle,
  PlayQuestionBox,
  ScoreDisplayInnerBunnies,
} from "./styled/ScoreDisplayStyle";
import RabbitBlack from "../assets/img/rabbits/rabbit_shadow_black.png";
import RabbitYellow from "../assets/img/rabbits/rabbit_shadow_yellow.png";
import { GameButton, MenuButton } from "./styled/Buttons";
import { Question, TextStyle, TextStyleInloggad, TextWrapper } from "./Wrappers";
import { Counter } from "./Counter";
import { Login } from "../pages/Login";

interface ScoreDisplayProps {
  score: number;
  onStartGame: () => void;
  //onEndGame: () => void;
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
  //onEndGame,
  gameStarted,
  question,
  gameFinished,
  elapsedTime,
  onClose,

}: ScoreDisplayProps) => {
  const [showRules, setShowRules] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(parsedUser?.name || null);
      } catch (error) {
        console.error("Kunde inte parsa användarens JSON-data:", error);
      }
    }
  }, []);

  const levels = Math.floor(score / 5);
  const bonusPoints = levels * 2;
  const totalScore = score + bonusPoints;

  const yellowBunniesCount = Math.floor(score / 5);
  const rabbits = new Array(5).fill(RabbitBlack).map((_, index) =>
    index < yellowBunniesCount ? RabbitYellow : RabbitBlack
  );

  const toggleRules = () => setShowRules(!showRules);

  const handleStartGame = () => {
    onStartGame();
  };

  const handleCancelGame = () => {
    console.log("Spelet avbryts");
    //setScore(0);
    //setElapsedTime(0);
    //onEndGame();
    onClose();
  };

  const minutes = !isNaN(elapsedTime) ? Math.floor(elapsedTime / 60) : 0;
  const seconds = !isNaN(elapsedTime) ? elapsedTime % 60 : 0;
/*
  function onTimeUp(): void {
    throw new Error("Function not implemented.");
  }
*/
  return (
    <ScoreDisplayStyle>
      {!isLoggedIn ? (
        <Login
          onLogin={() => {
            setIsLoggedIn(true);
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            setUserName(user?.name || null);
          }}
        />
      ) : (
        <PlayQuestionBox>
          <TextStyleInloggad>Inloggad som: {userName}</TextStyleInloggad>
          
          {gameStarted ? (
            <>
              <Question>{question} =</Question>
              <GameButton
                onClick={handleCancelGame}
                style={{ marginTop: "10px" }}
              >
                Avbryt spel
              </GameButton>
              <ScoreDisplayInnerBunnies>
                <div>Poäng: {totalScore}</div>
                <div className="timer-row">
                  Tid:{" "}
                  {!gameFinished && (
                    <Counter
                      duration={120}
                      isActive={gameStarted && !gameFinished}
                      //onComplete={onTimeUp}
                      
                    />
                  )}
                  {gameFinished && (
                    <div>
                      {minutes}:{seconds.toString().padStart(2, "0")} minuter
                    </div>
                  )}
                </div>
                <div className="rabbits-row">
                  {rabbits.map((rabbit, index) => (
                    <img
                      key={index}
                      src={rabbit}
                      alt={`Rabbit ${index + 1}`}
                      className="rabbit-image"
                    />
                  ))}
                </div>
              </ScoreDisplayInnerBunnies>
            </>
          ) : (
            <>
              {!showRules ? (
                <>
                  <MenuButton onClick={handleStartGame}>Spela</MenuButton>
                  <MenuButton onClick={toggleRules}>
                    {showRules ? "Tillbaka" : "Spelregler"}
                  </MenuButton>
                  <MenuButton>Mina resultat</MenuButton>
                  <MenuButton
                    onClick={() => {
                      localStorage.removeItem("user");
                      setIsLoggedIn(false);
                      setUserName(null);
                    }}
                  >
                    Logga ut
                  </MenuButton>
                </>
              ) : (
                <MenuButton onClick={toggleRules}>Tillbaka</MenuButton>
              )}
            </>
          )}

          {showRules && (
            <TextWrapper>
              <TextStyle>
                Lös mattetalet och välj kortet med rätt svar för att hitta en
                kanin! En kanin ger 1 poäng. För 5 kaniner får du en guldkanin,
                som ger 2 poäng extra. Du har 5 minuter på dig.
              </TextStyle>
            </TextWrapper>
          )}
        </PlayQuestionBox>
      )}
    </ScoreDisplayStyle>
  );
};