import { H1Title404, H4White } from "../components/styled/Fonts"
import NotFoundImage from '../assets/img/NotFound.png';
import { styled } from "styled-components";
import { StyledLinkWhite, WrapperTransparent2 } from "../components/Wrappers";



export const NotFoundImg = styled.img `
width: 300px;

`;
export const NotFound = () => {
  return (
      <>
      <WrapperTransparent2>
      <H1Title404>404 Not Found</H1Title404>
          <H4White>Ooops, nu har du kommit fel!</H4White>
          <NotFoundImg src={NotFoundImage}/>
          <StyledLinkWhite to={"/"} >Gå tillbaka till sidan. </StyledLinkWhite>
      </WrapperTransparent2>
      </>

  )
}