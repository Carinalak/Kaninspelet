import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer";
import styled from "styled-components";

const MainContainer = styled.main`
  padding-top: 60px;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Layout = () => {
  return (
    <AppContainer>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </AppContainer>
  );
};