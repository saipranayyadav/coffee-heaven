import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedItem, setSelectedItem] = useState(null);

  const coffeeItems = [
    {
      name: "Black Coffee",
      price: 120,
      description: "Fresh premium black coffee.",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      name: "Hot Coffee",
      price: 150,
      description: "Rich hot coffee with milk.",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    },
    {
      name: "Dark Coffee",
      price: 180,
      description: "Strong dark roasted coffee.",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    },
  ];

  const foodItems = [
    {
      name: "Burger",
      price: 180,
      description: "Cheesy burger with crispy fries.",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
      name: "Pizza",
      price: 250,
      description: "Delicious cheese pizza.",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },
    {
      name: "French Fries",
      price: 140,
      description: "Crispy golden french fries.",
      image:
        "https://images.unsplash.com/photo-1576107232684-1279f390859f",
    },
  ];

  const dessertItems = [
    {
      name: "Ice Cream",
      price: 120,
      description: "Vanilla ice cream scoop.",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    },
    {
      name: "Chocolate Cake",
      price: 220,
      description: "Soft chocolate layered cake.",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    },
    {
      name: "Waffles",
      price: 170,
      description: "Fresh waffles with syrup.",
      image:
        "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e",
    },
  ];

  const addToCart = (item) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(item);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    setSelectedItem(null);
  };

  const renderCards = (items) =>
    items.map((item, index) => (
      <div className="card" key={index}>
        <img src={item.image} alt={item.name} />

        <div className="card-body">
          <h3>{item.name}</h3>

          <p className="price">₹{item.price}</p>

          <button
            onClick={() =>
              setSelectedItem(item)
            }
          >
            View Details
          </button>
        </div>
      </div>
    ));

  return (
    <div className="home-container">
      <div className="sidebar">
        <h1 className="logo">
          ☕ Coffee Heaven
        </h1>

        <Link to="/home">Home</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/my-orders">
          My Orders
        </Link>

        <Link to="/">Logout</Link>
      </div>

      <div className="main">
        <div className="hero">
          <div className="hero-content">
            <h1>Coffee Heaven</h1>

            <p>
              Fresh Coffee, Foods,
              Ice Creams & Waffles
            </p>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">
            ☕ Coffee
          </h2>

          <div className="cards">
            {renderCards(coffeeItems)}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">
            🍔 Foods
          </h2>

          <div className="cards">
            {renderCards(foodItems)}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">
            🍰 Desserts
          </h2>

          <div className="cards">
            {renderCards(dessertItems)}
          </div>
        </div>
      </div>

      {selectedItem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: "450px",
              background: "#fff",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              <h2>
                {selectedItem.name}
              </h2>

              <p>
                {selectedItem.description}
              </p>

              <h3>
                ₹{selectedItem.price}
              </h3>

              <button
                onClick={() =>
                  addToCart(selectedItem)
                }
              >
                Add To Cart
              </button>

              <button
                style={{
                  marginLeft: "10px",
                }}
                onClick={() =>
                  setSelectedItem(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
