import { createHashRouter } from "react-router-dom";
import { Kaninspel } from "./pages/Kaninspel";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";



export const router = createHashRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Login></Login>,
            },
            {
                path: "/galleri",
                element: <Kaninspel></Kaninspel>,
            },
        ],
    },
]);