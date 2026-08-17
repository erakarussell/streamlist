import { useState } from "react";
import {
  FaCheck,
  FaEdit,
  FaTrash,
  FaSave,
  FaUndo,
} from "react-icons/fa";

function Home() {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    if (movie.trim() !== "") {
      setMovies([
        ...movies,
        {
          title: movie.trim(),
          completed: false,
        },
      ]);

      setMovie("");
    }
  };

  const handleComplete = (index) => {
    const updatedMovies = movies.map((item, movieIndex) =>
      movieIndex === index
        ? { ...item, completed: !item.completed }
        : item
    );

    setMovies(updatedMovies);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditText(movies[index].title);
  };

  const handleSave = (index) => {
    if (editText.trim() !== "") {
      const updatedMovies = movies.map((item, movieIndex) =>
        movieIndex === index
          ? { ...item, title: editText.trim() }
          : item
      );

      setMovies(updatedMovies);
      setEditingIndex(null);
      setEditText("");
    }
  };

  const handleDelete = (index) => {
    const updatedMovies = movies.filter(
      (_, movieIndex) => movieIndex !== index
    );

    setMovies(updatedMovies);
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

      <br />
      <br />

      <button onClick={handleAdd}>Add Movie</button>

      <ul>
        {movies.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => handleSave(index)}>
                  <FaSave /> Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: item.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.title}
                </span>

                <button onClick={() => handleComplete(index)}>
                  {item.completed ? (
                    <>
                      <FaUndo /> Undo
                    </>
                  ) : (
                    <>
                      <FaCheck /> Complete
                    </>
                  )}
                </button>

                <button onClick={() => handleEdit(index)}>
                  <FaEdit /> Edit
                </button>

                <button onClick={() => handleDelete(index)}>
                  <FaTrash /> Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;