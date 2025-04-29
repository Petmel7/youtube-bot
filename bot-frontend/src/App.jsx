
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';
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
            <footer style={{ textAlign: 'center', margin: 20 }}>
                <Link to="/privacy-policy">Privacy Policy</Link> |{' '}
                <Link to="/terms">Terms of Service</Link>
            </footer>
        </div>
    );
}

export default App;
