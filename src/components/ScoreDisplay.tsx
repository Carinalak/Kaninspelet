import { ScoreDisplayStyle, PlayQuestionBox, ScoreDisplayInnerBunnies } from "./styled/ScoreDisplayStyle";
import RabbitBlack from '../assets/img/rabbits/rabbit_shadow_black.png';
import RabbitYellow from '../assets/img/rabbits/rabbit_shadow_yellow.png';
import { GameButton } from "./styled/Buttons";
import { TextWrapper, Text, Question } from "./Wrappers";

interface ScoreDisplayProps {
  score: number;
  onStartGame: () => void;
  gameStarted: boolean;
  question: string;
}

export const ScoreDisplay = ({ score, onStartGame, gameStarted, question }: ScoreDisplayProps) => {
  // Beräkna antalet gula kaniner baserat på poängen. En gul kanin läggs till för varje 5 poäng.
  const yellowBunniesCount = Math.floor(score / 5);
  const rabbits = new Array(5).fill(RabbitBlack).map((_, index) => 
    index < yellowBunniesCount ? RabbitYellow : RabbitBlack
  );

  return (
    <ScoreDisplayStyle>
      <PlayQuestionBox>
        {gameStarted ? (
          <>
            <TextWrapper>
              <Text>Lös mattetalet och välj kortet med rätt svar för att hitta en kanin! En kanin ger 1 poäng. Varje guldkanin ger 5 poäng extra.</Text>
            </TextWrapper>
            <Question>{question} =</Question>
          </>
        ) : (
          <GameButton className="start-button" onClick={onStartGame}>Spela</GameButton>
        )}

        <ScoreDisplayInnerBunnies>
          <div>Poäng: {score}</div>
          <div>Tid:</div>

          <div className="rabbits-row">
            {rabbits.map((rabbit, index) => (
              <img key={index} src={rabbit} alt={`Rabbit ${index + 1}`} className="rabbit-image" />
            ))}
          </div>
        </ScoreDisplayInnerBunnies>
      </PlayQuestionBox>
    </ScoreDisplayStyle>
  );
};
