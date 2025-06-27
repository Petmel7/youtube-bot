import { useState, useEffect } from "react";
import { fetchUsers } from "../services/userService";

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const usersData = await fetchUsers();
            if (usersData) {
                setUsers(usersData);
            }
        };
        getUsers();
    }, []);

    console.log("users", users);

    return (
        <>
            <div>Admin</div>
            <div>Кількість користувачів: {users.length}</div>
        </>
    )
}

export default Admin;