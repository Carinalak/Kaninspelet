import Cookies from "js-cookie";

// Funktion för att sätta användardata och token i en session-cookie
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveUserSession = (user: any, token: string) => {
  const sessionData = {
    user: user,
    user_id: user.id,
    token: token
  };

  Cookies.set("session", JSON.stringify(sessionData), {
    expires: 7,
    sameSite: "Strict",
    secure: true,
  });

  console.log("Session saved:", sessionData);
};

// Funktion för att hämta användardata och token från session-cookien
export const getUserSession = () => {
  const session = Cookies.get("session");
  if (session) {
    try {
      const parsedSession = JSON.parse(session);
      console.log("Fetched session from cookie:", parsedSession);
      return parsedSession; // Returnerar både user och token
    } catch (error) {
      console.error("Kunde inte parsa session-cookien:", error);
      return null;
    }
  }
  return null;
};

// Funktion för att ta bort session-cookien
export const removeUserSession = () => {
  Cookies.remove("session");
  console.log("Session removed"); // Loggar när sessionen tas bort
};
