import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorPage } from "../ErrorPage";
import "./MovieDetail.css";
import star from "../../assets/star-icon.svg";
import time from "../../assets/clock-icon.svg";
import calendar from "../../assets/calendar-icon.svg";
import rightIcon from "../../assets/chevron_right_icon.svg";
import leftIcon from "../../assets/chevron_left_icon.svg";

export const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const { movieId } = useParams();
  const apiEnv = import.meta.env.VITE_MOVIE_API_TOKEN;
  // ?api_key=${apiEnv}
  const url = `https://api.themoviedb.org/3/movie/${movieId}&language=en-US`;
  const viewport = window.innerWidth;
  const imageUrl = `https://image.tmdb.org/t/p/`;
  const imageMedium = "w1280";
  const imageSmall = "w780";

  const adaptedImage = () => {
    if (viewport < 768) return imageSmall;
    else return imageMedium;
  };
  const fullImage = imageUrl + adaptedImage(viewport);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiEnv}`,
    },
  };

  const fetchMovieDetails = () => {
    fetch(url, options)
      .then((res) => {
        if (res.ok) return res.json();
        else if (res.status == 404)
          throw new Error("No movie found. Try another one");
        else throw new Error("Problem with fetching the API");
      })
      .then((data) => {
        if (data) {
          setMovieDetails(data);
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
    fetchMovieDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        !errorState && <p className="page-load-message">Page loading...</p>
      ) : (
        <section className="movie-section">
          <div className="movie-info">
            <span className="back-link">
              <Link to="/">
                <img src={leftIcon} alt="" />
                Back
              </Link>
            </span>
            <h1>{movieDetails?.title}</h1>
            <div className="wrapper-movie-info">
              <span className="rating">
                <img src={star} alt="star icon" />
                <p>{parseFloat(movieDetails?.vote_average).toFixed(1)}</p>
              </span>
              <span className="time">
                <img src={time} alt="clock icon" />
                <span>{movieDetails?.runtime}</span>
              </span>
              <span className="time">
                <img src={calendar} alt="calendar icon" />
                <p>{movieDetails?.release_date}</p>
              </span>
            </div>
            <p>{movieDetails?.overview}</p>
            <button className="cta-button">
              <a href={movieDetails?.homepage}>
                <span>Learn More</span>
                <img src={rightIcon} alt=""></img>
              </a>
            </button>
          </div>

          <div className="movie-img">
            <img src={fullImage + movieDetails?.backdrop_path}></img>
          </div>
        </section>
      )}

      {errorState && <ErrorPage />}
    </>
  );
};
