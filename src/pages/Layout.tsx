import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import styled from "styled-components";
import { CookieConsent } from "../components/CookieConsent";
import { getUserSession } from "../services/CookieService";

const MainContainer = styled.main`
  width: 100%; 
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Gör att hela sidan alltid fyller hela höjden 
  display: flex;
  //nytt
  width: 100%;
  overflow-x: hidden;
`;


const ResponsiveWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 0 10px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 5px;
  }
`;



export const Layout = () => {
  const userSession = getUserSession();

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
      <ResponsiveWrapper>
      <MainContainer>
        {!userSession && ( 
          <CookieConsent onAccept={handleConsentAccept} onDeny={handleConsentDeny} />
        )}
        <Outlet />
      </MainContainer>
      </ResponsiveWrapper>
      <Footer />
  </AppContainer>
  );
};