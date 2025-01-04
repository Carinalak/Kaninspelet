import { useState, useCallback, useEffect } from "react";
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
import { H2White } from "../components/styled/Fonts";

// Definiera kortet som ett objekt med id, src och type
interface Card {
  id: number;
  src: string;
  type: 'carrot' | 'rabbit';
}

// Kortarray
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

export const Kaninspel = () => {
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
  const [visibleCards, setVisibleCards] = useState<{ [key: number]: string | null }>({}); // Styr vilken bild som visas
  const flipCard = (id: number) => {
    if (flippedCards[id]) return; // Om kortet redan är vänt, gör inget
  
    // Markera kortet som vänt
    setFlippedCards(prev => {
      const newFlippedCards = { ...prev, [id]: true };
      return newFlippedCards;
    });
  
    // Första vändningen: Dölja framsidan och vänta en kort stund innan vi byter till baksidan
    setTimeout(() => {
      setVisibleCards(prevVisible => ({
        ...prevVisible,
        [id]: null,
      }));
    }, 0);

    // Vänta för att låta kortet vändas innan vi visar rätt eller fel bild
    setTimeout(() => {
      setVisibleCards(prevVisible => ({
        ...prevVisible,
        [id]: cardAnswers[id - 1] === answer ? RabbitBeige : CarrotCross,
      }));
    }, 300);
  
    // Om kortet är rätt
    if (cardAnswers[id - 1] === answer) {
      setTimeout(() => {
        setFoundRabbits(prev => [...prev, id]);
        setScore(prev => prev + 1);
  
        // Vänta en kortare tid innan återställning
        setTimeout(() => {
  
          setFlippedCards(prev => {
            const revertedCards = { ...prev };
            delete revertedCards[id]; // Återställ det vända kortet
            return revertedCards;
          });
  
          // Ta bort synlig bild för att visa baksidan innan vändningen tillbaka
          setVisibleCards(prevVisible => {
            const revertedVisible = { ...prevVisible };
            revertedVisible[id] = null; // Visa inget innan baksidan syns
            return revertedVisible;
          });
  
          // Generera en ny fråga för nästa kort
          generateNewQuestion();
        }, 500); // Vänta lite längre tid innan återställning för att synka med animationen
      }, 1000); // Vänta tills resultatet är synligt innan återställning
    } else {
      // Om kortet var fel, återställ kortet till ursprunglig position efter kortare fördröjning
      setTimeout(() => {
        setVisibleCards(prevVisible => ({
          ...prevVisible,
          [id]: null,
        }));
  
        // Återställ kortet till ursprunglig vändning
        setTimeout(() => {
          setFlippedCards(prev => {
            const revertedCards = { ...prev };
            delete revertedCards[id]; 
            return revertedCards;
          });
        }, 0);
  
        // Återställ kortet till sin ursprungliga tillstånd (visa baksidan)
        setVisibleCards(prevVisible => {
          const revertedVisible = { ...prevVisible };
          revertedVisible[id] = null;
          return revertedVisible;
        });
      }, 2000);
    }
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
         <CardStyle
  key={card.id}
  onClick={() => {
    console.log(`Kort klickat: ${card.id}`);
    flipCard(card.id);
  }}
  style={{
    transform: flippedCards[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transition: 'transform 0.5s ease-in-out', // Lägg till en smidig övergång
  }}
>
  <div className="card-inner">
    <div className="card-back">
      {/* Visa baksidan av kortet om det inte är vänt */}
      {visibleCards[card.id] ? (
        <CardImage
          src={cardAnswers[card.id - 1] === answer ? RabbitBeige : CarrotCross}
          alt=""
        />
      ) : (
        <div className="card-number">{cardAnswers[card.id - 1]}</div>
      )}
    </div>
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
