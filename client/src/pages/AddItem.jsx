import React, {
  useState,
} from "react";

import axios from "axios";

function AddItem() {

  const [product, setProduct] =
    useState({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]:
        e.target.value,
    });

  };

  const addProduct =
    async () => {

      await axios.post(
        "http://localhost:5000/api/products/add",
        product
      );

      setProduct({
        name: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
    };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >

      <h1>
        Add Product
      </h1>

      <br />

      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="description"
        placeholder="Description"
        value={
          product.description
        }
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <input
        name="category"
        placeholder="Category"
        value={
          product.category
        }
        onChange={
          handleChange
        }
      />

      <br />
      <br />

      <button
        onClick={
          addProduct
        }
      >
        Add Item
      </button>

    </div>
  );
}

export default AddItem;