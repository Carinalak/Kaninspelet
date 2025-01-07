import { useState } from "react";
import { ScoreDisplayStyle, PlayQuestionBox, ScoreDisplayInnerBunnies } from "./styled/ScoreDisplayStyle";
import RabbitBlack from "../assets/img/rabbits/rabbit_shadow_black.png";
import RabbitYellow from "../assets/img/rabbits/rabbit_shadow_yellow.png";
import { GameButton, RuleButton } from "./styled/Buttons";
import { TextWrapper, Question, TextStyle } from "./Wrappers";
import { Counter } from "./Counter";

interface ScoreDisplayProps {
  score: number;
  onStartGame: () => void;
  gameStarted: boolean;
  question: string;
  gameFinished: boolean;
  elapsedTime: number; // Lägg till elapsedTime som en prop
}

export const ScoreDisplay = ({
  score,
  onStartGame,
  gameStarted,
  question,
  gameFinished,
  elapsedTime,
}: ScoreDisplayProps) => {
  const [showRules, setShowRules] = useState(false);

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

  const minutes = !isNaN(elapsedTime) ? Math.floor(elapsedTime / 60) : 0;
  const seconds = !isNaN(elapsedTime) ? elapsedTime % 60 : 0;
/*
  const handleComplete = () => {
    console.log("Timer completed!");
  
  };*/

  return (
    <ScoreDisplayStyle>
      <PlayQuestionBox>
        {gameStarted ? (
          <>
            <Question>{question} =</Question>
          </>
        ) : (
          <>
            {!showRules && (
              <GameButton onClick={handleStartGame}>Spela</GameButton>
            )}
            <RuleButton onClick={toggleRules}>
              {showRules ? "Tillbaka" : "Spelregler"}
            </RuleButton>
          </>
        )}

        {showRules && (
          <TextWrapper>
            <TextStyle>
              Lös mattetalet och välj kortet med rätt svar för att hitta en kanin! 
              En kanin ger 1 poäng. För 5 kaniner får du en guldkanin, som ger 2 poäng extra. Du har 5 minuter på dig.
            </TextStyle>
          </TextWrapper>
        )}

        {!showRules && (
          <ScoreDisplayInnerBunnies>
            <div>Poäng: {totalScore}</div>
            <div className="timer-row">
              Tid:{" "}
              {!gameFinished && (
                <Counter
                  duration={300}
                  isActive={gameStarted && !gameFinished} 
                  //onComplete={handleComplete}
                  //gameFinished={gameFinished}
                  onComplete={() => console.log("Tiden är slut!")}
                />
              )}
              {gameFinished && (
                <div>{minutes}:{seconds.toString().padStart(2, "0")} minuter</div>
              )}
            </div>
            <div className="rabbits-row">
              {rabbits.map((rabbit, index) => (
                <img key={index} src={rabbit} alt={`Rabbit ${index + 1}`} className="rabbit-image" />
              ))}
            </div>
          </ScoreDisplayInnerBunnies>
        )}
      </PlayQuestionBox>
    </ScoreDisplayStyle>
  );
};
