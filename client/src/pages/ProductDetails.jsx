import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;

  if (!product) {
    return (
      <div style={{ padding: "50px" }}>
        <h1>No Product Selected</h1>

        <button onClick={() => navigate("/home")}>
          Back Home
        </button>
      </div>
    );
  }

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added To Cart");
  };

  return (
    <div className="section">

      <div className="card" style={{ width: "500px" }}>

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="card-body">

          <h1>{product.name}</h1>

          <h2>₹{product.price}</h2>

          <p>{product.description}</p>

          <br />

          <button onClick={addToCart}>
            Add To Cart
          </button>

          <br />
          <br />

          <button
            onClick={() => navigate("/cart")}
          >
            Go To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;