import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
        "https://s59-personalized-literature.onrender.com/register",
        data
      );
      setResp(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign up</h3>
        <p>Become a part of our bibliophilic community</p>
        <div>
          <input
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
          {errors.fullname && <p>{errors.fullname.message}</p>}

          <input
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
          {errors.email && <p>{errors.email.message}</p>}

          <input
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
          {errors.password && <p>{errors.password.message}</p>}

          <div>
            <button>I already have an account</button>
            <button type="submit">Create Account</button>
          </div>
        </div>
      </form>

      {respText && <p>{respText.message}</p>}
    </>
  );
};

export default Register;
