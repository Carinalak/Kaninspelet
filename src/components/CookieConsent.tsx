import { useState } from "react";
import styled from "styled-components";
import { SMUTSROSA, KRITVIT, POOLBLA, GAMMELROSA } from "./styled/Variables";
import HappyCookie from "../assets/img/happyCookie2.png";

const CookieConsentWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${KRITVIT};
  padding: 10px;
  text-align: center;
  font-size: 14px;
  z-index: 3000;
`;

const CookieInner = styled.div `
  display: flex;
  flex-direction: column;
`;

const CookieTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: 10px;
  margin-right: 20px;
`;

const CookieButton = styled.button`
  background-color: ${GAMMELROSA};
  color: ${KRITVIT};
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  margin-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 15px;
  width: 180px;
  height: 35px;

    &:hover {
      background-color: ${SMUTSROSA};
      color: ${KRITVIT};
    }
    &:active {
      background-color: ${POOLBLA};
      color: ${KRITVIT};
    }
`;

export const CookieConsent: React.FC<{ onAccept: () => void; onDeny: () => void }> = ({
  onAccept,
  onDeny,
}) => {
  const [visible, setVisible] = useState(true);

  const handleAccept = () => {
    setVisible(false);
    document.cookie = "cookieConsent=true; path=/;";
    onAccept();
  };

  const handleDeny = () => {
    setVisible(false);
    document.cookie = "cookieConsent=false; path=/;";
    onDeny();
  };

  if (!visible) return null;

  return (
    <CookieConsentWrapper>
      <CookieInner>
        <CookieTextWrapper>
          Denna webbplats använder cookies för att förbättra användarupplevelsen. Godkänn för att fortsätta. <img src={HappyCookie} alt="Happy Cookie" width="40" height="40" />
        </CookieTextWrapper>
        <div>
          <CookieButton onClick={handleAccept}>Acceptera alla</CookieButton>
          <CookieButton onClick={handleDeny}>Endast nödvändiga</CookieButton>
        </div>
      </CookieInner>
    </CookieConsentWrapper>
  );
};