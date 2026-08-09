import { useState } from "react";

function Home() {
  const [movie, setMovie] = useState("");

  const handleAdd = () => {
    console.log(movie);
    setMovie("");
  };

  return (
    <div>
      <h1>Welcome to StreamList</h1>

      <input
        type="text"
        placeholder="Enter a movie"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAdd}>Add Movie</button>
    </div>
  );
}

export default Home;