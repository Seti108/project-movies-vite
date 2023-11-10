import { Link } from "react-router-dom";

export const Header = () => {
  return <nav className="header">
    <Link to="/">
    <h1>Fresh Movies</h1>
    </Link>
    </nav>;
};
