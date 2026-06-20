import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { Link } from "react-router-dom";

function TotalOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders/today"
      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + order.totalPrice,
      0
    );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >

      {/* Sidebar */}

      <div
        style={{
          width: "250px",
          background: "#5e3c26",
          color: "white",
          padding: "30px",
        }}
      >

        <h1>
          ☕ Coffee Heaven
        </h1>

        <br />

        <Link
          to="/admin-orders"
          style={{
            display: "block",
            color: "white",
            textDecoration: "none",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        >
          📋 Orders
        </Link>

        <Link
          to="/add-item"
          style={{
            display: "block",
            color: "white",
            textDecoration: "none",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        >
          ➕ Add Items
        </Link>

        <Link
          to="/total-orders"
          style={{
            display: "block",
            color: "#ffd700",
            textDecoration: "none",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          📊 Total Orders
        </Link>

        <Link
          to="/"
          style={{
            display: "block",
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          🚪 Logout
        </Link>

      </div>

      {/* Main Content */}

      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >

        <h1>
          Today's Orders Dashboard
        </h1>

        <br />

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              width: "250px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.15)",
            }}
          >
            <h3>
              Total Orders
            </h3>

            <h1>
              {orders.length}
            </h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              width: "250px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.15)",
            }}
          >
            <h3>
              Revenue
            </h3>

            <h1>
              ₹{totalRevenue}
            </h1>
          </div>

        </div>

        <h2>
          Completed Orders
        </h2>

        <br />

        {orders.map((order) => (

          <div
            key={order._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "15px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.15)",
            }}
          >

            <h2>
              {order.customerName}
            </h2>

            <p>
              Phone :
              {order.phone}
            </p>

            <p>
              Table :
              {order.tableNumber}
            </p>

            <p>
              Payment :
              {order.paymentMethod}
            </p>

            <p>
              Total :
              ₹{order.totalPrice}
            </p>

            <p
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              Status :
              {order.status}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TotalOrders;

