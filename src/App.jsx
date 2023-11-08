import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieList } from "./pages/MovieList";
import { MovieDetail } from "./pages/MovieDetail/MovieDetail";
import { ErrorPage } from "./pages/ErrorPage";
import { Header } from "./components/Header";

export const App = () => {
  const routes = (
    <>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="/404" element={<ErrorPage />} />
    </>
  );

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </>
  );
};
