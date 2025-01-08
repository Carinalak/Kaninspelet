import styled from "styled-components";
import { BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_BIGGER_DESKTOP, KOLSVART } from "./styled/Variables";


export const WrapperTransparent = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  padding-top: 10px;
  //padding-bottom: 10px;
  //border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 0;
  font-family: "Playpen Sans", serif;
  margin: 0 auto;
  gap: 20px;
  border: 1px solid black;

    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      width: 600px;
      //padding-bottom: 20px;
      flex-direction: row;
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



export const GameLoginWrapper = styled.div`
  padding-top: 90px;


  @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
       padding-top: 150px;
    }

`;

export const TextWrapper = styled.div `
  width: 170;
  display: flex;
  //border: 1px solid black;
  align-items: center;
  justify-content: center;
 
`;

export const TextStyle = styled.div `
  font-size: 1rem;
  color: ${KOLSVART};
  font-weight: 500;
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
`;

export const Question = styled.div `
  margin-top: 50px;

`;
