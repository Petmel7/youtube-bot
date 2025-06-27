import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthStatus } from "../services/authService";

export const useAuthStatus = (redirectIfAuth = null, redirectIfNotAuth = null) => {
    const [isConnected, setIsConnected] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const data = await fetchAuthStatus();
                setIsConnected(data.connected);

                if (data.connected && redirectIfAuth) {
                    navigate(redirectIfAuth);
                } else if (!data.connected && redirectIfNotAuth) {
                    navigate(redirectIfNotAuth);
                }
            } catch (error) {
                console.error("❌ Auth status check failed:", error);
                setIsConnected(false);
            }
        };

        checkAuthStatus();
    }, [navigate, redirectIfAuth, redirectIfNotAuth]);

    return isConnected;
};

