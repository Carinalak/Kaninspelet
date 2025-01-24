import { createHashRouter } from "react-router-dom";
import { Kaninspel } from "./pages/Kaninspel";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Results } from "./pages/Results";
import { Highscore } from "./pages/Highscore";




export const router = createHashRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Kaninspel></Kaninspel>,
            },
            {
                path: "/results",
                element: <Results></Results>,
            },
            {
                path: "/highscore",
                element: <Highscore></Highscore>,
            },
        ],
    },
]);
