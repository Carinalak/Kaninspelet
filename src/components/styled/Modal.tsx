import styled from "styled-components";
import { BREAKPOINT_TABLET, SKUGGLILA, KOLSVART, KRITVIT, GAMMELROSA } from "./Variables";
import { TextStyle } from "../Wrappers";
import { ButtonWrapper, GameButton } from "./Buttons";

export const Modal = styled.div `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background-color: ${GAMMELROSA};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  border: 1px solid ${KOLSVART};

  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media screen and ( min-width: ${BREAKPOINT_TABLET}) {
    width: 400px;
    width: 400px;
  
    font-weight: bold;
  }
`;

export const ModalBoxInner = styled(Modal) `
  background-color: ${KRITVIT};
  color: ${SKUGGLILA};
  width: 200px;
  height: 200px;
  border: 1px solid ${KOLSVART};

  @media screen and ( min-width: ${BREAKPOINT_TABLET}) {
    width: 350px;
    width: 350px;
    font-weight: bold;
  }
`;

interface ModalMessageProps {
  showModal: boolean;
  onClose: () => void;
  onReset: () => void;
  //allRabbitsFound: boolean;
  totalRabbits: number;
  goldenRabbits: number;
  elapsedTime: number;
  totalScore: number;
  score:number;
}

export const ModalMessage = ({
  showModal,
  onClose,
  onReset,
  totalRabbits,
  goldenRabbits,
  totalScore,
}: ModalMessageProps) => {
  if (!showModal) return null;

  return (
    <Modal>
  <ModalBoxInner>
  <TextStyle>
      {totalScore} poäng
    </TextStyle>
    <TextStyle>
      Tiden är slut! Du hittade {totalRabbits} kaniner och fick {goldenRabbits} guldkaniner.
    </TextStyle>
    <TextStyle>Vill du spela igen?</TextStyle>
    <ButtonWrapper>
      <GameButton onClick={onClose}>Nej</GameButton>
      <GameButton onClick={onReset}>Ja</GameButton>
    </ButtonWrapper>
  </ModalBoxInner>
    </Modal>
  );
};
