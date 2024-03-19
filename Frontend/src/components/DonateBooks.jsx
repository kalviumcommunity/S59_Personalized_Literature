
import { useForm } from "react-hook-form";
import axios from "axios";

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
      const response = await axios.post(
        "https://s59-personalized-literature.onrender.com/postBook/:genre",
        { genre: data.genreOptions }
      );
      console.log(response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="container">
      <h1>Add a Book</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="bookName">Book Name</label>
          <input type="text" {...register("bookName", { required: true })} />
          {errors.bookName && <p className="error">Book Name is required</p>}
        </div>
        <div className="field">
          <label htmlFor="publishedYear">Published Year</label>
          <input
            type="number"
            {...register("publishedYear", { required: true })}
          />
          {errors.publishedYear && (
            <p className="error">Published Year is required</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="authorName">Author Name</label>
          <input type="text" {...register("authorName", { required: true })} />
          {errors.authorName && (
            <p className="error">Author Name is required</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="url">Image URL</label>
          <input type="text" {...register("url", { required: true })} />
          {errors.url && <p className="error">Image URL is required</p>}
        </div>
        <div className="field">
          <label htmlFor="genre">Genre</label>
          <select {...register("genre", { required: true })}>
            <option value="">Select a Genre</option>
            {genreOptions.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <p className="error">Please select a genre</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GenreForm;
