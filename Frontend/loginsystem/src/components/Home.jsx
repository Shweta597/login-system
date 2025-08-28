import { Link } from "react-router-dom";
import "./css/Home.css";

export default function Home({ loggedIn, email, onLogout }) {
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">Split Photo</div>
        <div className="nav-right">
          {!loggedIn ? (
            <Link to="/login" className="nav-link">Login</Link>
          ) : (
            <button onClick={onLogout} className="nav-link">Logout</button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="home-container">
        <h1 className="home-title">Welcome to Split Photo</h1>
        <p className="home-subtitle">
          {loggedIn ? `Logged in as ${email}` : "Login or Register to get started"}
        </p>

        <div className="home-actions">
          {loggedIn && (
            <Link to="/upload" className="primary-btn">Upload Photo</Link>
          )}
        </div>
      </div>
    </div>
  );
}
