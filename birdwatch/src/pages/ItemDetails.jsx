import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import useINaturalistApi from "../hooks/useINaturalistAPI";

function ItemDetails() {
  const { speciesCode } = useParams();
  const location = useLocation();
  const { getBirdImage, loadingImage, imageError } = useINaturalistApi();

  const bird = location.state?.bird;

  async function addToFavourites() {
    if (!bird) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in before adding a sighting.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/sightings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bird),
    });

    if (!response.ok) {
      alert("Could not add bird to sightings.");
      return;
    }

    alert(`${bird.comName} added to Sightings`);
  }

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function loadBirdImage() {
      if (!bird?.sciName) return;

      const image = await getBirdImage(bird.sciName);

      setImageUrl(image);
    }

    loadBirdImage();
  }, [bird]);
 
  if (!bird) {
    return (
    <div>
      <h1>Bird Details</h1>

      <p>Species Code: {speciesCode}</p>
    </div>
    );
  }

  return (
    <div id="selected-bird-div">
      <div id="selected-bird">
        <h1>{bird.comName}</h1>

        {loadingImage && <p>Loading image...</p>}
        {imageError && <p>{imageError}</p>}

        {imageUrl && (
          <img src={imageUrl} alt={bird.sciName} id="bird-image"/>
        )}

        <p>
          <strong>Scientific name:</strong> {bird.sciName}
        </p>

        <p>
          <strong>Family:</strong> {bird.familyComName}
        </p>

        <p>
          <strong>Family scientific name</strong> {bird.familySciName}
        </p>

        <p>
          <strong>Order:</strong> {bird.order}
        </p>

        <button onClick={addToFavourites}>I've seen this bird!</button>
      </div>
    </div>
  );
}


export default ItemDetails;
