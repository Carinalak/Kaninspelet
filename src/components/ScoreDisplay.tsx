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
}

export const ScoreDisplay = ({ score, onStartGame, gameStarted, question, gameFinished }: ScoreDisplayProps) => {
  const [showRules, setShowRules] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  const levels = Math.floor(score / 5);
  const bonusPoints = levels * 2;
  const totalScore = score + bonusPoints;

  const yellowBunniesCount = Math.floor(score / 5);
  const rabbits = new Array(5).fill(RabbitBlack).map((_, index) =>
    index < yellowBunniesCount ? RabbitYellow : RabbitBlack
  );

  const toggleRules = () => setShowRules(!showRules);

  const handleStartGame = () => {
    setTimerActive(true);
    onStartGame();
  };

  const handleTimerComplete = () => {
    setGameCompleted(true);
    setTimerActive(false); // Timer stoppas
  };

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
              En kanin ger 1 poäng. Varje guldkanin ger 5 poäng extra. 
              För varje 5 poäng du samlar på dig får du 2 extra bonuspoäng.
            </TextStyle>
          </TextWrapper>
        )}

        {!showRules && (
          <ScoreDisplayInnerBunnies>
            <div>Poäng: {totalScore}</div>
            <div>
              Tid:{" "}
              {!gameCompleted && (
                <Counter
                  duration={300} // 5 minuter
                  isActive={timerActive}
                  onComplete={handleTimerComplete}
                  gameFinished={gameFinished} 
                />
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