import { useState } from "react";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setMessage("Please enter a movie title.");
      return;
    }

    setMessage("");
    setMovies([]);

    try {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      searchTerm
    )}`
  );

  if (!response.ok) {
    throw new Error("Unable to retrieve movie information.");
  }

  const data = await response.json();

  if (data.results.length === 0) {
    setMessage("No movies found.");
  } else {
    setMovies(data.results);
  }
} catch (error) {
  console.error(error);
  setMessage("There was a problem connecting to TMDB.");
}
  };

  return (
    <div>
      <h1>Movie Search</h1>

      <p>Search for movie information using TMDB.</p>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a movie title"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {message && <p>{message}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h2>{movie.title}</h2>

            <p>
              Release Date: {movie.release_date || "Not available"}
            </p>

            <p>
              Rating: {movie.vote_average?.toFixed(1) || "Not available"}
            </p>

            <p>{movie.overview || "No overview available."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;