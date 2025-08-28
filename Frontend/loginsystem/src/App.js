import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} email={email} onLogout={handleLogout} />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
      </Routes>
    </Router>
  );
}

export default App;
