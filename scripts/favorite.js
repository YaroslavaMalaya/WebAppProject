function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavorites() {
    const defaultFavorites = []
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites !== null && storedFavorites !== "undefined") {
        try {
            return JSON.parse(storedFavorites);
        } catch (error) {
            console.error("Error parsing stored favorites:", error);
            saveFavorites(defaultFavorites);
            return defaultFavorites;
        }
    } else {
        saveFavorites(defaultFavorites);
        return defaultFavorites;
    }
}

export { saveFavorites, loadFavorites };