import { useState, useEffect, useCallback } from "react";
import { WrapperTransparent } from "../components/Wrappers";
import { ScoreDisplay } from "../components/ScoreDisplay";
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
import { generateRandomAdditionQuestion } from "../data/questions";
import { ModalMessage } from "../components/styled/Modal";
import Back from '../assets/img/cards/back.png';
import { ScoreManager } from "../components/ScoreManager";

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

export const Kaninspel = () => {
  const [shuffledCards, setShuffledCards] = useState(cards);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [foundRabbits, setFoundRabbits] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardAnswers, setCardAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [gameFinished, setGameFinished] = useState(false); 
  const [cardsLocked, setCardsLocked] = useState(false);

  useEffect(() => {
    const preloadImages = () => {
      const imagePaths = cards.map((card) => card.src).concat(Back);
      imagePaths.forEach((src) => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    };
    preloadImages();
  }, []);

  const shuffleCards = (cards: { id: number; src: string; type: 'carrot' | 'rabbit' }[]) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  const generateNewQuestion = useCallback(() => {
    const { question, answer } = generateRandomAdditionQuestion();
    setQuestion(question);
    setAnswer(answer);

    const possibleAnswers = [answer];
    while (possibleAnswers.length < shuffledCards.length) {
      const randomAnswer = Math.floor(Math.random() * 20) + 1;
      if (!possibleAnswers.includes(randomAnswer.toString())) {
        possibleAnswers.push(randomAnswer.toString());
      }
    }

    setCardAnswers(possibleAnswers.sort(() => Math.random() - 0.5));
  }, [shuffledCards.length]);

  useEffect(() => {
    if (gameStarted) {
      const shuffled = shuffleCards(cards);
      setShuffledCards(shuffled);
      generateNewQuestion();
    }
  }, [gameStarted, generateNewQuestion]);

  const [visibleCards, setVisibleCards] = useState<{ [key: number]: string | null }>({});

  const flipCard = (id: number) => {
    if (flippedCards[id] || cardsLocked) return;

    setFlippedCards(prev => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setVisibleCards(prevVisible => ({ ...prevVisible, [id]: null }));
    }, 0);

    setTimeout(() => {
      setVisibleCards(prevVisible => ({ ...prevVisible, [id]: cardAnswers[id - 1] === answer ? RabbitBeige : CarrotCross }));
    }, 300);

    if (cardAnswers[id - 1] === answer) {
      setCardsLocked(true);

      setTimeout(() => {
        setFoundRabbits(prev => [...prev, id]);
        setScore(prev => prev + 1);

        setTimeout(() => {
          setFlippedCards(prev => {
            const revertedCards = { ...prev };
            delete revertedCards[id];
            return revertedCards;
          });

          setVisibleCards(prevVisible => {
            const revertedVisible = { ...prevVisible };
            revertedVisible[id] = null;
            return revertedVisible;
          });

          generateNewQuestion();
          setCardsLocked(false);
        }, 500);
      }, 1000);
    } else {
      setTimeout(() => {
        setVisibleCards(prevVisible => ({ ...prevVisible, [id]: null }));

        setTimeout(() => {
          setFlippedCards(prev => {
            const revertedCards = { ...prev };
            delete revertedCards[id];
            return revertedCards;
          });
        }, 0);

        setVisibleCards(prevVisible => {
          const revertedVisible = { ...prevVisible };
          revertedVisible[id] = null;
          return revertedVisible;
        });
      }, 1000);
    }
  };


  
  const resetGameState = () => {
    setShowModal(false);
    setGameStarted(true);
    setFoundRabbits([]); 
    setFlippedCards({});
    setVisibleCards({});
    setShuffledCards(shuffleCards(cards));
    generateNewQuestion(); 
    setGameFinished(false);
    setScore(0);
    setElapsedTime(0);
  };

  const onStartGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    setElapsedTime(0);
    setFoundRabbits([]);
    setFlippedCards({});
    setVisibleCards({}); 
    setShuffledCards(shuffleCards(cards));
    generateNewQuestion();
    setScore(0);
  };

  const closeGame = () => {
    setShowModal(false);
    setGameStarted(false);
    setGameFinished(false);
    setScore(0);
    setElapsedTime(0);
  };

  const goldenRabbits = Math.floor(score / 5);

  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
  
    if (gameStarted && !gameFinished) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
  
    return () => clearInterval(timer);
  }, [gameStarted, gameFinished]);
 
  useEffect(() => {
    if (elapsedTime >= 120 && !gameFinished) {
      handleEndGame();
    } else if (gameFinished) {
  
      //setShowModal(true);
    }
  }, [elapsedTime, gameFinished]);
  
  function handleEndGame(): void {
    setGameStarted(false);
    setGameFinished(true);
    setShowModal(true);
  }
  
  const totalScore = score + goldenRabbits * 2;

  return (

    <WrapperTransparent>

     <ModalMessage
        showModal={showModal}
        onClose={closeGame}
        onReset={resetGameState}
        totalRabbits={foundRabbits.length}
        goldenRabbits={goldenRabbits}
        elapsedTime={elapsedTime}
        score={score}
        totalScore={totalScore}  
    />

      <ScoreDisplay 
        score={score}
        onStartGame={onStartGame}
        //onEndGame={handleEndGame}
        gameStarted={gameStarted}
        question={question}
        gameFinished={gameFinished}
        goldenRabbits={goldenRabbits}
        elapsedTime={0}  
        totalScore={score} 
        onClose={closeGame}
           />
      <ScoreManager score={score} gameFinished={gameFinished} />
      <CardLayoutStyle>
        {shuffledCards.map((card) => (
          <CardStyle
            key={card.id}
            onClick={() => {
              if (!gameStarted || cardsLocked) return;

              flipCard(card.id);
            }}
            style={{
              transform: flippedCards[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            <div className="card-inner">
              <div className="card-back">
                {visibleCards[card.id] ? (
                  <CardImage
                    src={visibleCards[card.id] || ""}
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
    </WrapperTransparent>
  );
};