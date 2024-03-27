import  { useState, useEffect } from "react";
import ConfirmationModal from "./delete_Confirmation";
import UpdateForm from "./updateForm"; // Import the UpdateForm component

const Library = () => {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [initiateUpdate, setInitiateUpdate] = useState(false); // State to control update form visibility
  const [currentItem, setCurrentItem] = useState(null); // State to hold data of current item being updated

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
    fetchData(); // Fetch initial data
  }, [category]);

  const fetchData = () => {
    if (category !== "") {
      let end = category.toLowerCase();
      const api = `https://s59-personalized-literature.onrender.com/${end}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
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
    console.log(currentItem) ;
    setCurrentItem(currentItem); // Set current item data for update
    setInitiateUpdate(true); // Show update form
  };

  const handleConfirmDelete = () => {
    const deleteApi = `https://s59-personalized-literature.onrender.com/${category.toLowerCase()}/${selectedItemId}`;
    fetch(deleteApi, { method: "DELETE" })
      .then((res) => res.json())
      .then((deletedData) => {
        console.log("Book deleted:", deletedData);
        setData(data.filter((book) => book._id !== selectedItemId));
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
            <button onClick={() => handleDelete(book._id)}>Delete</button>
            <button onClick={() => handleUpdate(book._id)}>Update</button>
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
          currentMeme={currentItem} // Pass current item data for update
          setInitiateUpdate={setInitiateUpdate}
          fetchData={fetchData} // Pass fetchData function
        />
      )}
    </div>
  );
};

export default Library;
