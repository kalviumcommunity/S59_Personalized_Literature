import React from "react";
import { AuthContext } from "../providers/auth";


export const useAuth = () => {
    const auth = React.useContext(AuthContext);

    if (!auth) {
        console.log("useAuth must be used within an AuthProvider");
        return null;
    }

    return auth;
};
