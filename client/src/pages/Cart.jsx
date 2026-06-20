import React, { useState } from "react";

function Cart() {

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const customer =
    JSON.parse(localStorage.getItem("customer"));

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const placeOrder = async () => {

    if (cart.length === 0) {
      return;
    }

    const orderData = {
      customerName: customer?.name,
      phone: customer?.phone,
      email: customer?.email,
      tableNumber: customer?.table,
      items: cart,
      totalPrice: total,
      paymentMethod,
    };

    try {

      const response = await fetch(
        "http://localhost:5000/api/orders/place",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {

        localStorage.removeItem("cart");

        window.location.href =
          "/my-orders";
      }

    } catch (error) {

      console.log(error);

    }
  };

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
          marginBottom: "20px",
        }}
      >
        Your Cart
      </h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "700px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >

        <h3>
          Customer : {customer?.name}
        </h3>

        <h3>
          Mobile : {customer?.phone}
        </h3>

        <h3>
          Table : {customer?.table}
        </h3>

        <hr />

        <h2>Order Details</h2>

        {cart.length === 0 ? (

          <p>No Items In Cart</p>

        ) : (

          cart.map((item, index) => (

            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                margin: "15px 0",
              }}
            >

              <span>
                {item.name}
              </span>

              <span>
                ₹{item.price}
              </span>

            </div>

          ))

        )}

        <hr />

        <h2>
          Total Amount : ₹{total}
        </h2>

        <br />

        <h3>
          Payment Method
        </h3>

        <label>

          <input
            type="radio"
            value="Cash"
            checked={
              paymentMethod ===
              "Cash"
            }
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          Cash

        </label>

        <br />

        <label>

          <input
            type="radio"
            value="UPI"
            checked={
              paymentMethod ===
              "UPI"
            }
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          UPI

        </label>

        <br />

        <label>

          <input
            type="radio"
            value="Card"
            checked={
              paymentMethod ===
              "Card"
            }
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          Card

        </label>

        <br />
        <br />

        <button
          onClick={placeOrder}
          style={{
            padding:
              "12px 25px",
            background:
              "#7b5236",
            color: "white",
            border: "none",
            borderRadius:
              "10px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Cart;