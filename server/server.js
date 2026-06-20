const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

// ROUTES
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// CONFIG
dotenv.config();

// APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FOLDER
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
   .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Coffee Heaven Backend Running");
});

// IMAGE UPLOAD ROUTE
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "Image Uploaded Successfully",
    image: req.file.filename,
  });
});

// API ROUTES
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// PORT
const PORT = process.env.PORT || 5000;

// SERVER START
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});