import { useState } from "react";
import axios from "axios";

export default function Login({ switchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const login = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
        role
      });

      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Login</h2>

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
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />{" "}
            Customer
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />{" "}
            Admin
          </label>
        </div>

        <button className="button" onClick={login}>
          Login
        </button>

        <div className="link" onClick={() => switchPage("register")}>
          Create new account
        </div>
      </div>
    </div>
  );
}
