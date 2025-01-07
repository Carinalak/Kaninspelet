import { useState } from "react";
import { styled } from "styled-components";
import { GameLoginWrapper } from "../components/Wrappers";
import { SKUGGLILA, BREAKPOINT_BIGGER_DESKTOP, BREAKPOINT_TABLET } from "../components/styled/Variables";
import { useNavigate } from "react-router-dom";
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
  font-size: 16px;
  color: ${SKUGGLILA};
  border: none;
  outline: none;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  padding: 0;
`;

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (isRegistering) {
        // Om vi är i registreringsläge, skapa användare
        const response = await axios.post("http://localhost:3000/users", {
          name,
          password,
        });

        localStorage.setItem("user", JSON.stringify({ name, password }));

        navigate("/kaninspel");

        console.log("Användare skapad och inloggad: ", response.data);
      } else {
        // kontrollera om användaren finns i databasen
        const response = await axios.get("http://localhost:3000/users", {
          params: {
            name,
            password,
          },
        });

        if (response.data.length > 0) {
          // Om användaren finns, logga in och spara i localStorage
          localStorage.setItem("user", JSON.stringify({ name, password }));
          navigate("/kaninspel");
        } else {
          setError("Fel användarnamn eller lösenord.");
        }
      }
    } catch (err) {
      setError("Något gick fel. Försök igen.");
      console.error(err);
    }
  };

  return (
    <GameLoginWrapper>
      <h2>{isRegistering ? "Skapa konto" : "Logga in för att spela"}</h2>
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
            <p>
              Har du redan ett konto?{" "}
              <span onClick={() => setIsRegistering(false)} style={{ cursor: "pointer", color: "blue" }}>
                Logga in här.
              </span>
            </p>
          ) : (
            <p>
              Inget konto?{" "}
              <span onClick={() => setIsRegistering(true)} style={{ cursor: "pointer", color: "blue" }}>
                Registrera dig.
              </span>
            </p>
          )}
        </div>
      </GameForm>
    </GameLoginWrapper>
  );
};
