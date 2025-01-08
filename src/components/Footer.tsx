import styled from "styled-components";
import { BREAKPOINT_BIGGER_DESKTOP } from "./styled/Variables";
import { OrdinaryFont } from "./styled/Fonts";


const FooterContainer = styled.footer`
padding: 2px;
padding-bottom: 0;
text-align: center;
margin-top: auto; /* Flyttar footern längst ner */
margin-bottom: 0 !important;
max-width: 100%;
//height: 60px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

  @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
    height: 100px;
  }
`;

export const Footer = () => {

return (
  <FooterContainer>
    <OrdinaryFont>&copy; Kaninspelet 2025 Carina Lakosil</OrdinaryFont>
  </FooterContainer>
);
}