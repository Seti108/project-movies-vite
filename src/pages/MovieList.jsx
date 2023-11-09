import { useEffect, useState } from "react";
import { MovieHero } from "../components/MovieHero/MovieHero";
import { MovieCard } from "../components/MovieCard/MovieCard";

export const MovieList = () => {
  const apiKey = "d14980dd8df22d55a4bf4592f082a8c6";
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  

  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovieList = () => {
    fetch(url)
      .then((res) => res.json())
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
          <p>Loading movies...</p>
        ) : (
          <>
          <header>
          <MovieHero movie={movies.results[0]}/>
          </header>
          <section className="movieListContainer">
            {movies?.results.map((movie, index) => {
              if(index > 0) return <MovieCard key={movie.id} movie={movie} />;
            })}
          </section>
          </>
        )}
      </main>
    </>
  );
};