import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resp, setResp] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  function getExpirationDate(days) {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return now.toUTCString();
  }

  const authUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/userRoutes/login", data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        if (response.data && response.data.token) {
          const token = response.data.token;
          console.log("Login Successful");
          document.cookie = `token=${token}; expires=${getExpirationDate(1)}`;

          setResp(response.data);
          setLoggedIn(true);

        
          setTimeout(() => {
            navigate("/"); 
          }, 1000);
        } else {
          console.log("Token not found in response data");
        }
      } else {
        console.log("Login Failed");

        if (response.status === 401) {
          console.log("Unauthorized access. Please check your credentials.");
        } else if (response.status === 403) {
          console.log(
            "Access forbidden. You do not have permission to access this resource."
          );
        } else {
          console.log("Unexpected response status:", response.status);
        }
      }
    } catch (err) {
      console.log("Error during login:", err.message);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/userRoutes/logout", null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Logout Successful");
        setResp(null);
        setLoggedIn(false);

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
