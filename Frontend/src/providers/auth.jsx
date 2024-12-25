import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios";
import PropTypes from "prop-types";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const navigate = useNavigate();

    async function login(data) {
        try {
            const response = await axiosInstance.post("/userRoutes/login", data);

            switch (response.status) {
                case 200:
                    if (!(response.data && response.data.token)) {
                        throw new Error("Token not found in response data");
                    }

                    setIsLoggedIn(true);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);

                    break;
                case 401:
                    throw new Error("Unauthorized access. Please check your credentials.");
                case 403:
                    throw new Error("Access forbidden. You do not have permission to access this resource.");
                default:
                    console.log("Unexpected response status:", response.status);
            }
        } catch (err) {
            console.log("Error during login:", err);
        }
    }

    async function logout() {
        try {
            const response = await axiosInstance.post("/userRoutes/logout");

            switch (response.status) {
                case 200:
                    setIsLoggedIn(false);
                    break;
                default:
                    throw new Error("Unexpected response status:", response.status);
            }
        } catch (err) {
            console.log("Error during logout", err);
        }
    }

    async function isLoggedInOnSiteLoad() {
        try {
            const response = await axiosInstance.post("/userRoutes/validate-token");

            switch (response.status) {
                case 200:
                    setIsLoggedIn(true);
                    navigate("/");
                    break;
                default:
                    throw new Error("Unexpected response status:", response.status);
            }
        } catch (err) {
            console.log("Error during token validation", err);
        }
    }

    useEffect(() => {
        isLoggedInOnSiteLoad();
    }, []);

    AuthProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
