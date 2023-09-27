// import React, {lazy} from 'react';
// import { createRoot } from 'react-dom/client';
// const App = lazy(() => import('./App.jsx'));
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);