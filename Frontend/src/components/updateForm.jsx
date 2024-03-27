import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdateForm = ({ currentMeme, setInitiateUpdate, fetchData }) => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bookName: currentMeme.bookName || "",
      url: currentMeme.url || "",
      genre: currentMeme.genre ? currentMeme.genre.toLowerCase() : "", // Set default genre based on currentMeme
      publishedYear: currentMeme.publishedYear || "",
      author: currentMeme.author || "",
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
      const meme_id = currentMeme._id;
      const mood_category = currentMeme.genre;
      console.log(mood_category);

      const filteredData = Object.fromEntries(
        Object.entries(data)
          .filter(([key, value]) => value !== "")
          .map(([key, value]) => [key, value])
      );

      console.log(filteredData);
      const response = await axios.patch(
        `https://s59-personalized-literature.onrender.com/${mood_category}/${meme_id}`,
        filteredData
      );

      console.log(response.data);
      setInitiateUpdate(false);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Update {currentMeme.bookName}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="bookName">Updated Name:</label>
          <input type="text" {...register("bookName", { required: true })} />
          {errors.bookName && <p className="error">This field is required</p>}
        </div>

        <div className="field">
          <label htmlFor="url">Updated URL:</label>
          <input type="text" {...register("url", { required: true })} />
          {errors.url && <p className="error">This field is required</p>}
        </div>

        <div className="field">
          <label htmlFor="genre">Updated Genre:</label>
          <select
            className="userInput"
            {...register("genre", { required: true })}
            defaultValue={
              // currentMeme.genre ? currentMeme.genre.toLowerCase() : ""
              currentMeme.genre
            }
          >
            <option value="">Select a Genre</option>
            {genreOptions.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <p className="error">Please select a genre</p>}
        </div>

        <div className="field">
          <label htmlFor="publishedYear">Updated Published Year:</label>
          <input
            type="number"
            {...register("publishedYear", { required: true })}
          />
          {errors.publishedYear && (
            <p className="error">This field is required</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="author">Updated Author:</label>
          <input type="text" {...register("author", { required: true })} />
          {errors.author && <p className="error">This field is required</p>}
        </div>

        <div className="flex">
          <button onClick={() => setInitiateUpdate(false)}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

UpdateForm.propTypes = {
  currentMeme: PropTypes.object.isRequired,
  setInitiateUpdate: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default UpdateForm;
