import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import { useState } from "react";
import Cart from "./Components/Cart";
import Combo from "./Components/Combo";

function App() {
  let [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<Dashboard cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/combo/:type" element={<Combo cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
}

export default App;
