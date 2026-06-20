import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [newOrders, setNewOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/all"
      );

      const customerOrders = res.data
        .filter(
          (order) =>
            order.phone === customer?.phone
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

      const current = customerOrders.filter(
        (order) =>
          order.status !== "Served" &&
          order.status !== "Completed"
      );

      const old = customerOrders.filter(
        (order) =>
          order.status === "Served" ||
          order.status === "Completed"
      );

      setNewOrders(current);
      setPastOrders(old);

    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";

      case "Preparing":
        return "#2196f3";

      case "Ready":
        return "green";

      case "Served":
        return "purple";

      case "Completed":
        return "#555";

      default:
        return "black";
    }
  };

  const renderOrder = (order) => (
    <div
      key={order._id}
      style={{
        background: "white",
        padding: "25px",
        marginBottom: "25px",
        borderRadius: "15px",
        boxShadow:
          "0 5px 15px rgba(0,0,0,0.15)",
      }}
    >
      <h2>
        Order #
        {order._id.slice(-4)}
      </h2>

      <p>
        Date :
        {" "}
        {new Date(
          order.createdAt
        ).toLocaleString()}
      </p>

      <p>
        Table :
        {" "}
        {order.tableNumber}
      </p>

      <p>
        Payment :
        {" "}
        {order.paymentMethod}
      </p>

      <hr />

      <h3>Ordered Items</h3>

      <ul>
        {order.items.map(
          (item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price}
            </li>
          )
        )}
      </ul>

      <hr />

      <h2>
        Total :
        ₹{order.totalPrice}
      </h2>

      <br />

      <h2>
        Status :
        <span
          style={{
            color: getStatusColor(
              order.status
            ),
            marginLeft: "10px",
          }}
        >
          {order.status}
        </span>
      </h2>
    </div>
  );

  return (
    <div
      style={{
        padding: "40px",
        background: "#f7f2ed",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#5e3c26",
          marginBottom: "30px",
        }}
      >
        New Orders
      </h1>

      {newOrders.length > 0 ? (
        newOrders.map(renderOrder)
      ) : (
        <p>No Active Orders</p>
      )}

      <br />
      <br />

      <h1
        style={{
          color: "#5e3c26",
          marginBottom: "30px",
        }}
      >
        Past Orders
      </h1>

      {pastOrders.length > 0 ? (
        pastOrders.map(renderOrder)
      ) : (
        <p>No Past Orders</p>
      )}
    </div>
  );
}

export default MyOrders;