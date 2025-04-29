
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import "./index.css";

function App() {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
            </Routes>
        </div>
    );
}

export default App;
