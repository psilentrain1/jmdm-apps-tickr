import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router";

import App from "./App";
import { Dashboard } from "./views/Dashboard";
import { Watchlist } from "./views/Watchlist";
import { Settings } from "./views/Settings";
import { SearchResults } from "./views/SearchResults";

const route = createHashRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/search/:param",
        element: <SearchResults />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
);
