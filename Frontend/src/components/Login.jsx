import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Register from "./Register";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resp, setResp] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const authUser = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/login", data);
      if (response.status === 200) {
        console.log("Login Successful");
        setResp(response.data);
        setLoggedIn(true);
        document.cookie = `user=${response.data.Name}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/;`;
      } else {
        console.log("Login Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/logout");
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
    <>
      {showLogin && (
        <form onSubmit={handleSubmit(doSubmit)}>
          <h3>Log In!</h3>
          <p>Share Knowledge, Recommend Books.</p>
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", {
                required: "Please enter the mail",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Please enter the password",
                minLength: {
                  value: 10,
                  message: "The password should be at least 10 characters long",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          {!loggedIn && (
            <div>
              <button type="submit">Log In</button>
            </div>
          )}
        </form>
      )}
      {loggedIn && (
        <div>
          <button onClick={logout}>Log Out</button>
        </div>
      )}

      <p>
        Don't have an account?{" "}
        <span
          onClick={() => {
            setShowRegister(!showRegister);
            setShowLogin(false);
          }}
        >
          Click here
        </span>
      </p>
      {showRegister && <Register />}
    </>
  );
};

export default Login;
