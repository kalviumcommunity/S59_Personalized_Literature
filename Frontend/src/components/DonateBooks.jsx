import { useForm } from "react-hook-form";
import axios from "axios";
import "./DonateBook.css";

const GenreForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const genreOptions = [
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

  const onSubmit = async (data) => {
    try {
           const tokenCookie = document.cookie
             .split(";")
             .find((cookie) => cookie.trim().startsWith("token="));
           const token = tokenCookie?.split("=")[1];
       

      const response = await axios.post(
        `http://localhost:8080/postBook/${data.genre}`,
        data,{
          headers : {
            Authorization : `${token}` ,
          },
         withCredentials: true, }

      );
      console.log(data.genre);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="container1 donateformContainer">
      <h1>Add a Book</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <strong>Book Name</strong> <br />
          <input
            type="text"
            className="userInput"
            {...register("bookName", { required: true })}
          />
          {errors.bookName && <p className="error">Book Name is required</p>}
        </div>

        <div className="field">
          <strong>Image URL</strong> <br />
          <input
            type="text"
            className="userInput"
            {...register("url", { required: true })}
          />
          {errors.url && <p className="error">Image URL is required</p>}
        </div>

        <div className="field">
          <strong>Genre</strong> <br />
          <select
            className="userInput"
            {...register("genre", { required: true })}
          >
            <option value="">Select a Genre</option>
            {genreOptions.map((genre, index) => (
              <option key={index} value={genre}>
                {genre
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
          {errors.genre && <p className="error">Please select a genre</p>}
        </div>

        <div className="field">
          <strong>Published Year</strong> <br />
          <input
            type="number"
            className="userInput"
            {...register("publishedYear", { required: true })}
          />
          {errors.publishedYear && (
            <p className="error">Published Year is required</p>
          )}
        </div>

        <div className="field">
          <strong>Author Name</strong> <br />
          <input
            type="text"
            className="userInput"
            {...register("author", { required: true })}
          />
          {errors.author && <p className="error">Author Name is required</p>}
        </div>

        <button className="bookDonation" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GenreForm;
