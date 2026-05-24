import { useState, useEffect } from "react";
import useEbirdApi from "../hooks/useEbirdApi";
import { Link } from "react-router-dom"

function Search() {
  const api = useEbirdApi();

  console.log("API hook result:", api);

  const { getBirdTaxonomy, getBirdsByRegion, loading, error } = api;

  const [search, setSearch] = useState("");
  const [birds, setBirds] = useState([]);
  const [region, setRegion] = useState("GB");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function loadBirds() {
      const taxonomy = await getBirdTaxonomy();
      const regionSpeciesCodes = await getBirdsByRegion(region);

      const regionalBirds = taxonomy.filter((bird) =>
        regionSpeciesCodes.includes(bird.speciesCode),
      );

      setBirds(regionalBirds);
    }

    loadBirds();
  }, [region]);

  function handleSubmit(e){
    e.preventDefault();

    const filteredBirds = birds.filter(
      (bird) =>
        bird.comName && bird.comName.toLowerCase().includes(search.toLowerCase()),
    );

    setResults(filteredBirds);
    setHasSearched(true);
  }

  return (
    <div id="search-master">
      <form onSubmit={handleSubmit}>
        <h1>Search Birds</h1>

        <input
          type="text"
          placeholder="Search bird name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="GB">United Kingdom</option>
          <option value="GB-ENG">England</option>
          <option value="GB-SCT">Scotland</option>
          <option value="GB-WLS">Wales</option>
          <option value="GB-NIR">Northern Ireland</option>
        </select>

        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}

      {hasSearched && results.length === 0 && (
        <p>No birds found matching your search.</p>
      )}

      <div>
        {results.slice(0, 20).map((bird) => (
          <div id="bird-item">
            <Link
              to={`/item/${bird.speciesCode}`}
              state={{ bird }}
              key={bird.speciesCode}
            >
              <div>
                <h3>{bird.comName}</h3>
                <p>{bird.sciName}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;