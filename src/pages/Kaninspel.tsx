import { useState, useEffect, useCallback } from "react";
import { WrapperTransparent } from "../components/Wrappers";
import { ScoreDisplay } from "../components/ScoreDisplay"; // Importera ScoreDisplay-komponenten

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
import { ButtonWrapper, GameButton } from "../components/styled/Buttons";
import { generateRandomAdditionQuestion } from "../data/questions";
import { Modal } from "../components/styled/Modal";
import Back from '../assets/img/cards/back.png';

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
    if (flippedCards[id]) return;

    setFlippedCards(prev => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setVisibleCards(prevVisible => ({ ...prevVisible, [id]: null }));
    }, 0);

    setTimeout(() => {
      setVisibleCards(prevVisible => ({ ...prevVisible, [id]: cardAnswers[id - 1] === answer ? RabbitBeige : CarrotCross }));
    }, 300);

    if (cardAnswers[id - 1] === answer) {
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

  useEffect(() => {
    if (foundRabbits.length === 5) {
      setShowModal(true);
    }
  }, [foundRabbits]);

  const resetGameState = () => {
    setShowModal(false);
    setGameStarted(true); // Fortsätt spelet
    setFoundRabbits([]); // Återställ hittade kaniner
    setFlippedCards({});
    setVisibleCards({});
    setShuffledCards(shuffleCards(cards)); // Blanda om korten
    generateNewQuestion(); // Generera en ny fråga
  };

  const onStartGame = () => {
    setGameStarted(true);
    generateNewQuestion();
  };

  return (
    <WrapperTransparent>
     {showModal && (
      <Modal>
        <p>Grattis du hittade fem kaniner och får en guldkanin! </p>
        <p>Du får 2 poäng extra.</p>
        <ButtonWrapper>
          <GameButton onClick={() => {
            setShowModal(false);
            setGameStarted(false);
            setScore(0);
          }}>Avsluta</GameButton>
          <GameButton onClick={() => {
            resetGameState(); 
          }}>Fortsätt</GameButton>
        </ButtonWrapper>
      </Modal>
    )}

      <ScoreDisplay 
        score={score} 
        onStartGame={onStartGame} 
        gameStarted={gameStarted} 
        question={question} 
      />

      <CardLayoutStyle>
        {shuffledCards.map((card) => (
          <CardStyle
            key={card.id}
            onClick={() => {
              if (!gameStarted) {
                alert("Klicka på knappen för att börja spela!");
                return;
              }
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