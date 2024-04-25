import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";

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


const UpdateForm = ({ currentBook, setInitiateUpdate, fetchData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bookName: currentBook.bookName || "",
      url: currentBook.url || "",

      genre: currentBook.genre ? currentBook.genre.toLowerCase() : "",

      publishedYear: currentBook.publishedYear || "",
      author: currentBook.author || "",
    },
  });

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
      const meme_id = currentBook._id;
      const mood_category = currentBook.genre;
      console.log(mood_category);

      const filteredData = Object.fromEntries(
        Object.entries(data)
          .filter(([key, value]) => value !== "")
          .map(([key, value]) => [key, value])
      );

      console.log(filteredData);
       const tokenCookie = document.cookie
         .split(";")
         .find((cookie) => cookie.trim().startsWith("token="));
       const token = tokenCookie?.split("=")[1];

      const response = await axios.patch(
        `http://localhost:8080/${mood_category}/${meme_id}`,
        filteredData,
        { withCredentials: true,
        headers : {
          Authorization : `${token}`,
        },
      }
      );

      console.log(response.data);
      setInitiateUpdate(false);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container3">
      <h1>Update {currentBook.bookName}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="bookName">Updated Name:</label>

          <input type="text" className="inputField" {...register("bookName", { required: true })} />

          {errors.bookName && (
            <p className="errorMessage">This field is required</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="url">Updated URL:</label>


          <input type="text" className="inputField" {...register("url", { required: true })} />

          {errors.url && <p className="errorMessage">This field is required</p>}
        </div>

        <div className="field">
          <label htmlFor="genre">Updated Genre:</label>
          <select
            className="userInput"
            {...register("genre", { required: true })}

            defaultValue={currentBook.genre}

          >
            <option value="">Select a Genre</option>
            {genreOptions.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="errorMessage">Please select a genre</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="publishedYear">Updated Published Year:</label>
          <input
            type="number"
            className="inputField"
            {...register("publishedYear", { required: true })}
          />
          {errors.publishedYear && (
            <p className="errorMessage">This field is required</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="author">Updated Author:</label>

          <input type="text" className="inputField" {...register("author", { required: true })} />

          {errors.author && (
            <p className="errorMessage">This field is required</p>
          )}
        </div>

        <div className="flex">

          <button  className="cancelButton"onClick={() => setInitiateUpdate(false)}>Cancel</button>
          <button type="submit" className="submitButton">Submit</button>

        </div>
      </form>
    </div>
  );
};

UpdateForm.propTypes = {
  currentBook: PropTypes.object.isRequired,
  setInitiateUpdate: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default UpdateForm;
