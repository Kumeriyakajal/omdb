const apiKeyInput = document.getElementById("api-key");
const movieTitleInput = document.getElementById("movie-title");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message");
const movieResults = document.getElementById("movie-results");

searchButton.addEventListener("click", searchMovies);

async function searchMovies() {
    const apiKey = apiKeyInput.value.trim();
    const movieTitle = movieTitleInput.value.trim();

    if (!apiKey || !movieTitle) {
        errorMessage.textContent = "Please enter both API Key and Movie Title.";
        return;
    }

    errorMessage.textContent = "";
    movieResults.innerHTML = "";
    loader.style.display = "block";

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "True") {
            for (const movie of data.Search) {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");

                const poster = movie.Poster === "N/A" ? "no-poster.png" : movie.Poster;
                const movieDetails = `
                    <img src="${poster}" alt="${movie.Title}" class="movie-poster">
                    <div class="movie-details">
                        <p class="movie-title">${movie.Title}</p>
                        <p class="movie-year">${movie.Year}</p>
                        <a href="https://www.imdb.com/title/${movie.imdbID}" class="imdb-link" target="_blank">More Details</a>
                    </div>
                `;

                movieCard.innerHTML = movieDetails;
                movieResults.appendChild(movieCard);
            }
        } else {
            errorMessage.textContent = data.Error || "An error occurred.";
        }
    } catch (error) {
        errorMessage.textContent = "An error occurred. Please try again.";
    } finally {
        loader.style.display = "none";
    }
}
