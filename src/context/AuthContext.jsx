import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import Cookies from "js-cookie";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        if (!user) {
            const token = Cookies.get('token')
            getUser(token)
        }
    }, [user])

    const getUser = () => {
        axios
            .get(AppRoutes.getinfo, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            .then((res) => {
                setUser(res?.data?.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;