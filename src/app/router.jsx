import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HalamanBeranda from "../pages/HalamanBeranda";
import HalamanDaftarResep from "../pages/HalamanDaftarResep";
import HalamanDetailResep from "../pages/HalamanDetailResep";
import HalamanTentang from "../pages/HalamanTentang";
import HalamanTidakDitemukan from "../pages/HalamanTidakDitemukan";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HalamanBeranda /> },
      { path: "/resep", element: <HalamanDaftarResep /> },
      { path: "/resep/:id", element: <HalamanDetailResep /> },
      { path: "/tentang", element: <HalamanTentang /> },
      { path: "*", element: <HalamanTidakDitemukan /> },
    ],
  },
]);