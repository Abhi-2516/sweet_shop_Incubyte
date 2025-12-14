import { useState } from "react";
import axios from "axios";

export default function Register({ switchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const register = async () => {
    try {
      await axios.post("/api/auth/register", {
        email,
        password,
        role
      });
      alert("Registration successful");
      switchPage("login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Create Account</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ROLE SELECTION */}
        <div style={{ margin: "10px 0" }}>
          <label>
            <input
              type="radio"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />{" "}
            Customer
          </label>
          <br />
          <label>
            <input
              type="radio"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />{" "}
            Admin
          </label>
        </div>

        <button className="button" onClick={register}>
          Register
        </button>

        <div className="link" onClick={() => switchPage("login")}>
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}
