import styled from "styled-components";
import { GAMMELROSA, KRITVIT, SMUTSROSA, POOLBLA, BREAKPOINT_TABLET, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_DESKTOP, SKUGGLILA, DISSAD, SOLBLEKT } from "./Variables";
import arrowLeft from "../../assets/icons/arrow_white_left.png";
import arrowRight from "../../assets/icons/arrow_white_right.png";


export const FormButton = styled.button`
  width: 180px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background-color: ${GAMMELROSA};
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  color: ${KRITVIT};
  cursor: pointer;

  &:hover {
    background-color: ${SMUTSROSA};
    color: ${KRITVIT};
  }
  &:active {
    background-color: ${POOLBLA};
    color: ${KRITVIT};
  }
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
}

@media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
}
`;

export const GameButton = styled(FormButton) `
  width: 100px;
  height: 35px;
  //margin-top: 30px;
  
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 110px;
    }

    @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
      width: 110px;
      }

`;

export const ResultBackButton = styled(GameButton) `
  width: 100px;
  height: 35px;
  margin-top: 20px;
`;

export const RuleButton = styled(FormButton) `
  width: 100px;
  height: 35px;
  margin-top: 10px;
  
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 110px;
    }

    @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
      width: 110px;
      }
`;

export const ButtonWrapper = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 5px;
  padding-left: 0;
  padding-top: 20px;
  gap: 15px;
  width: 300px;

    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      gap: 30px;
    }
`;

export const AccountButton = styled(FormButton) `
    width: 100px;
    height: 35px;
`;

export const MenuButton = styled(FormButton) `
  width: 200px;
  border-radius: 0;
  border-bottom: 1px solid ${SKUGGLILA};
  margin: 0;
    &:hover {
      color: ${SOLBLEKT};
    }

`;

export const ButtonArrowLeft = styled(FormButton)`
  padding: 0;
  border: none;
  background-image: url(${arrowLeft});
  background-size: 22px 22px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${GAMMELROSA};
  width: 40px;
  height: 40px;
  transition: background-color 0.2s ease, transform 0.2s ease;
  margin-top: -5px;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    background-color: ${DISSAD};
    cursor: not-allowed;
    transform: none;
  }

  @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}){
   // width: 80px;
  //  height: 80px;
   // background-size: 62px 62px;
  }
`;

export const ButtonArrowRight = styled(FormButton)`
  padding: 0;
  border: none;
  background-image: url(${arrowRight});
  background-size: 22px 22px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${GAMMELROSA};
  width: 40px;
  height: 40px;
  transition: background-color 0.2s ease, transform 0.2s ease;
  margin-top: -5px;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    background-color: ${DISSAD};
    cursor: not-allowed;
    transform: none;
  }
  @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}){
   // width: 80px;
  //  height: 80px;
  //  background-size: 62px 62px;
  }
`;