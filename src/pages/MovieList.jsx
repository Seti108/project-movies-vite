import { useEffect, useState } from "react";
import { MovieHero } from "../components/MovieHero/MovieHero";
import { MovieCard } from "../components/MovieCard/MovieCard";

export const MovieList = () => {
  const apiEnv = import.meta.env.VITE_MOVIE_API_TOKEN;
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;

  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiEnv}`,
    },
  };

  const fetchMovieList = () => {
    fetch(url, options)
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

  return (
    <>
      <main>
        {isLoading ? (
          <p>Loading movies...</p>
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
    </>
  );
};
