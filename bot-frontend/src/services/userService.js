import config from "../config/config";

export const fetchUsers = async () => {
    try {
        const res = await fetch(`${config.backendUrl}/user/users`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("data", data);
        return data.users || [];
    } catch (error) {
        console.error("❌ Error fetching users data:", error);
        return null;
    }
};

export const fetchUserData = async () => {
    try {
        const res = await fetch(`${config.backendUrl}/user/user`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data.user;
    } catch (error) {
        console.error("❌ Error fetching user data:", error);
        return null;
    }
};

export const fetchUserRole = async () => {
    try {
        const res = await fetch(`${config.backendUrl}/user/user-role`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data.user;
    } catch (error) {
        console.error("❌ Error fetching user data:", error);
        return null;
    }
};
