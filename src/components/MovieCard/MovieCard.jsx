import { MovieInfo } from "../MovieInfo";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const imageUrl = `https://image.tmdb.org/t/p/`;
const imageBig = "original";
const imageSmall = "w300";

export const MovieCard = ({ movie }) => {
  const fullImageUrl = imageUrl + imageSmall + movie.poster_path;

  return (
    <Link className="movieCard" to={`/movie/${movie.id}`}>
      <img src={fullImageUrl} />
      <MovieInfo title={movie.title} date={movie.release_date} />
    </Link>
  );
};
