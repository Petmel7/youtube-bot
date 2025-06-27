import { useState, useEffect } from "react";
import { fetchUserData } from "../services/userService";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const userData = await fetchUserData();
                if (userData) {
                    setUser({ ...userData }); // 🔹 Примусове оновлення стану
                }
            } catch (err) {
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    return { user, loading, error };
};

export default useUser;

