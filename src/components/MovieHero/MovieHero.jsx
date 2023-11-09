import { CTAButton } from "../CTAButton/CTAButton";
import { MovieInfo } from "../MovieInfo";
import { useEffect } from "react";
import "./MovieHero.css";

const imageUrl = `https://image.tmdb.org/t/p/`;
const imageBig = "original";
const imageMedium = "w1280";
const imageSmall = "w780";
const btnTarget = "movieDetail";
const btnText = "See details";
const viewport = window.innerWidth;

const adaptedImage = () => {
  if (viewport < 768) return imageSmall;
  else if (viewport < 1439 && viewport > 767) return imageMedium;
  else return imageBig;
};

export const MovieHero = ({ movie }) => {
  const backgroundImage =
    imageUrl + adaptedImage(viewport) + movie.backdrop_path;

  let backgroundStyle = { backgroundImage: `url(${backgroundImage})` };

  return (
    <section className="hero" style={backgroundStyle}>
      <MovieInfo title={movie.title} date={movie.release_date} />
      <CTAButton btnTarget={btnTarget} movie={movie} btnText={btnText} />
    </section>
  );
};
