import styled from "styled-components";
import { KRITVIT } from "./styled/Variables";
import { H1Title } from "./styled/Fonts";

const HeaderContainer = styled.header`
//position: fixed;
top: 0;
z-index: 100;
color: ${KRITVIT};
margin: 0;
width: 100%;
`;


export const Header = () => {

return (<>

  <HeaderContainer>
    <H1Title>Kaninspelet</H1Title>
  </HeaderContainer>
</>)
}