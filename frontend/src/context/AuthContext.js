import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details", error);
                setError(error.response?.data?.message || "Authentication failed");
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const value = {
        user,
        loading,
        error,
        setUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};