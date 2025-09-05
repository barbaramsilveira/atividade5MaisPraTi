import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { FavoritosProvider } from "./context/FavoritosContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritosProvider> {}
      <RouterProvider router={router} />
    </FavoritosProvider>
  </React.StrictMode>
);