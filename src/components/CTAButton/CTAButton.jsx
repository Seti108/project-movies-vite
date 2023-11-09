import { Link } from "react-router-dom";
import "./CTAButton.css";

<Link to="/contact">Contact</Link>;

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
          src="../../src/assets/chevron_right_icon.svg"
          alt="Back to home"
        ></img>
      </Link>
    </button>
  );
};
