import { useEffect, useState } from "react";
import useINaturalistApi from "../hooks/useINaturalistAPI";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [images, setImages] = useState({});

  const { getBirdImage } = useINaturalistApi();

  useEffect(() => {
    async function loadFavourites() {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/sightings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Sightings response:", response.status, data);

      if (!response.ok) {
        setFavourites([]);
        return;
      }

      setFavourites(data);

      const imageResults = {};

      for (const bird of data) {
        if (bird.scientific_name) {
          imageResults[bird.id] = await getBirdImage(bird.scientific_name);
        }
      }

      setImages(imageResults);
    }

    loadFavourites();
  }, []);

  async function updateLog(id, newLog) {
    const token = localStorage.getItem("token");

    const updatedFavourites = favourites.map((bird) =>
      bird.id === id ? { ...bird, log: newLog } : bird,
    );

    setFavourites(updatedFavourites);

    await fetch(`http://localhost:5000/api/sightings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ log: newLog }),
    });
  }

  async function removeSighting(id) {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/sightings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setFavourites((prev) => prev.filter((bird) => bird.id !== id));
  }

  return (
    <div id="favourite-master">
      <h1>Sightings</h1>

      {favourites.length === 0 && (
        <p>
          No birds have been added to your recent sightings. Go to Search, enter
          the name of the bird and click "I've seen this bird!" to add this to
          your Sightings.
        </p>
      )}

      {favourites.map((bird) => (
        <div key={bird.id} id="favourite-bird">
          <h2>{bird.common_name}</h2>

          {images[bird.id] && (
            <img src={images[bird.id]} alt={bird.common_name} id="bird-image" />
          )}

          <p>{bird.scientific_name}</p>
          <p>{bird.family_common_name}</p>

          <textarea
            placeholder="Details of sighting e.g. Seen in London in the garden, count 3..."
            value={bird.log || ""}
            onChange={(e) => updateLog(bird.id, e.target.value)}
          />
          <br/>
          <button onClick={() => removeSighting(bird.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Favourites;
