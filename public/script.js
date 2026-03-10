/* ================= ROLE CHECK ================= */

const role = localStorage.getItem("role");
const menu = [
  {
    name: "Cappuccino",
    price: 120,
    image: "images/cappuccino.jpg",
    category: "coffee"
  },
  {
    name: "Latte",
    price: 110,
    image: "images/latte.jpg",
    category: "coffee"
  },
  {
    name: "Burger",
    price: 150,
    image: "images/burger.jpg",
    category: "food"
  },
  {
    name: "Pizza",
    price: 200,
    image: "images/pizza.jpg",
    category: "food"
  },
  {
    name: "Ice Cream",
    price: 90,
    image: "images/icecream.jpg",
    category: "dessert"
  }
];

// Hide admin-only buttons for customers
if (role !== "admin") {
  const adminBtn = document.getElementById("adminOnly");
  const ordersBtn = document.getElementById("ordersOnly");
  if (adminBtn) adminBtn.style.display = "none";
  if (ordersBtn) ordersBtn.style.display = "none";
}

// Hide cart + my order for admin
if (role === "admin") {
  const cartLink = document.getElementById("cartLink");
  const myOrderBtn = document.getElementById("myOrderBtn");
  if (cartLink) cartLink.style.display = "none";
  if (myOrderBtn) myOrderBtn.style.display = "none";
}

/* ================= CART & ORDER LOGIC ================= */

let cart = [];

// ADD TO CART (NO ALERT)
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartBadge();
}

// CART ICON COUNT
function updateCartBadge() {
  const cartLink = document.getElementById("cartLink");
  if (!cartLink) return;

  cartLink.innerHTML = `Cart 🛒 (${cart.length})`;
}

// OPEN CART MODAL
function openCart() {
  if (role !== "customer") return;

  let total = 0;
  let html = "<h3>Your Order</h3>";

  if (cart.length === 0) {
    html += "<p>Your cart is empty ☕</p>";
  } else {
    cart.forEach(item => {
      html += `<p>${item.name} - ₹${item.price}</p>`;
      total += item.price;
    });

    html += `<hr><strong>Total: ₹${total}</strong>`;
    html += `<br><br><button onclick="placeOrder()">Confirm Order</button>`;
  }

  html += `<br><br><button onclick="closeModal()">Close</button>`;

  document.getElementById("modalContent").innerHTML = html;
  document.getElementById("modal").style.display = "flex";
}

// PLACE ORDER (NO ALERT)
function placeOrder() {
  const customer = JSON.parse(localStorage.getItem("customer"));

  if (!customer || cart.length === 0) return;

  fetch("/place-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: {
        name: customer.name,
        table: customer.table
      },
      items: cart
    })
  })
    .then(res => res.json())
    .then(() => {
      cart = [];
      updateCartBadge();
      closeModal();
      toggleStatus(); // auto-open My Order after placing
    });
}

/* ================= MENU FETCH (CATEGORY WISE) ================= */

fetch("/api/menu")
  .then(res => res.json())
  .then(items => {
    const coffeeDiv = document.getElementById("coffeeMenu");
    const foodDiv = document.getElementById("foodMenu");
    const dessertDiv = document.getElementById("dessertMenu");

    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${item.image}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <button onclick='showDetails(${JSON.stringify(item)})'>
            View Details
          </button>

          ${role === "customer"
            ? `<button onclick="addToCart('${item.name}', ${item.price})">
                 Add to Cart
               </button>`
            : ""}
        </div>
      `;

      if (item.category === "coffee") coffeeDiv.appendChild(card);
      if (item.category === "food") foodDiv.appendChild(card);
      if (item.category === "dessert") dessertDiv.appendChild(card);
    });
  });

/* ================= ITEM DETAILS MODAL ================= */

function showDetails(item) {
  document.getElementById("modalContent").innerHTML = `
    <img src="${item.image}"
         style="width:100%;height:180px;object-fit:cover;border-radius:10px;">
    <h3>${item.name}</h3>
    <p>${item.desc}</p>
    <strong>₹${item.price}</strong>
    <br><br>
    <button onclick="closeModal()">Close</button>
  `;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* ================= MY ORDER STATUS ================= */

// SHOW / HIDE STATUS
function toggleStatus() {
  const section = document.getElementById("statusSection");
  if (!section) return;

  section.style.display =
    section.style.display === "none" ? "block" : "none";
}

// LIVE STATUS FETCH (ADMIN → CUSTOMER)
if (role === "customer") {
  const customer = JSON.parse(localStorage.getItem("customer"));

  if (customer && customer.table) {
    setInterval(() => {
      fetch("/api/status/" + customer.table)
        .then(res => res.json())
        .then(data => {
          const statusDiv = document.getElementById("status");
          if (!statusDiv) return;

          if (data.length === 0) {
            statusDiv.innerHTML = "<p>No active orders yet ☕</p>";
            return;
          }

          statusDiv.innerHTML = data.map(o => `
            <div style="
              background:#fff;
              padding:12px;
              margin:10px 0;
              border-radius:10px;
              box-shadow:0 4px 10px rgba(0,0,0,0.15);
            ">
              <p><b>Order #${o.id}</b></p>
              <p>Status:
                <b style="color:#6f4e37">${o.status}</b>
              </p>
            </div>
          `).join("");
        });
    }, 3000);
  }
}