import styled from "styled-components";
import { BREAKPOINT_TABLET, GAMMELROSA, KOLSVART } from "./Variables";

export const ScoreDisplayStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 250px;
  height: 300px;
  background-color: ${GAMMELROSA};
  color: ${KOLSVART};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-size: 1.3rem;
  font-weight: bold;
  border: 1px solid black;
  text-align: left;
  position: relative;
  

  .rabbits-row {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
  }

  .rabbit-image {
    width: 30px;
  }


  .rules-button {
    position: absolute;
    top: 10px;
    left: 0;
    border: none;
    font-size: 1rem;
    cursor: pointer;

  }

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    font-size: 1.6rem;
    font-weight: bold;
    height: 350px;
  }
`;

export const ScoreDisplayInnerBunnies = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background-color: transparent;
  row-gap: 10px;
  padding: 5px;
  color: ${KOLSVART};
  border-radius: 10px;
  border: 1px solid black;

  .timer-row {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 190px;
    height: 290px;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;


export const PlayQuestionBox = styled.div`
  border: 1px solid black;
  background-color: white;
  color: ${KOLSVART};
  width: 240px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 10px;
`;
