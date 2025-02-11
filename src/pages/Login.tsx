import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { ErrorText, GameLoginWrapper, TextStyle } from "../components/Wrappers";
import { SKUGGLILA, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_TABLET, GAMMELROSA } from "../components/styled/Variables";
import { FormButton } from "../components/styled/Buttons";
import axios from "axios";
import { getUserSession, removeUserSession, saveUserSession } from "../services/CookieService";


export const GameForm = styled.form`
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
  font-size: 1rem;
  color: ${SKUGGLILA};
  border: none;
  outline: none;
  width: 180px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid ${GAMMELROSA};
  text-align: center;
  padding: 0;
`;

export const LogoutMessage = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 50px;
`;

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{8,}$/;
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const session = getUserSession();
    if (session) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  
    if (isRegistering && !passwordValidationRegex.test(password)) {
      setPasswordError("Lösenordet måste vara minst 8 tecken, innehålla minst en stor och en liten bokstav, en siffra och ett specialtecken.");
      return;
    } else {
      setPasswordError("");
    }
  
    try {
      const endpoint = isRegistering ? "/users/register" : "/auth/login";
      const response = await axios.post(`${API_URL}${endpoint}`, { name, password });
  
      if (response.status === 201 || response.status === 200) {
        const loginResponse = isRegistering ? await axios.post(`${API_URL}/auth/login`, { name, password }) : response;
  
        if (loginResponse.status === 200) {
          const { user, token } = loginResponse.data;
          saveUserSession(user, token);
          setIsLoggedIn(true);
          onLogin();
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Ett oväntat fel inträffade. Försök igen.");
      }
      setName("");
      setPassword("");
    }
  };
  
  
  
  const handleLogout = () => {
    removeUserSession();
    setIsLoggedIn(false);
    setName(""); 
    setPassword("");
  };

  const handleStay = () => {
    onLogin();

  };

  if (isLoggedIn) {
    const session = getUserSession();
    const user = session ? session.user : null;

    return (
      <GameLoginWrapper>
      <LogoutMessage>
        <TextStyle>Är du säker att du vill logga ut, {user?.name}?</TextStyle>
        <FormButton onClick={handleLogout}>Ja</FormButton>
        <FormButton onClick={handleStay}>Nej</FormButton>
      </LogoutMessage>
      </GameLoginWrapper>
    );
  }

  return (
    <GameLoginWrapper>
      <TextStyle>{isRegistering ? "Skapa konto" : "Logga in för att spela"}</TextStyle>
      <GameForm onSubmit={handleSubmit}>
        <NameInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Namn"
        />
        <NameInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lösenord"
          autoComplete="new-password"
        />
        <FormButton type="submit">{isRegistering ? "Registrera" : "Logga in"}</FormButton>
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <div>
          {error && <ErrorText>{error}</ErrorText>}

          {isRegistering ? (
            <TextStyle>
              Har du redan ett konto?{" "}
              <span
                onClick={() => {
                  setIsRegistering(false);
                  setError("");
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Logga in här.
              </span>
            </TextStyle>
          ) : (
            <TextStyle>
              Inget konto?{" "}
              <span
                onClick={() => {
                  setIsRegistering(true);
                  setError("");
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Registrera dig.
              </span>
            </TextStyle>
          )}
        </div>
      </GameForm>
    </GameLoginWrapper>
  );
};