import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import styled from "styled-components";
import { BREAKPOINT_DESKTOP, BREAKPOINT_TABLET } from "../components/styled/Variables";
import { CookieConsent } from "../components/CookieConsent";

const MainContainer = styled.main`
  //padding-top: 50px;
  overflow-x: hidden;
  

    @media screen and (min-width: ${BREAKPOINT_TABLET}) {
      //padding-top: 60px;
    }
    @media screen and (min-width: ${BREAKPOINT_DESKTOP}) {
      //padding-top: 80px;
    }
`;
/*
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;*/

export const Layout = () => {
  function handleConsentAccept(): void {
    throw new Error("Function not implemented.");
  }

  return (<>

      <Header />
      <MainContainer>
      <CookieConsent onAccept={handleConsentAccept} onDeny={function (): void {
        throw new Error("Function not implemented.");
      } } />
            {/*<CookieConsent onAccept={() => console.log("Cookies accepted!")} />*/}
        <Outlet />
      </MainContainer>
      <Footer />
      </>
  );
};