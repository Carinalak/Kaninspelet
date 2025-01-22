import Cookies from "js-cookie";

interface User {
  id: number;
  name?: string;
}

// Spara användarsession i en cookie
export const saveUserSession = (user: User, token: string) => {
  if (!user || typeof user.id === "undefined") {
    console.error("Ogiltig användare, id saknas:", user);
    return;
  }

  const sessionData = {
    user: user,
    user_id: user.id,
    token: token,
  };

  Cookies.set("session", JSON.stringify(sessionData), {
    expires: 7, // Cookien är giltig i 7 dagar
    sameSite: "Strict",
    secure: true,
  });

  console.log("Session saved:", sessionData);
};


// Hämta användarsession från en cookie
export const getUserSession = () => {
  const session = Cookies.get("session");
  console.log("Full cookie:", document.cookie);
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

// Ta bort session-cookie
export const removeUserSession = () => {
  Cookies.remove("session");
  console.log("Session removed");
};
