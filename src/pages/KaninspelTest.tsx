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
import Back from "../assets/img/cards/back.png";

// ORIGINAL

// Fungerar: Kanin vid rätt svar, ny fråga vid rätt svar, morot vid fel svar
// Fungerar ej: Kaninkort vänds ej tillbaka, ingen poängräknare, kaninkort vänds upp även vi felaktigt svar, poängen blir dubbel

// 1: gör om arrayer KLAR
// 2: Gör så att alla kort vänds tillbaka. KLAR
// 3: Gör så att kaninkortet bara vänds upp vid rätt svar KLAR
// 4: poängräknare KLAR
// 5: Gör så att man får ett poäng, inte två för varje kanin. KLAR
// 6: Det finns en baksida med en siffra över, men funkar inte att vända kortet till framsidan.

interface Card {
  id: number;
  src: string;
  type: 'carrot' | 'rabbit';
}

const cards: Card[] = [

  { id: 1, src: CarrotCross, type: 'carrot' },
  { id: 2, src: CarrotDown, type: 'carrot' },
  { id: 3, src: CarrotOne, type: 'carrot' },
  { id: 4, src: CarrotTwo, type: 'carrot' },

  { id: 5, src: RabbitBeige, type: 'rabbit' },
  { id: 6, src: RabbitClouds, type: 'rabbit' },
  { id: 7, src: RabbitFence, type: 'rabbit' },
  { id: 8, src: RabbitGreen, type: 'rabbit' },
  { id: 9, src: RabbitHearts, type: 'rabbit' },
];


export const KaninspelTest = () => {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [foundRabbits, setFoundRabbits] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardAnswers, setCardAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  // Slumpa korten en gång när spelet startar
  const shuffleCards = (cards: { id: number; src: string; type: 'carrot' | 'rabbit' }[]) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  // Funktionen för att generera en ny fråga
  const generateNewQuestion = useCallback(() => {
    const { question, answer } = generateRandomAdditionQuestion();
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

    setCardAnswers(possibleAnswers.sort(() => Math.random() - 0.5));
  }, [shuffledCards.length]);

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
      const cardAnswer = cardAnswers[id - 1];
      if (cardAnswer === answer) {
        //console.log(`Adding rabbit with id: ${id} to foundRabbits.`);
        setFoundRabbits(prev => [...prev, id]);
        setScore(prev => prev + 1);
        
  
        // Generera en ny fråga och vänd tillbaka alla kort
        setTimeout(() => {
          setFlippedCards({});
          generateNewQuestion();
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedCards(prev => {
            const revertedCards = { ...prev };
            delete revertedCards[id];
            return revertedCards;
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
        {/* Baksidan av kortet */}
        <div className="card-back">
          <CardImage
            src={Back}
            alt="Back of card"
          />
          {/* Visa siffran på baksidan när kortet inte är vänt */}
          {!flippedCards[card.id] && (
            <div className="card-number">{cardAnswers[card.id - 1]}</div>
          )}
        </div>

        {/* Framsidan av kortet */}
        <div className="card-front">
          <CardImage src={card.src} alt={card.type} />
        </div>
      </div>
    </CardStyle>
  ))}
</CardLayoutStyle>





      <div>
        <p>Poäng: {score}</p>
      </div>
    </WrapperTransparent>
  );
};
