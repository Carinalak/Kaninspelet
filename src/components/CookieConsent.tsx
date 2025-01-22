import { useState } from "react";
import styled from "styled-components";
import { SMUTSROSA, KRITVIT, POOLBLA, GAMMELROSA } from "./styled/Variables";

const CookieConsentWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  z-index: 3000;
`;

const CookieInner = styled.div `
  display: flex;
  flex-direction: column;
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
        <div>
          Denna webbplats använder cookies för att förbättra användarupplevelsen. Genom att fortsätta använda webbplatsen godkänner du vår användning av cookies.
        </div>
        <div>
          <CookieButton onClick={handleAccept}>Acceptera alla</CookieButton>
          <CookieButton onClick={handleDeny}>Endast nödvändiga</CookieButton>
        </div>
      </CookieInner>
    </CookieConsentWrapper>
  );
};