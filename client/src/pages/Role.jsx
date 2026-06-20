import React from "react";
import { Link } from "react-router-dom";

function Role() {
  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-box">

          <h1>☕ Coffee Heaven</h1>

          <p>
            Fresh Coffee, Foods & Desserts
          </p>

          <div className="role-buttons">

            <Link
              to="/admin-login"
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <button>
                Admin
              </button>
            </Link>

            <Link
              to="/customer-login"
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <button>
                Customer
              </button>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Role;