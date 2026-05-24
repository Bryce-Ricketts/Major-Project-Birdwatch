import { useState } from "react";

const API_KEY = import.meta.env.VITE_EBIRD_API_KEY;

export default function useEbirdApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getBirdTaxonomy() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json",
        {
          headers: {
            "X-eBirdApiToken": API_KEY,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch birds");
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function getBirdsByRegion(regionCode) {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(
            `https://api.ebird.org/v2/product/spplist/${regionCode}`,
            {
                headers: {
                    "X-eBirdApiToken": API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch birds from this region.");
        }

        return await response.json();
    } catch (err) {
        setError(err.message);
        return [];
    } finally {
        setLoading(false);
    }
  }

  return {
    getBirdTaxonomy,
    getBirdsByRegion,
    loading,
    error,
  };
}

