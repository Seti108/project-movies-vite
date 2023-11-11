import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieList } from "./pages/MovieList";
import { MovieDetail } from "./pages/MovieDetail/MovieDetail";
import { MovieSimilar } from "./pages/MovieSimilar/MovieSimilar";
import { ErrorPage } from "./pages/ErrorPage";
import { Header } from "./components/Header";
import "./index.css";

export const App = () => {
  const routes = (
    <>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="/movie/:movieId/similar" element={<MovieSimilar />} />
      <Route path="/*" element={<ErrorPage />} />
    </>
  );

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>{routes}</Routes>
      </BrowserRouter>
      <p className="attribution">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </>
  );
};
