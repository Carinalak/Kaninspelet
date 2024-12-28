import { styled } from "styled-components";
import { WrapperTransparent } from "../components/Wrappers"
import { SKUGGLILA, GAMMELROSA, KRITVIT, POOLBLA, SMUTSROSA, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_TABLET } from "../components/styled/Variables";


export const GameForm = styled.form `
//margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
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

export const Button = styled.button`

  width: 250px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background-color: ${GAMMELROSA};
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: ${KRITVIT};
  cursor: pointer;

  &:hover {
    background-color: ${SMUTSROSA};
    color: ${KRITVIT};
  }
  &:active {
    background-color: ${POOLBLA};
    color: ${KRITVIT};
  }
  @media screen and (min-width: ${BREAKPOINT_TABLET}) {
}
`;



export const Login = () => {


return (<> 
<WrapperTransparent>
  Skriv in ditt namn:
  <GameForm>
    <NameInput className="NameInput"
                  type="text"
                  placeholder="Namn" 
    />
    <Button>Spara</Button>
</GameForm>
</WrapperTransparent>

</>)



}