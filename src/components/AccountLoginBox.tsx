import { styled } from "styled-components";
import { GAMMELROSA, KOLSVART, BREAKPOINT_TABLET, SKUGGLILA, KRITVIT } from "./styled/Variables";
import { AccountButton } from "./styled/Buttons";



export const AccountLoginOuter = styled.div `
  //position: fixed;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%, -50%);
  width: 250px;
  height: 300px;
  background-color: ${GAMMELROSA};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid ${KOLSVART};

  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  @media screen and ( min-width: ${BREAKPOINT_TABLET}) {
    width: 400px;
    width: 400px;
  
    font-weight: bold;
  }
`;

export const AccountLoginInner = styled(AccountLoginOuter) `
  background-color: ${KRITVIT};
  color: ${SKUGGLILA};
  width: 200px;
  height: 200px;
  border: 1px solid ${KOLSVART};

  @media screen and ( min-width: ${BREAKPOINT_TABLET}) {
    width: 350px;
    width: 350px;

    font-weight: bold;
  }
`;

export const AccountLoginBox = () => {


return(<>
<AccountLoginOuter>
  <AccountLoginInner>
  <AccountButton type="submit"> Resultat</AccountButton>
  <AccountButton type="submit"> Logga ut</AccountButton>

  </AccountLoginInner>

</AccountLoginOuter>


</>)


}