import { useState, useEffect } from "react";
import ConfirmationModal from "./delete_Confirmation";
import UpdateForm from "./updateForm"; // Import the UpdateForm component
import axios from "axios"; // Import Axios

const Library = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [initiateUpdate, setInitiateUpdate] = useState(false); // State to control update form visibility
  const [currentItem, setCurrentItem] = useState(null);
  const [blur, setBlur] = useState(false); // State to hold data of current item being updated

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

  // Axios interceptor to add user cookie to request headers
  axios.interceptors.request.use((config) => {
    const userCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (userCookie) {
      config.headers["Cookie"] = `user=${userCookie}`;
    }
    return config;
  });

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, [category]);

  const fetchData = () => {
    if (category !== "") {
      let end = category.toLowerCase();
      const api = `http://localhost:8080/${end}`;
      axios
        .get(api)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDelete = (_id) => {
    setSelectedItemId(_id);
    setShowModal(true);
  };

  const handleUpdate = (_id) => {
    const currentItem = data.find((item) => item._id === _id);
    setCurrentItem(currentItem); // Set current item data for update
    setInitiateUpdate(true); // Show update form
  };

  const handleConfirmDelete = () => {
    const deleteApi = `http://localhost:8080/${category.toLowerCase()}/${selectedItemId}`;
    axios
      .delete(deleteApi,  { withCredentials: true })
      .then(() => {
        setData((currentData) =>
          currentData.filter((book) => book._id !== selectedItemId)
        );
        setShowModal(false);
      })
      .catch((err) => {
        console.log("Delete Error:", err);
        setShowModal(false);
      });
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const handleButtonClick = (genre) => {
    setCategory(genre);
  };

  return (
    <div className="blurContainer">
      <div
        className="container1"
        style={{ filter: blur ? "blur(5px)" : "none" }}
      >
        {genre.map((genreItem, index) => (
          <button
            key={index}
            className="buttonStyle"
            onClick={() => {
              handleButtonClick(genreItem);
              setBlur(true);
            }}
          >
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
            <button
              className="delete-button"
              onClick={() => handleDelete(book._id)}
            >
              Delete
            </button>
            <button
              className="update-button"
              onClick={() => handleUpdate(book._id)}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {initiateUpdate && (
        <UpdateForm
          currentBook={currentItem} // Pass current item data for update
          setInitiateUpdate={setInitiateUpdate}
          fetchData={fetchData} // Pass fetchData function
        />
      )}
    </div>
  );
};

export default Library;
