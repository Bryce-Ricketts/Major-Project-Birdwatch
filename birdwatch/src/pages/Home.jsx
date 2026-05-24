import { Link } from "react-router-dom"

function Home() {
  return (
    <div id="home-body">
      <div>
        <h2>
          Welcome to the bird page where you can search for birds and then log
          your sightings!
        </h2>
        <p>This is a very basic description until the text can be refined.</p>
        <p>
          This page is also currently only for sightings of birds in the United
          Kingdom, as this is where I live.
        </p>
        <p>
          <strong>Edit as of 24/05/2026:</strong> The search will return a vast
          majority of birds, regardless of region they are located. However,
          this is a work in progress!
        </p>
      </div>
      <div>
        <h3>
          Head to the <Link to="/search">search</Link> page to search for birds,
          for example by region of sighting, features and colour.
        </h3>
      </div>
    </div>
  );
}

export default Home;
