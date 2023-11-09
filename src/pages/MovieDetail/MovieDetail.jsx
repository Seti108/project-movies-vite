import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetail.css";

export const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams();
  const apiKey = "d14980dd8df22d55a4bf4592f082a8c6";
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  const imageUrl = `https://image.tmdb.org/t/p/`;
  const imageBig = "w1280";
  const fullImage = imageUrl + imageBig;
  // const rating = parseFloat(movieDetails.vote_average).toFixed(1);
  // console.log(rating);

  const fetchMovieDetails = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMovieDetails(data);
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
    fetchMovieDetails();
  }, []);

  console.log(movieDetails);

  return (
    <>
      {isLoading ? (
        <p>Page loading...</p>
      ) : (
        <section className="movie-section">
          <div className="movie-info">
            <span className="back-link">
              <Link to="/">
                <img src="../src/assets/chevron_left_icon.svg" alt="" />
                Back
              </Link>
            </span>
            <h1>{movieDetails.title}</h1>
            <div className="wrapper-movie-info">
              <span className="rating">
                <img src="../../src/assets/star-icon.svg" alt="star icon" />
                <p>{parseFloat(movieDetails.vote_average).toFixed(1)}</p>
              </span>
              <span className="time">
                <img src="../../src/assets/clock-icon.svg" alt="star icon" />
                <span>{movieDetails.runtime}</span>
              </span>
              <span className="time">
                <img src="../../src/assets/calendar-icon.svg" alt="star icon" />
                <p>{movieDetails.release_date}</p>
              </span>
            </div>
            <p>{movieDetails.overview}</p>
            <button className="movie-detail-cta">
              <a href={movieDetails.homepage}>
                <span>Learn More</span>
                <img
                  src="../../src/assets/chevron_right_icon.svg"
                  alt="Visit movie website"
                ></img>
              </a>
            </button>
          </div>

          <div className="movie-img">
            <img src={fullImage + movieDetails.backdrop_path}></img>
          </div>
        </section>
      )}
    </>
  );
};
