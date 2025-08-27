import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        // navigate("/"); // redirect to home
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
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={onChange} required />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {msg && <p className={`message ${msg.startsWith("✅") ? "success" : "error"}`}>{msg}</p>}
    </div>
  );
}
