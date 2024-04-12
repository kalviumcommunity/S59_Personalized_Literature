import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resp, setResp] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const authUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/login", data, { withCredentials: true });
      if (response.status === 200) {
        console.log("Login Successful");
        setResp(response.data);
        setLoggedIn(true);

        
        document.cookie = `user=${response.data.Name}; path=/;`;
      } else {
        console.log("Login Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/logout" , null, {withCredentials : true});
      if (response.status === 200) {
        console.log("Logout Successful");
        setResp(null);
        setLoggedIn(false);
      
        document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      } else {
        console.log("Logout failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const doSubmit = async (data) => {
    try {
      await authUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="loginformContainer">
        {!loggedIn && (
          <form onSubmit={handleSubmit(doSubmit)} className="loginForm">
            <h3>Log In!</h3>
            <p>Share Knowledge, Recommend Books.</p>
            <div className="loginInput">
              <input
                type="email"
                className="inputField"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Please enter the mail",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
              />
              {errors.email && (
                <p className="errorMessage">{errors.email.message}</p>
              )}

              <input
                type="password"
                className="inputField"
                placeholder="Enter password"
                {...register("password", {
                  required: "Please enter the password",
                  minLength: {
                    value: 10,
                    message:
                      "The password should be at least 10 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="errorMessage">{errors.password.message}</p>
              )}
            </div>
            {!loggedIn && (
              <div>
                <button type="submit" className="loginButton">
                  Log In
                </button>
              </div>
            )}
          </form>
        )}
        {loggedIn && (
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        )}

        <p>Don't have an account? </p>

        <Link to={"/register"} className="registerLink">
          <button className="registerButton">Sign up</button>
        </Link>
      </section>
    </div>
  );
};

export default Login;
