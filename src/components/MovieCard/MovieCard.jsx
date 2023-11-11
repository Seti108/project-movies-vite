import { MovieInfo } from "../MovieInfo";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const imageUrl = `https://image.tmdb.org/t/p/`;
const imageBig = "w780";
const imageMedium = "w500";
const imageSmall = "w300";

const viewport = window.innerWidth;

const adaptedImage = () => {
  if (viewport < 768) return imageSmall;
  else if (viewport > 768 && viewport < 1024) return imageMedium;
  else return imageBig;
};

export const MovieCard = ({ movie }) => {
  const fullImageUrl = imageUrl + adaptedImage() + movie.poster_path;
  return (
    <Link className="movieCard" to={`/movie/${movie.id}`}>
      <img fetchpriority="low" src={fullImageUrl} />
      <MovieInfo title={movie.title} date={movie.release_date} />
    </Link>
  );
};
