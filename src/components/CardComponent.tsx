import React from "react";
import { CardStyle, CardImage } from "../components/styled/CardLayoutStyle";

interface CardProps {
  id: number;
  flipped: boolean;
  onClick: () => void;
  cardFrontSrc: string;
  cardBackSrc: string;
  altText: string;
}

export const CardComponent: React.FC<CardProps> = ({ id, flipped, onClick, cardFrontSrc, cardBackSrc, altText }) => {
  return (
    <CardStyle key={id} onClick={onClick}>
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        <div className="card-back">
          <CardImage src={flipped ? cardBackSrc : cardFrontSrc} alt={altText} />
        </div>
        <div className="card-front">
          <CardImage src={cardFrontSrc} alt={altText} />
        </div>
      </div>
    </CardStyle>
  );
};