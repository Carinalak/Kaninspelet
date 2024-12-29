import styled from "styled-components";
import { GAMMELROSA, KRITVIT, SMUTSROSA, POOLBLA, BREAKPOINT_TABLET, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_DESKTOP } from "./Variables";

export const FormButton = styled.button`

  width: 250px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background-color: ${GAMMELROSA};
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 16px;
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
`;

export const GameButton = styled(FormButton) `
  width: 100px;
  height: 35px;
  
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 110px;
    }

    @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
      width: 110px;
      }
      @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
      width: 190px;
      height: 60px;
      font-weight: 700;
      font-size: 2rem;
      }


`;