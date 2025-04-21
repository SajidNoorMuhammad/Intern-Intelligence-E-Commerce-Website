import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // 👈 loading state

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            getUser(token);
        } else {
            setLoading(false); // No token, not logged in
        }
    }, []);

    const getUser = (token) => {
        axios
            .get(AppRoutes.getinfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res?.data?.data);
            })
            .catch((err) => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false); // Done loading whether success or fail
            });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
