import { WrapperTransparent } from "../components/Wrappers";
import CarrotCross from '../assets/img/cards/carrot_cross.png';
import CarrotDown from '../assets/img/cards/carrot_down.png';
import CarrotOne from '../assets/img/cards/carrot_one.png';
import CarrotTwo from '../assets/img/cards/carrot_two.png';
import RabbitBeige from '../assets/img/cards/rabbit_beige.png';
import RabbitClouds from '../assets/img/cards/rabbit_clouds.png';
import RabbitFence from '../assets/img/cards/rabbit_fence.png';
import RabbitGreen from '../assets/img/cards/rabbit_green.png';
import RabbitHearts from '../assets/img/cards/rabbit_hearts.png';
import { CardImage, CardLayoutStyle, CardStyle } from "../components/styled/CardLayoutStyle";
import { GameButton } from "../components/styled/Buttons";
import { generateRandomAdditionQuestion } from "../data/questions";
import { useState, useCallback, useEffect } from "react";
import { H2White } from "../components/styled/Fonts";

interface Card {
  id: number;
  src: string;
  type: 'carrot' | 'rabbit';
}

const cards: Card[] = [
  // Morötter
  { id: 1, src: CarrotCross, type: 'carrot' },
  { id: 2, src: CarrotDown, type: 'carrot' },
  { id: 3, src: CarrotOne, type: 'carrot' },
  { id: 4, src: CarrotTwo, type: 'carrot' },
  // Kaniner
  { id: 5, src: RabbitBeige, type: 'rabbit' },
  { id: 6, src: RabbitClouds, type: 'rabbit' },
  { id: 7, src: RabbitFence, type: 'rabbit' },
  { id: 8, src: RabbitGreen, type: 'rabbit' },
  { id: 9, src: RabbitHearts, type: 'rabbit' },
];

export const KaninspelTest1 = () => {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [foundRabbits, setFoundRabbits] = useState<number[]>([]); // Håller koll på funna kaniner
  const [gameStarted, setGameStarted] = useState(false);
  const [cardAnswers, setCardAnswers] = useState<string[]>([]); // För att lagra svaren på korten
  const [score, setScore] = useState(0); // För att hålla reda på poängen
  const [poisonedCards, setPoisonedCards] = useState<Set<number>>(new Set()); // För att hålla reda på kort som inte får klickas på igen

  // Slumpa korten en gång när spelet startar
  const shuffleCards = (cards: { id: number; src: string; type: 'carrot' | 'rabbit' }[]) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  // Funktionen för att generera en ny fråga
  const generateNewQuestion = useCallback(() => {
    const { question, answer } = generateRandomAdditionQuestion(); // Generera en ny fråga
    setQuestion(question);
    setAnswer(answer);

    // Skapa en lista med möjliga svar (inklusive rätt svar)
    const possibleAnswers = [answer];
    while (possibleAnswers.length < shuffledCards.length) {
      const randomAnswer = Math.floor(Math.random() * 20) + 1; // Slumpa svar mellan 1 och 20
      if (!possibleAnswers.includes(randomAnswer.toString())) {
        possibleAnswers.push(randomAnswer.toString());
      }
    }

    // Slumpa ordningen på svaren och sätt dessa som kortens svar
    setCardAnswers(possibleAnswers.sort(() => Math.random() - 0.5));
  }, [shuffledCards.length]);

  // Slumpa korten när spelet startar
  useEffect(() => {
    if (gameStarted) {
      const shuffled = shuffleCards(cards); // Endast slumpa när spelet startas
      setShuffledCards(shuffled);
      generateNewQuestion(); // Generera en ny fråga när spelet startas
    }
  }, [gameStarted, generateNewQuestion]);

  // Funktion för att vända kortet
  const flipCard = (id: number) => {
    //if (flippedCards[id] || poisonedCards.has(id)) return; // Om kortet redan är vänt eller inte får klickas, gör inget

    setFlippedCards(prev => {
      const newFlippedCards = { ...prev, [id]: true };

      // Kontrollera om det är rätt svar
      const cardAnswer = cardAnswers[id - 1]; // Hämta rätt svar för kortet
      const isRabbit = shuffledCards[id - 1].type === 'rabbit'; // Kontrollera om kortet är en kanin

      if (cardAnswer === answer) {
        if (isRabbit && !foundRabbits.includes(id)) {
          setScore(prev => prev + 1); // Lägg till poäng om det är en kanin och den inte har hittats tidigare
          setFoundRabbits(prev => [...prev, id]); // Lägg till i listan över funna kaniner
        }
        // Fördröj vändningen för att ge användaren tid att se rätt kort
        setTimeout(() => {
          setFlippedCards(prev => {
            const newFlippedCards = { ...prev };
            delete newFlippedCards[id]; // Vänd tillbaka kortet efter fördröjningen
            return newFlippedCards;
          });
        }, 1000);

        setTimeout(() => {
          generateNewQuestion(); // Generera en ny fråga när en kanin är rätt
        }, 500);
      } else {
        // Om svaret är fel, vänd tillbaka kortet efter en fördröjning
        setPoisonedCards(prev => new Set(prev).add(id)); // Markera kortet som "förgiftat" så det inte kan klickas igen
        setTimeout(() => {
          setFlippedCards(prev => {
            const newFlippedCards = { ...prev };
            delete newFlippedCards[id]; // Vänd tillbaka kortet
            return newFlippedCards;
          });
          setPoisonedCards(prev => {
            const newPoisonedCards = new Set(prev);
            newPoisonedCards.delete(id); // Ta bort kortet från "förgiftade" när det har vänds tillbaka
            return newPoisonedCards;
          });
        }, 1000);
      }

      return newFlippedCards;
    });
  };

  if (foundRabbits.length === 5) {
    return (
      <div>
        <h1>Grattis! Du har hittat alla kaniner!</h1>
        <p>Poäng: {score}</p>
      </div>
    );
  }

  return (
    <WrapperTransparent>
      {gameStarted ? (
        <div>
          <p>Välj ett kort med rätt siffra för att hitta en kanin!</p>
          <H2White>{question} =</H2White>
        </div>
      ) : (
        <GameButton onClick={() => { setGameStarted(true); }}>Spela</GameButton>
      )}

      <CardLayoutStyle>
        {shuffledCards.map((card) => (
          <CardStyle key={card.id} onClick={() => flipCard(card.id)}>
            <div className={`card-inner ${flippedCards[card.id] ? 'flipped' : ''}`}>
              <div className="card-back">
                {/* Visa rätt bild beroende på om kortet är vänt och om det är rätt eller fel */}
                <CardImage 
                  src={
                    flippedCards[card.id]
                      ? (foundRabbits.includes(card.id) 
                          ? card.src  // Visa kaninbilden om det är rätt svar
                          : CarrotCross) // Visa morotskortet om svaret var fel
                      : `path/to/numbers/${cardAnswers[card.id - 1]}.png` // Visa numret på kortets baksida
                  } 
                  alt={cardAnswers[card.id - 1]} 
                />
              </div>
              <div className="card-front">
                <CardImage src={card.src} alt={card.type} />
              </div>
            </div>
          </CardStyle>
        ))}
      </CardLayoutStyle>

      {/* Visa poäng under kortleken */}
      <div>
        <p>Poäng: {score}</p>
      </div>
    </WrapperTransparent>
  );
};
