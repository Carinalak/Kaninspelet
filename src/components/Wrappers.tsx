import styled from "styled-components";
import { BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_BIGGER_DESKTOP } from "./styled/Variables";


export const WrapperTransparent = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  padding-top: 5px;
  //padding-bottom: 10px;
  //border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 0;
  font-family: "Playpen Sans", serif;
  margin: 0 auto;

    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      width: 600px;
      //padding-bottom: 20px;
    }

    @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
      width: 800px;
      //padding-bottom: 40px;
    }

    @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
      width: 1000px;
      //height: 89%;
      padding-bottom: 70px;
      font-size: 60px;
  }
`;

export const GameLoginWrapper = styled(WrapperTransparent)`
  padding-top: 90px;
  //margin: 0 auto;
 // height: 100vh;

  @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
       padding-top: 150px;
    }

`;
