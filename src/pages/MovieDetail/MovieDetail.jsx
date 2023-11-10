import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorPage } from "../ErrorPage";
import "./MovieDetail.css";
import star from "../../assets/star-icon.svg";

export const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);
  const { movieId } = useParams();
  const apiEnv = import.meta.env.VITE_MOVIE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiEnv}&language=en-US`;
  const viewport = window.innerWidth;
  const imageUrl = `https://image.tmdb.org/t/p/`;
  const imageMedium = "w1280";
  const imageSmall = "w780";

  const adaptedImage = () => {
    if (viewport < 768) return imageSmall;
    else return imageMedium;
  };
  const fullImage = imageUrl + adaptedImage(viewport);

  const fetchMovieDetails = () => {
    fetch(url)
      .then((res) => (res.ok ? res.json() : setErrorState(true)))
      .then((data) => {
        if (data) {
          setMovieDetails(data);
          setIsLoading(false);
        } else {
          throw new Error("Error fetching the API");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        !errorState && <p>Page loading...</p>
      ) : (
        <section className="movie-section">
          <div className="movie-info">
            <span className="back-link">
              <Link to="/">
                <img src="../src/assets/chevron_left_icon.svg" alt="" />
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
                <img src="../../src/assets/clock-icon.svg" alt="star icon" />
                <span>{movieDetails?.runtime}</span>
              </span>
              <span className="time">
                <img src="../../src/assets/calendar-icon.svg" alt="star icon" />
                <p>{movieDetails?.release_date}</p>
              </span>
            </div>
            <p>{movieDetails?.overview}</p>
            <button className="cta-button">
              <a href={movieDetails?.homepage}>
                <span>Learn More</span>
                <img
                  src="../../src/assets/chevron_right_icon.svg"
                  alt="Visit movie website"
                ></img>
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
