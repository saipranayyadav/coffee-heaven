import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin-orders");

    } else {

      alert("Invalid Username or Password");

    }
  };

  return (
    <div className="login-page">

      <div className="login-overlay">

        <div className="login-box">

          <h1>☕ Coffee Heaven</h1>

          <p>Admin Login</p>

          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;