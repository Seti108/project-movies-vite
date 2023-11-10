export const MovieInfo = ({ title, date }) => {
  return (
    <div className="movieInfo">
      <p>{title}</p>
      <span className="date"><img src="../../src/assets/calendar-icon.svg" alt="calendar icon" /><p>{date}</p></span>
    </div>
  );
};
