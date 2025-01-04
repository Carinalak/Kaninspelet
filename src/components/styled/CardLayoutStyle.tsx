import styled from "styled-components";
import { BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_DESKTOP, BREAKPOINT_TABLET, KOLSVART } from "./Variables";
import Back from '../../assets/img/cards/back.png';


export const CardLayoutStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 100%;
  margin: 0 auto;
  justify-items: center;
  align-items: center;
  

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    /* Media queries för olika skärmstorlekar kan justeras här */
  }

  @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
    gap: 15px;
  }

  @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
    gap: 30px;
  }
`;

export const CardStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
  width: 100px;
  height: 100px;
  perspective: 1000px; /* För att ge 3D-effekten */
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  -webkit-tap-highlight-color: transparent; /* Tar bort blå markering på mobila enheter */

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 120px;
    height: 120px;
  }

  @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
    width: 130px;
    height: 130px;
  }

  @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
    width: 190px;
    height: 190px;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s ease; // Gör så att kortet vänds snyggt 
    transform: rotateY(0deg);
   
  }

  &.flipped .card-inner {
    transform: rotateY(180deg); // Vänder kortet till framsidan 
 
  }

  .card-front,
  .card-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; /* Dölj baksidan när kortet är vänt */
  
  }

  .card-back {
  transform: rotateY(0deg);
  background-image: url(${Back});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 50px;
  color: ${KOLSVART};
  font-weight: bold;
}


  .card-front {
    transform: rotateY(180deg); // Framsidan är spegelvänd
  }
  
  .card-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: ${KOLSVART};
  font-weight: bold;
}
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
