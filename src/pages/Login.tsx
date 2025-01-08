import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { GameLoginWrapper, TextStyle } from "../components/Wrappers";
import { SKUGGLILA, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_TABLET, GAMMELROSA } from "../components/styled/Variables";
import { FormButton } from "../components/styled/Buttons";
import axios from "axios";

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
  border: 1px solid ${GAMMELROSA};;
  text-align: center;
  padding: 0;
`;

interface LoginProps {
  onLogin: () => void; // Callback för att meddela att användaren är inloggad
}

export const Login = ({ onLogin }: LoginProps) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kolla om användaren redan är inloggad baserat på localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      if (isRegistering) {
        const response = await axios.post("http://localhost:3000/users", {
          name,
          password,
        });
        console.log("Registrering lyckades:", response); // Använd response här
  
        localStorage.setItem("user", JSON.stringify({ name, password }));
        setIsLoggedIn(true);
        onLogin();
      } else {
        const response = await axios.get("http://localhost:3000/users", {
          params: { name, password },
        });
  
        if (response.data.length === 0) {
          setError("Fel användarnamn eller lösenord.");
        } else {
          localStorage.setItem("user", JSON.stringify({ name, password }));
          setIsLoggedIn(true);
          onLogin();
        }
  
        // Logga eller använd svaret om du behöver information från servern
        console.log("Svar från servern:", response.data);
      }
    } catch (err) {
      setError("Något gick fel. Försök igen.");
      console.error(err);
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <GameLoginWrapper>
        <h2>Du är redan inloggad som {JSON.parse(localStorage.getItem("user") || "{}").name}</h2>
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
          placeholder="Namn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <NameInput
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton type="submit">{isRegistering ? "Registrera" : "Logga in"}</FormButton>
        {error && <p>{error}</p>}
        <div>
          {isRegistering ? (
            <TextStyle>
              Har du redan ett konto?{" "}
              <span onClick={() => setIsRegistering(false)} style={{ cursor: "pointer", color: "blue" }}>
                Logga in här.
              </span>
            </TextStyle>
          ) : (
            <TextStyle>
              Inget konto?{" "}
              <span onClick={() => setIsRegistering(true)} style={{ cursor: "pointer", color: "blue" }}>
                Registrera dig.
              </span>
            </TextStyle>
          )}
        </div>
      </GameForm>
    </GameLoginWrapper>
  );
};
