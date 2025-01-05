import { ScoreDisplayStyle, PlayQuestionBox, ScoreDisplayInnerBunnies } from "./styled/ScoreDisplayStyle";
import RabbitBlack from '../assets/img/rabbits/rabbit_shadow_black.png';
import { GameButton } from "./styled/Buttons";
import { TextWrapper, Text } from "./Wrappers";

interface ScoreDisplayProps {
  score: number;
  onStartGame: () => void;
  gameStarted: boolean;
  question: string;
}

export const ScoreDisplay = ({ score, onStartGame, gameStarted, question }: ScoreDisplayProps) => {
  const rabbits = new Array(5).fill(RabbitBlack);

  return (
    <ScoreDisplayStyle>
      <PlayQuestionBox>
      
      {gameStarted ? (
          <>
          <TextWrapper>
            <Text>Välj ett kort med rätt siffra för att hitta en kanin!</Text></TextWrapper>
            <p>{question} =</p>
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
