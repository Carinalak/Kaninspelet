import { styled } from "styled-components";
import { GameLoginWrapper } from "../components/Wrappers"
import { SKUGGLILA, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_TABLET } from "../components/styled/Variables";
import { Link } from "react-router-dom";
import { FormButton } from "../components/styled/Buttons";


export const GameForm = styled.form `
//margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 12px;
  padding-top: 10px;

        @media screen and (min-width: ${BREAKPOINT_TABLET}) {
        }
        @media screen and (min-width: ${BREAKPOINT_BIGGER_DESKTOP}) {
          row-gap: 20px;
          padding-top: 30px;

      }
`;

export const NameInput = styled.input`
  font-family: "Playpen Sans", serif;
  font-size: 16px;
  color: ${SKUGGLILA};
  border: none;
  outline: none;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  padding: 0;
`;

export const Login = () => {

return (<> 
<GameLoginWrapper>
  Skriv in ditt namn:
  <GameForm>
    <NameInput 
      className="NameInput"
      type="text"
      placeholder="Namn" 
    />
    <FormButton>Spara</FormButton>
    <Link to="/kaninspel">Kaninspel aktuell</Link>
    <Link to="/kaninspeltest1">Kaninspel Test 1</Link>
    <Link to="/kaninspeltest">Kaninspel Test</Link>
</GameForm>
</GameLoginWrapper>

</>)



}