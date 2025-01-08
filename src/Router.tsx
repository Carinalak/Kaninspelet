import { createHashRouter } from "react-router-dom";
import { Kaninspel } from "./pages/Kaninspel";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";




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
        ],
    },
]);
