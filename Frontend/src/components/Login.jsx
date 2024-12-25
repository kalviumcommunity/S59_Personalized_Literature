import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../hooks/use-auth";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const auth = useAuth();

    const { isLoggedIn, login } = auth;

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    if (!auth) {
        console.log("useAuth must be used within an AuthProvider");
        return null;
    }

    if (isLoggedIn) {
        return null;
    }

    return (
        <div>
            <section className="loginformContainer">
                <form onSubmit={handleSubmit(login)} className="loginForm">
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
                        {errors.email && <p className="errorMessage">{errors.email.message}</p>}

                        <input
                            type="password"
                            className="inputField"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Please enter the password",
                                minLength: {
                                    value: 10,
                                    message: "The password should be at least 10 characters long",
                                },
                            })}
                        />
                        {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                    </div>
                    {!isLoggedIn && (
                        <div>
                            <button type="submit" className="loginButton">
                                Log In
                            </button>
                        </div>
                    )}
                </form>

                <p>Don&apos;t have an account? </p>

                <Link to={"/register"} className="registerLink">
                    <button className="registerButton">Sign up</button>
                </Link>
            </section>
        </div>
    );
};

export default Login;
