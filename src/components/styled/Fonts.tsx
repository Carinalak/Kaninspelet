import styled from "styled-components";
import { KRITVIT, BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_BIGGER_DESKTOP } from "./Variables";

export const H1Title = styled.h1 `
    padding: 0;
    color: ${KRITVIT};
    font-size: 2rem;
    font-family: "Playpen Sans", serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    line-height: 0.3;
    text-align: center;
    
    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      font-size: 2.4rem;
    }
    @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
      font-size: 2.6rem;
    }
    @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
      font-size: 6rem;
    }
`;

export const H4White = styled.h4 `
    padding: 0;
    font-family: "Playpen Sans", serif;
    color: ${KRITVIT};
    font-size: 1rem;
    text-align: center;

    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      font-size: 1.3rem;
    }

    @media (min-width: ${BREAKPOINT_DESKTOP}) {
        font-size: 1.4rem;
      }

    @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
      font-size: 3rem;
    }
`;

export const OrdinaryFont = styled.p `
    padding: 0;
    font-family: "Playpen Sans", serif;
    color: ${KRITVIT};
    font-size: 1rem;
    text-align: center;

    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      font-size: 1.2rem;
    }

    @media (min-width: ${BREAKPOINT_DESKTOP}) {
        font-size: 1.2rem;
      }

    @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
      font-size: 3rem;
    }
`;