import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CustomerLogin() {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    table: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = () => {

    if (
      !customer.name ||
      !customer.phone ||
      !customer.table
    ) {

      setError(
        "Please fill all required fields"
      );

      return;
    }

    localStorage.setItem(
      "customer",
      JSON.stringify(customer)
    );

    navigate("/home");
  };

  return (
    <div className="login-page">

      <div className="login-overlay">

        <div className="login-box">

          <h1>☕ Coffee Heaven</h1>

          <p>Customer Login</p>

          {error && (
            <div
              style={{
                background: "#ffebee",
                color: "#d32f2f",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={customer.name}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={customer.email}
            onChange={handleChange}
          />

          <select
            name="table"
            value={customer.table}
            onChange={handleChange}
          >
            <option value="">
              Select Table
            </option>

            <option value="Table 1">
              Table 1
            </option>

            <option value="Table 2">
              Table 2
            </option>

            <option value="Table 3">
              Table 3
            </option>

            <option value="Table 4">
              Table 4
            </option>

            <option value="Table 5">
              Table 5
            </option>
          </select>

          <button
            onClick={handleSubmit}
          >
            Continue to Menu
          </button>

          <Link
            to="/"
            className="back-link"
          >
            ← Back
          </Link>

        </div>

      </div>

    </div>
  );
}

export default CustomerLogin;