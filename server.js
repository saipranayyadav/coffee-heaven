const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 3000;

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* ================= MULTER SETUP ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/images"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

/* ================= IN-MEMORY DATA (DSA USED) ================= */
/*
  customers → Array
  orders → Array
  menu → Array of Objects
*/
let customers = [];
let orders = [];
let orderId = 1;

/* ================= MENU DATA (CATEGORY BASED) ================= */
let menu = [
  // ☕ COFFEE
  {
    name: "Black Coffee",
    price: 120,
    desc: "Strong black coffee",
    category: "coffee",
    image: "/assets/images/black-coffee.webp"
  },
  {
    name: "Hot Coffee",
    price: 150,
    desc: "Milk coffee",
    category: "coffee",
    image: "/assets/images/hot-coffee.jpg"
  },
  {
    name: "Dark Coffee",
    price: 180,
    desc: "Dark roast",
    category: "coffee",
    image: "/assets/images/dark-coffee.jpg"
  },

  // 🍔 FOOD
  {
    name: "Pizza",
    price: 299,
    desc: "Cheesy pizza",
    category: "food",
    image: "/assets/images/pizza.jpg"
  },
  {
    name: "Burger",
    price: 149,
    desc: "Veg burger",
    category: "food",
    image: "/assets/images/burger.webp"
  },
  {
    name: "French Fries",
    price: 99,
    desc: "Crispy fries",
    category: "food",
    image: "/assets/images/fries.jpg"
  },

  // 🍨 DESSERTS
  {
    name: "Vanilla Ice Cream",
    price: 99,
    desc: "Vanilla ice cream",
    category: "dessert",
    image: "/assets/images/vanilla-icecream.avif"
  },
  {
    name: "Chocolate Ice Cream",
    price: 119,
    desc: "Chocolate ice cream",
    category: "dessert",
    image: "/assets/images/chocolate-icecream.webp"
  },
  {
    name: "Belgian Waffle",
    price: 149,
    desc: "Chocolate waffle",
    category: "dessert",
    image: "/assets/images/waffle.jpg"
  }
];

/* ================= ROUTES (PAGES) ================= */

// Role selection
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "role.html"))
);

// Admin login
app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "login.html"))
);

// Customer register
app.get("/customer", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "register.html"))
);

// Customer menu
app.get("/home", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// Admin add item
app.get("/upload", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "upload.html"))
);

// Admin orders page
app.get("/orders", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "orders.html"))
);

// Customer order status page
app.get("/status", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "status.html"))
);

/* ================= ADMIN LOGIN ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  res.json({
    success: username === "coffee hub" && password === "1234"
  });
});

/* ================= CUSTOMER REGISTER ================= */
app.post("/register", (req, res) => {
  customers.push(req.body);
  res.json({ success: true });
});

/* ================= IMAGE UPLOAD (ADMIN) ================= */
app.post("/upload-image", upload.single("image"), (req, res) => {
  const { name, price, desc, category } = req.body;

  menu.push({
    name,
    price: Number(price),
    desc,
    category,
    image: `/assets/images/${req.file.filename}`
  });

  res.redirect("/home");
});

/* ================= MENU API ================= */
app.get("/api/menu", (req, res) => {
  res.json(menu);
});

/* ================= ORDER SYSTEM ================= */

// CUSTOMER PLACES ORDER
app.post("/place-order", (req, res) => {
  const order = {
    id: orderId++,
    customer: req.body.customer,
    items: req.body.items,
    total: req.body.items.reduce((sum, i) => sum + i.price, 0),
    status: "Pending",
    time: new Date().toLocaleString()
  };

  orders.push(order);
  res.json({ success: true });
});

// ADMIN GETS ALL ORDERS
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// ADMIN UPDATES ORDER STATUS
app.post("/update-status", (req, res) => {
  const { id, status } = req.body;
  const order = orders.find(o => o.id === id);
  if (order) order.status = status;
  res.json({ success: true });
});

// ADMIN COMPLETES ORDER
app.post("/complete-order", (req, res) => {
  orders = orders.filter(o => o.id !== req.body.id);
  res.json({ success: true });
});

// CUSTOMER CHECKS STATUS (TABLE NUMBER)
app.get("/api/status/:table", (req, res) => {
  const tableOrders = orders.filter(
    o => o.customer.table == req.params.table
  );
  res.json(tableOrders);
});

/* ================= SERVER START ================= */
app.listen(PORT, () => {
  console.log("☕ Coffee Heaven server running at http://localhost:" + PORT);
});