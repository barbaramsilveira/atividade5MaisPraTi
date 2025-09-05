import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import PesquisarFilmes from "./pages/PesquisarFilmes";
import Detalhes from "./pages/Detalhes";
import Favoritos from "./pages/Favoritos";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "pesquisar", element: <PesquisarFilmes /> },
      { path: "favoritos", element: <Favoritos /> },
      { path: "detalhes/:id", element: <Detalhes /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default router;
