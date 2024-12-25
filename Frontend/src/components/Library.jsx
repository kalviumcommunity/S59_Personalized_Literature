
import { useState, useEffect } from "react";
import ConfirmationModal from "./delete_Confirmation";
import UpdateForm from "./updateForm";
import axios from "axios";

const Library = () => {
  const [filterStatus, setFilterStatus] = useState(false);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [initiateUpdate, setInitiateUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [blur, setBlur] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState();

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
    fetchData();
  }, [category, selectedUser]);

  const fetchData = () => {
    if (category !== "") {
      let end = category.toLowerCase();
      let apiUrl = `http://localhost:8080/bookRoutes/${end}`;
      axios
        .get(apiUrl)
        .then((res) => {
          let filteredData = res.data;
          if (selectedUser) {
            filteredData = filteredData.filter(
              (book) => book.postedBy === selectedUser
            );
          }
          setUsers(filteredData);
          setData(filteredData);
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
    setCurrentItem(currentItem);
    setInitiateUpdate(true);
  };

  const handleConfirmDelete = () => {
    const tokenCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    const token = tokenCookie?.split("=")[1];

    const deleteApi = `http://localhost:8080/bookRoutes/${category.toLowerCase()}/${selectedItemId}`;
    axios
      .delete(deleteApi, {
        withCredentials: true,
        headers: {
          Authorization: `${token}`,
        },
      })
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
    setFilterStatus((prev) => !prev);
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
        {filterStatus && (
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">All Users</option>

            {[...new Set(data.map((book) => book.postedBy))].map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        )}
        {data.map((book, index) => (
          <div className="book" key={index}>
            <img src={book.url} alt={book.bookName} />
            <h3>{book.bookName}</h3>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
            <p>Posted By : {book.postedBy} </p>
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
          currentBook={currentItem}
          setInitiateUpdate={setInitiateUpdate}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default Library;
