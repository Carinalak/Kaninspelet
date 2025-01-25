import styled from "styled-components";
import { BREAKPOINT_TABLET, BREAKPOINT_DESKTOP, BREAKPOINT_BIGGER_DESKTOP, KRITVIT, KOLSVART, HJARTROD, SKUGGLILA, SOLGUL } from "./styled/Variables";
import { Link } from "react-router-dom";


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
  margin-bottom: 100px;
  //border: 1px solid black;

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

export const WrapperWhite = styled(WrapperTransparent) `
  background-color: ${KRITVIT};
  width: 300px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 30px;
  
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 400px;
  }
`;

export const GameLoginWrapper = styled.div`
  padding-top: 10px;
  background-color: ${KRITVIT};
  width: 240px;
  height: 350px;
  padding: 5px;
  border-radius: 10px;
`;

export const ResultWrapper = styled.div `

  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  padding-top: 10px;
  padding-bottom: 100px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 0;
  font-family: "Playpen Sans", serif;
  margin: 0 auto;
  color: ${KRITVIT};
  //border: 1px solid black;

  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
    width: 600px;
    }
`;

export const Question = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  background-color: ${SOLGUL};
  padding: 15px;
  width: 80px;
  height: 20px;
  text-align: center;
  //color: ${KRITVIT};
  border-radius: 30px;
  border: 1.5px solid ${KOLSVART};
  font-size: 1rem;

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
  padding-top: 5px;
  padding-right: 15px;
  padding-left: 20px;
`;

export const TextStyleWhite = styled(TextStyle) `
  color: ${KRITVIT};
`;

export const TextStyleCentered = styled(TextStyle) `
text-align: center;
`;

export const ErrorText = styled(TextStyle) `
    color: ${HJARTROD};
`;

export const TextStyleInloggad = styled(TextStyle) `
  position: absolute;
  top: 30px;
  text-align: center;
  color: ${SKUGGLILA};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0;
  padding: 0; 
  display: flex;
`;