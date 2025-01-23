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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Gör att hela sidan alltid fyller hela höjden 
`;

export const Layout = () => {

  const handleConsentAccept = (): void => {
    console.log("Cookies accepted!");
    document.cookie = "cookieConsent=true; path=/;";
  };

  const handleConsentDeny = (): void => {
    console.log("Cookies denied!");
    document.cookie = "cookieConsent=false; path=/;";
  };


  return (
    <AppContainer>
      <Header />
      <MainContainer>
      <CookieConsent onAccept={handleConsentAccept} onDeny={handleConsentDeny} />
            {/*<CookieConsent onAccept={() => console.log("Cookies accepted!")} />*/}
        <Outlet />
      </MainContainer>
      <Footer />
  </AppContainer>
  );
};