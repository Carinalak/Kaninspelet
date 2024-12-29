import { WrapperTransparent } from "../components/Wrappers"
import CarrotCross from '../assets/img/cards/carrot_cross.png';
import CarrotDown from '../assets/img/cards/carrot_down.png';
import CarrotOne from '../assets/img/cards/carrot_one.png';
import CarrotTwo from '../assets/img/cards/carrot_two.png';
import RabbitBeige from '../assets/img/cards/rabbit_beige.png';
import RabbitClouds from '../assets/img/cards/rabbit_clouds.png';
import RabbitFence from '../assets/img/cards/rabbit_fence.png';
import RabbitGreen from '../assets/img/cards/rabbit_green.png';
import RabbitHearts from '../assets/img/cards/rabbit_hearts.png';
//import Back from '../assets/img/cards//back.png';
import { CardImage, CardLayoutStyle, CardStyle } from "../components/styled/CardLayoutStyle";
import { GameButton } from "../components/styled/Buttons";

const cards = [
  { id: 1, src: CarrotCross, alt: 'Carrots' },
  { id: 2, src: CarrotDown, alt: 'Carrot' },
  { id: 3, src: CarrotOne, alt: 'Carrot' },
  { id: 4, src: CarrotTwo, alt: 'Carrots' },
  { id: 5, src: RabbitBeige, alt: 'Kanin' },
  { id: 6, src: RabbitClouds, alt: 'Kanin' },
  { id: 7, src: RabbitFence, alt: 'Kanin' },
  { id: 8, src: RabbitGreen, alt: 'Kanin' },
  { id: 9, src: RabbitHearts, alt: 'Kanin' },
];

/*
type Card = {
  uuid: unknown;
  id: number;
  src: string;
  alt: string;
  matched?: boolean;
};*/

const shuffleCards = (cards: { id: number; src: string; alt: string; }[]) => {
  return [...cards].sort(() => Math.random() - 0.5);
};

export const Kaninspel = () => {
  const shuffledCards = shuffleCards(cards);

  return (
    <WrapperTransparent>
      <GameButton>Spela</GameButton>
      <CardLayoutStyle>
        {shuffledCards.map((card) => (
          <CardStyle key={card.id}>
            <div className="card-inner">
              <div className="card-back">
                <CardImage src={card.src} alt={card.alt} />
              </div>
            </div>
          </CardStyle>
        ))}
      </CardLayoutStyle>
    </WrapperTransparent>
  );
};