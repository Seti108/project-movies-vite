import calendar from "../../src/assets/calendar-icon.svg"
export const MovieInfo = ({ title, date }) => {
  return (
    <div className="movieInfo">
      <p>{title}</p>
      <span className="date"><img src={calendar} alt="calendar icon" /><p>{date}</p></span>
    </div>
  );
};
