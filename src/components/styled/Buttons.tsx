import styled from "styled-components";
import { GAMMELROSA, KRITVIT, SMUTSROSA, POOLBLA, BREAKPOINT_TABLET, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_DESKTOP, SKUGGLILA } from "./Variables";

export const FormButton = styled.button`
   width: 180px;
  height: 35px;
  border: none;
  border-radius: 12px;
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
      width: 190px;
      height: 60px;
      font-weight: 700;
      font-size: 2rem;
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
`;

