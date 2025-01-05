import styled from "styled-components";
import { KRITVIT, BREAKPOINT_TABLET, SKUGGLILA, KOLSVART } from "./Variables";


export const Modal = styled.div `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background-color: ${KRITVIT};
  color: ${SKUGGLILA};
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
    font-size: 1.6rem;
    font-weight: bold;
  }
`;