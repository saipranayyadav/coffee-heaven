import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { Link } from "react-router-dom";

function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders/active"
      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/orders/status/${id}`,
        { status }
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

    }
  };

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
            color: "#ffd700",
            textDecoration: "none",
            marginBottom: "20px",
            fontSize: "18px",
            fontWeight: "bold",
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
            color: "white",
            textDecoration: "none",
            marginBottom: "20px",
            fontSize: "18px",
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
          Active Orders
        </h1>

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
              Email :
              {order.email}
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

            <p>
              Date :
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>

            <h3>
              Items
            </h3>

            <ul>
              {order.items?.map(
                (
                  item,
                  index
                ) => (
                  <li key={index}>
                    {item.name}
                    {" - "}
                    ₹{item.price}
                  </li>
                )
              )}
            </ul>

            <hr />

            <h3>
              Update Status
            </h3>

            <label>
              <input
                type="radio"
                name={order._id}
                checked={
                  order.status ===
                  "Pending"
                }
                onChange={() =>
                  updateStatus(
                    order._id,
                    "Pending"
                  )
                }
              />
              Pending
            </label>

            <br />

            <label>
              <input
                type="radio"
                name={order._id}
                checked={
                  order.status ===
                  "Preparing"
                }
                onChange={() =>
                  updateStatus(
                    order._id,
                    "Preparing"
                  )
                }
              />
              Preparing
            </label>

            <br />

            <label>
              <input
                type="radio"
                name={order._id}
                checked={
                  order.status ===
                  "Ready"
                }
                onChange={() =>
                  updateStatus(
                    order._id,
                    "Ready"
                  )
                }
              />
              Ready
            </label>

            <br />

            <label>
              <input
                type="radio"
                name={order._id}
                checked={
                  order.status ===
                  "Served"
                }
                onChange={() =>
                  updateStatus(
                    order._id,
                    "Served"
                  )
                }
              />
              Served
            </label>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminOrders;
