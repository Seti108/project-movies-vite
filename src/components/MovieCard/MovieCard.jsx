import { MovieInfo } from "../MovieInfo";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import placeholder from "../../../src/assets/no-image-found.png";

const imageBig = "w780";
const imageMedium = "w500";
const imageSmall = "w300";
const imgUrl = `https://image.tmdb.org/t/p/`;

const viewport = window.innerWidth;

const adaptedImage = () => {
  if (viewport < 768) return imageMedium;
  else if (viewport > 768 && viewport < 1024) return imageSmall;
  else return imageBig;
};

export const MovieCard = ({ movie }) => {
  const imageUrl = () => {
    let fullImageUrl;
    if (movie.poster_path === null) {
      fullImageUrl = placeholder;
    } else {
      fullImageUrl = imgUrl + adaptedImage() + movie.poster_path;
    }
    return fullImageUrl;
  };
  // imageUrl();
  return (
    <Link className="movieCard" to={`/movie/${movie.id}`}>
      <img fetchpriority="low" src={imageUrl()} />
      <MovieInfo title={movie.title} date={movie.release_date} />
    </Link>
  );
};
