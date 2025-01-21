import { useState, useEffect } from "react";
import styled from "styled-components";

// Styled-components för varningen
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

const ConsentButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CookieConsent: React.FC<{ onAccept: () => void }> = ({ onAccept }) => {
  const [consentGiven, setConsentGiven] = useState(false);

  // Kontrollera om cookie-samtycke redan finns
  useEffect(() => {
    const consent = document.cookie.split("; ").find((row) => row.startsWith("cookieConsent="));
    if (consent && consent.split("=")[1] === "true") {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    setConsentGiven(true);
    document.cookie = "cookieConsent=true; path=/;";
    onAccept(); // Anropa callback-funktionen när samtycke accepteras
  };

  if (consentGiven) return null;

  return (
    <CookieConsentWrapper>
      Denna webbplats använder cookies för att förbättra användarupplevelsen. Genom att fortsätta använda webbplatsen godkänner du vår användning av cookies.
      <ConsentButton onClick={handleAccept}>Acceptera</ConsentButton>
    </CookieConsentWrapper>
  );
};

export default CookieConsent;
