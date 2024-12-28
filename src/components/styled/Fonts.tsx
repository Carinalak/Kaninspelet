import styled from "styled-components";
import { KRITVIT, BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_BIGGER_DESKTOP } from "./Variables";

export const H1White = styled.h1 `
    padding: 0;
    color: ${KRITVIT};
    font-size: 2rem;
    font-family: "Playpen Sans", serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 0.3;
    text-align: center;
    
    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      font-size: 2.2rem;
    }
    @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
      font-size: 2.4rem;
    }
    @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
      font-size: 6rem;
    }
`;