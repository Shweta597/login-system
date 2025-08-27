// App.js
import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoggedIn(false);
  };

  return (
    <Router>
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <h2>Login System</h2>
        <div>
          {!loggedIn ? (
            <>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/register"><button>Signup</button></Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
      </Routes>
    </Router>
  );
}

export default App;
