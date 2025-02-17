import React from "react";
import config from "../config/config";

const Home = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>YouTube Comment Bot</h1>
            <p>Automatically reply to comments on your YouTube channel.</p>
            <a href={`${config.backendUrl}/auth/google`}>
                <button style={{ padding: "10px 20px", fontSize: "16px" }}>Connect YouTube</button>
            </a>
        </div>
    );
};

export default Home;
