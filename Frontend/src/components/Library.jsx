import "./Library.css";
import { useEffect, useState } from "react";

const Library = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const genre = [
    "biopic_books",
    "classics_books",
    "entrepreneurship_books",
    "fantasy_books",
    "finance_books",
    "history_books",
    "romance_books",
    "science_books",
    "science_fiction_books",
    "self_help_books",
  ];

  useEffect(() => {
    if (category !== "") {
      let end = category.toLowerCase();

      const api = `https://s59-personalized-literature.onrender.com/${end}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category]);

  const handleButtonClick = (genre) => {
    setCategory(genre);
  };

  return (
    <div>
      <div>
        {genre.map((genreItem, index) => (
          <button key={index} onClick={() => handleButtonClick(genreItem)}>
            {genreItem
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </button>
        ))}
      </div>
      <div className="books-container">
        {data.map((book, index) => (
          <div className="book" key={index}>
            <img src={book.url} alt={book.bookName} />
            <h3>{book.bookName}</h3>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
