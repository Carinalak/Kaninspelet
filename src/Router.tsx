import { createHashRouter } from "react-router-dom";
import { Kaninspel } from "./pages/Kaninspel";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { KaninspelTest1 } from "./pages/KaninspelTest1";
import { KaninspelTest } from "./pages/KaninspelTest";



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
                path: "/kaninspel",
                element: <Kaninspel></Kaninspel>,
            },
            {
                path: "/kaninspeltest1",
                element: <KaninspelTest1></KaninspelTest1>,
            },
            {
                path: "/kaninspeltest",
                element: <KaninspelTest></KaninspelTest>,
            },
        ],
    },
]);
