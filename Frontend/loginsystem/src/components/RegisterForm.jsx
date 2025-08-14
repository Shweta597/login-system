import { useState } from "react";
import "./RegisterForm.css";

export default function RegisterForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
  
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
  
      const data = await res.json();
  
      if (res.status === 201) {
        setMsg(`Registered: ${data.firstName} ${data.lastName}`);
        setForm({ firstName: "", lastName: "", email: "", password: "" });
      } 
      else if (res.status === 409) {
        setMsg(`${data.message}. Please login.`);
      } 
      else {
        setMsg(`❌ ${data.error || "Registration failed"}`);
      }
    } catch (err) {
      setMsg("❌ Network error");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      <form onSubmit={submit} className="register-form">
        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" value={form.firstName} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" value={form.lastName} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label>Password (min 8)</label>
          <input type="password" name="password" value={form.password} onChange={onChange} minLength={8} required />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {msg && <p className="message">{msg}</p>}
    </div>
  );
}
