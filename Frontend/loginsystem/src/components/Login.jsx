// Login.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/Login.css";

export default function Login({ setLoggedIn, setEmail }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // input handler
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // form submit
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Login successful!");
        setLoggedIn(true);
        setEmail(form.email);
        navigate("/"); // redirect home
      } else {
        setMsg(`❌ ${data.error || "Invalid credentials"}`);
      }
    } catch (err) {
      setMsg("❌ Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={submit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
          className="input-field"
        />

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {msg && (
        <p className={`message ${msg.startsWith("✅") ? "success" : "error"}`}>
          {msg}
        </p>
      )}

      {/* Link to Register */}
      <p className="register-link">
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}
