import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AdminLogIn from "./login";
import AdminLogIn from "./login.tsx";
import Admin from "./admin";

function Router() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <AdminLogIn/>,
        },
        {
            path: "/admin",
            element: <Admin/>,
        }
    ]);
    return <>
        <div>
            <RouterProvider router={router} />
        </div>
    </>
}

export default Router;