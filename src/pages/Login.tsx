import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { ErrorText, GameLoginWrapper, TextStyle } from "../components/Wrappers";
import { SKUGGLILA, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_TABLET, GAMMELROSA } from "../components/styled/Variables";
import { FormButton } from "../components/styled/Buttons";
import axios from "axios";
import { saveUserSession } from "../services/CookieService";

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
  border-radius: 10px;
  border: 1px solid ${GAMMELROSA};
  text-align: center;
  padding: 0;
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

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    try {
      if (isRegistering) {
        const response = await axios.post(`${API_URL}/users/register`, {
          name,
          password,
        });

        if (response.status === 201) {
          const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            name,
            password,
          });

          if (loginResponse.status === 200) {
            const { user, token } = loginResponse.data;
            saveUserSession(user, token);

            setIsLoggedIn(true);
            onLogin();
          } else {
            setError("Fel användarnamn eller lösenord. Försök igen.");
          }
        } else {
          setError("Misslyckades med att skapa användare. Försök igen.");
        }
      } else {
        const response = await axios.post(`${API_URL}/auth/login`, {
          name,
          password,
        });

        if (response.status === 200) {
          const { user, token } = response.data;
          saveUserSession(user, token);

          setIsLoggedIn(true);
          onLogin();
        } else {
          setError("Fel användarnamn eller lösenord. Försök igen.");
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Ett oväntat fel inträffade. Försök igen.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return (
      <GameLoginWrapper>
        <h2>Du är redan inloggad som {user.name}</h2>
        <FormButton onClick={handleLogout}>Logga ut</FormButton>
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
        />
        <FormButton type="submit">{isRegistering ? "Registrera" : "Logga in"}</FormButton>
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