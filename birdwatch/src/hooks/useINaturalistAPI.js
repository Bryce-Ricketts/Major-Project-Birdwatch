import { useState } from "react";

export default function useINaturalistApi() {
    const [loadingImage, setLoadingImage] = useState(false);
    const [imageError, setImageError] = useState(null);

    async function getBirdImage(scientificName) {
        setLoadingImage(true);
        setImageError(null);

        try {
            const response = await fetch(
                `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientificName)}&rank=species`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch bird image");
            }

            const data = await response.json();
            return data.results?.[0]?.default_photo?.medium_url || null;
        } catch (err) {
            setImageError(err.message);
            return null;
        } finally {
            setLoadingImage(false);
        }
    }

    return {
        getBirdImage,
        loadingImage,
        imageError,
    };
}