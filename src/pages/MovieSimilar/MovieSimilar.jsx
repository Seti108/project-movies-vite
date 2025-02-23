import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { ErrorPage } from "../ErrorPage";
import "./MovieSimilar.css";
import leftIcon from "../../assets/chevron_left_icon.svg";

export const MovieSimilar = () => {
  let { state } = useLocation();

  const [movieSimilar, setMovieSimilar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar`;

  const apiEnv = import.meta.env.VITE_MOVIE_API_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiEnv}`,
    },
  };

  const fetchSimilarMovies = () => {
    fetch(url, options)
      .then((res) => {
        if (res.ok) return res.json();
        else if (res.status == 404)
          throw new Error("No movie found. Try another one");
        else throw new Error("Problem with fetching the API");
      })
      .then((data) => {
        if (data) {
          setMovieSimilar(data);
          setIsLoading(false);
        } else {
          throw new Error("Error fetching the API");
        }
      })
      .catch((err) => {
        setErrorState(true);
        if (err.message === "No movie found. Try another one")
          console.error(err.message);
      });
  };

  useEffect(() => {
    fetchSimilarMovies();
  }, []);

  return (
    <main>
      {isLoading && !errorState ? (
        <p className="page-load-message">Loading movies...</p>
      ) : (
        <>
          <section className="MovieSimilarContainer">
            <h2>Movies similar to: {state?.name}</h2>
            <span className="back-link">
              <Link to={-1}>
                <img src={leftIcon} alt="" />
                Back
              </Link>
            </span>
          </section>

          <section className="movieListContainer">
            {movieSimilar?.results.map((movie, index) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </section>
        </>
      )}
      {errorState && <ErrorPage />}
    </main>
  );
};
