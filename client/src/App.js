import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Role from "./pages/Role";
import CustomerLogin from "./pages/CustomerLogin";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import TotalOrders from "./pages/TotalOrders";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Role />}
        />

        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/admin-orders"
          element={<AdminOrders />}
        />

        <Route
          path="/total-orders"
          element={<TotalOrders />}
        />

        <Route
          path="/add-item"
          element={<AddItem />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;