
import config from "../config/config";

export const fetchAuthStatus = async () => {
    try {
        const res = await fetch(`${config.backendUrl}/auth/status`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("❌ Fetch auth status error:", error);
        return { connected: false };
    }
};

export const fetchLogout = async () => {
    try {
        const res = await fetch(`${config.backendUrl}/auth/logout`, {
            method: "GET",
            credentials: "include",
        });

        console.log("res", res);
        return res;
    } catch (error) {
        console.error("❌ Error during logout:", error);
    }
};
