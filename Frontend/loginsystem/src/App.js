import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadPage from "./components/UploadPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  // ✅ Load state from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (token) {
      setLoggedIn(true);
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    // ✅ Clear from both state + localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setLoggedIn(false);
    setEmail("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home loggedIn={loggedIn} email={email} onLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
        />
        <Route
          path="/register"
          element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />}
        />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
