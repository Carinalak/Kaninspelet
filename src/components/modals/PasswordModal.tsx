import styled from "styled-components";
import { TextStyle } from "../Wrappers";
import { ButtonWrapper, GameButton } from "../styled/Buttons";
import { GAMMELROSA, KOLSVART, BREAKPOINT_TABLET, KRITVIT, SKUGGLILA } from "../styled/Variables";

export const PasswordModal = styled.div`
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
  
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 400px;
  }
`;

export const ModalBoxInner = styled(PasswordModal)`
  background-color: ${KRITVIT};
  color: ${SKUGGLILA};
  width: 230px;
  height: 230px;
  border: 1px solid ${KOLSVART};

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 350px;
  }
`;


interface ModalMessageProps {
  showModal: boolean;
  onClose: () => void;
  error: string;
}
export const ModalMessage = ({
  showModal,
  onClose,
  error,
}: ModalMessageProps) => {
  if (!showModal) return null;

  const modalErrorText = error || "Ett okänt fel inträffade";

  return (
    <PasswordModal>
      <ModalBoxInner>
        <TextStyle>{modalErrorText}</TextStyle>
        <ButtonWrapper>
          <GameButton onClick={onClose}>Stäng</GameButton>
        </ButtonWrapper>
      </ModalBoxInner>
    </PasswordModal>
  );
};