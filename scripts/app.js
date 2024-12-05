import { showLoader, handleError } from "./utils.js";

const genreSelect = document.getElementById("genre");
const sortSelect = document.getElementById("sort");
const movieList = document.getElementById("movie-list");

async function fetchMovies() {
    showLoader(true);
    try {
        const response = await fetch("data/movies.json");
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const movies = await response.json();
        renderMovies(movies);
    } catch (error) {
        handleError(error.message);
        movieList.innerHTML = `<p>Error loading movies: ${error.message}</p>`;
    } finally {
        showLoader(false);
    }
}

function renderMovies(data) {
    movieList.innerHTML = "";
    if (!data.length) {
        movieList.innerHTML = "<p>No movies found.</p>";
        return;
    }
    data.forEach((movie) => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
      <h3>${movie.title}</h3>
      <p>Genre: ${movie.genre}</p>
      <p>Rating: ${movie.rating}</p>
    `;
        movieList.appendChild(card);
    });
}

function filterAndSortMovies() {
    const genre = genreSelect.value;
    const sortBy = sortSelect.value;

    fetchMovies().then((movies) => {
        let filteredMovies = movies.filter(
            (movie) => genre === "all" || movie.genre === genre
        );
        if (sortBy === "rating") filteredMovies.sort((a, b) => b.rating - a.rating);
        else filteredMovies.sort((a, b) => a.title.localeCompare(b.title));

        renderMovies(filteredMovies);
    });
}

genreSelect.addEventListener("change", filterAndSortMovies);
sortSelect.addEventListener("change", filterAndSortMovies);

fetchMovies();
