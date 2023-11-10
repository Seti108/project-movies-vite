import { useEffect, useState } from "react";
import { MovieHero } from "../components/MovieHero/MovieHero";
import { MovieCard } from "../components/MovieCard/MovieCard";
import { ErrorPage } from "./ErrorPage";

export const MovieList = () => {
  const apiEnv = import.meta.env.VITE_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiEnv}&language=en-US&page=1`;

  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const fetchMovieList = () => {
    fetch(url)
      .then((res) => (res.ok ? res.json() : setErrorState(true)))
      .then((data) => {
        if (data) {
          setMovies(data);
          setIsLoading(false);
        } else {
          throw new Error("Couldn't contact the API");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  if (movies) console.log(movies);

  return (
    <>
      <main>
        {isLoading ? (
          !errorState && <p className="page-load-message">Loading movies...</p>
        ) : (
          <>
            <header>
              <MovieHero movie={movies.results[0]} />
            </header>
            <section className="movieListContainer">
              {movies?.results.map((movie, index) => {
                if (index > 0)
                  return <MovieCard key={movie.id} movie={movie} />;
              })}
            </section>
          </>
        )}
      </main>
      {errorState && <ErrorPage />}
    </>
  );
};
