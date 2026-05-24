import { Link } from "react-router-dom";
import LogoutButton from "../pages/Logout";

function Header() {
  return (
    <header id="header-group">
      <div id="header">
        <h1 id="title">
          Birdwatch
          <i id="bird" className="fa-solid fa-crow"></i>
          Pro
        </h1>

        <p id="tag">A personal use website for logging my birdsightings.</p>
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/signup">
            <button>Sign-up</button>
          </Link>

          <LogoutButton />
        </div>
      </div>

      <div id="options">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/sightings">Sightings</Link>
        <Link to="/about">About</Link>
      </div>
    </header>
  );
}

export default Header;
