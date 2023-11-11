import { Link } from "react-router-dom";
import "./CTAButton.css";
import rightIcon from "../../../src/assets/chevron_right_icon.svg"

export const CTAButton = ({ btnTarget, movie, btnText }) => {
  const renderSwitch = (btnTarget) => {
    switch (btnTarget) {
      case "movieDetail":
        return `/movie/${movie.id}`;
      case "errorPage":
        return `/`;
      default:
        return null;
    }
  };

  return (
    <button className="cta-button">
      <Link to={renderSwitch(btnTarget)}>
        {btnText}
        <img
          src={rightIcon}
          alt=""
        ></img>

      </Link>
    </button>
  );
};
