import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [respText, setResp] = useState(null);

  const onSubmit = async (data) => {
    try {

      const response = await axios.post(
        "http://localhost:8080/register",
        data,
        { withCredentials: true }
      );

      setResp(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="loginformContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
        <h3>Sign up</h3>
        <p>Become a part of our bibliophilic community</p>
        <div className="loginInput">
          <input
            className="inputField"
            type="text"
            placeholder="Enter Your First Name"
            {...register("fullname", {
              required: "Please enter your full name",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long",
              },
              maxLength: {
                value: 30,
                message: "Name should not exceed 30 characters",
              },
            })}
          />
          {errors.fullname && (
            <p className="errorMessage">{errors.fullname.message}</p>
          )}

          <input
            className="inputField"
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="errorMessage">{errors.email.message}</p>
          )}

          <input
            className="inputField"
            type="password"
            placeholder="Set up a password"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 10,
                message: "Password should be at least 10 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="errorMessage">{errors.password.message}</p>
          )}

          <div className="buttonContainer">
            <Link to={"/login"}>

            <button className="buttonStyle">I already have an account</button>

            </Link>
            <button className="buttonStyle" type="submit">
              Create Account
            </button>
          </div>
        </div>
      </form>

      {respText && <p>{respText.message}</p>}
    </section>
  );
};

export default Register;
