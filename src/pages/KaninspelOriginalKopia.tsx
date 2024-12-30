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

// ORIGINAL

// Fungerar: Kanin vid rätt svar, ny fråga vid rätt svar, morot vid fel svar
// Fungerar ej: Kaninkort vänds ej tillbaka, ingen poängräknare

const cards = [
  { id: 1, src: CarrotCross, alt: 'Carrots' },
  { id: 2, src: CarrotDown, alt: 'Carrot' },
  { id: 3, src: CarrotOne, alt: 'Carrot' },
  { id: 4, src: CarrotTwo, alt: 'Carrots' },
  { id: 5, src: RabbitBeige, alt: 'Kanin' },
  { id: 6, src: RabbitClouds, alt: 'Kanin' },
  { id: 7, src: RabbitFence, alt: 'Kanin' },
  { id: 8, src: RabbitGreen, alt: 'Kanin' },
  { id: 9, src: RabbitHearts, alt: 'Kanin' }
];

export const Kaninspel = () => {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [foundRabbits, setFoundRabbits] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardAnswers, setCardAnswers] = useState<string[]>([]); // För att lagra svaren på korten

  // Slumpa korten en gång när spelet startar
  const shuffleCards = (cards: { id: number; src: string; alt: string }[]) => {
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
  }, [shuffledCards.length]); // Lägg till shuffledCards.length som beroende om det behövs

  // Slumpa korten när spelet startar
  useEffect(() => {
    if (gameStarted) {
      const shuffled = shuffleCards(cards); // Endast slumpa när spelet startas
      setShuffledCards(shuffled);
      generateNewQuestion(); // Generera en ny fråga när spelet startas
    }
  }, [gameStarted, generateNewQuestion]); // Lägg till generateNewQuestion i beroendelistan

  // Funktion för att vända kortet
  const flipCard = (id: number) => {
    if (flippedCards[id]) return; // Om kortet redan är vänt, gör inget

    setFlippedCards(prev => {
      const newFlippedCards = { ...prev, [id]: true };

      // Kontrollera om det är rätt svar
      const cardAnswer = cardAnswers[id - 1]; // Hämta rätt svar för kortet
      if (cardAnswer === answer) {
        setFoundRabbits(prev => [...prev, id]);
        setTimeout(() => {
          // Generera en ny fråga när en kanin är rätt
          generateNewQuestion();
        }, 500); // Vänta en liten stund för att användaren ska hinna se kortet
      } else {
        // Om svaret är fel, vänd tillbaka kortet efter en fördröjning
        setTimeout(() => {
          setFlippedCards(prev => {
            const newFlippedCards = { ...prev };
            delete newFlippedCards[id];
            return newFlippedCards;
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
                          ? RabbitBeige
                          : CarrotCross)
                      : `path/to/numbers/${cardAnswers[card.id - 1]}.png` // Visa numret på kortets baksida
                  } 
                  alt={cardAnswers[card.id - 1]} 
                />
              </div>
              <div className="card-front">
                <CardImage src={card.src} alt={card.alt} />
              </div>
            </div>
          </CardStyle>
        ))}
      </CardLayoutStyle>
    </WrapperTransparent>
  );
};
