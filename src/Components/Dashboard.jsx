import React, { useContext, useEffect } from "react";
import Base from "../Base/Base";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import asserts from "../assert";
import { useState } from "react";
import { Button } from "@mui/material";

let api_url = asserts.backend_url;

const Dashboard = ({ cart, setCart }) => {
  let [data, setData] = useState(false);
  let [flatProd, setFlatProd] = useState("");
  let [percentageProd, setPercentageProd] = useState("");
  let [comboProd, setComboProd] = useState("");

  useEffect(() => {
    //Fetching data
    let fetchAllData = async () => {
      try {
        const response = await axios.get(`${api_url}/get-all-products`);

        setFlatProd(response.data.products.flat_prod);
        setPercentageProd(response.data.products.percentage_prod);
        setComboProd(response.data.products.combo_prod);
        setData(response.data.products);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, []);

  return (
    <Base cart={cart}>
      {data && (
        <div className="home-container">
          <h2>Home Page</h2>

          <h4>Flat --- Discount</h4>
          <div className="products">
            {flatProd &&
              flatProd.map((data, index) => (
                <Card key={index} val={data} cart={cart} setCart={setCart} />
              ))}
          </div>

          <h4>Percentage --- Discount</h4>
          <div className="products">
            {percentageProd &&
              percentageProd.map((data, index) => (
                <Card key={index} val={data} cart={cart} setCart={setCart} />
              ))}
          </div>

          <h4>Combo --- Discount</h4>
          <div className="products">
            {comboProd &&
              comboProd.map((data, index) => (
                <Card key={index} val={data} cart={cart} setCart={setCart} />
              ))}
          </div>
        </div>
      )}
    </Base>
  );
};

const Card = ({ val, cart, setCart }) => {
  let navigate = useNavigate();
  let [price, setPrice] = useState("");

  useEffect(() => {
    if (val.discountType === "Flat") {
      setPrice(val.price - val.discountValue);
    } else if (val.discountType === "Percentage") {
      setPrice(val.price - (val.price * val.discountValue) / 100);
    } else if (val.discountType === "Combo") {
      setPrice(val.price);
    }
  }, []);


  //Handle Cart
  function handleCart() {
    if (val.discountType === "Combo" && !cart.includes(val._id)) {
      setCart([...cart, val._id]);
      navigate(`/combo/${val.productType}`);
    }
    if (!cart.includes(val._id)) {
      setCart([...cart, val._id]);
    }
  }

  return (
    <div className="card-container">
      <div className="card-box">
        <div className="img-box">
          <img className="img" src={val.img} alt="" />
        </div>
        <h4>{val.name}</h4>
        {val.discountType === "Combo" ? (
          <div className="price-details">
            <h4>M.R.P: </h4> <p>₹{val.price}</p>
          </div>
        ) : (
          <div className="price-details">
            <h4>M.R.P: </h4> <p className="old-price">₹{val.price}</p>
          </div>
        )}
        {val.discountType !== "Combo" && (
          <div className="price-details">
            {val.discountType === "Percentage" ? (
              <h4 className="discount-val">-{val.discountValue}%</h4>
            ) : (
              <h4 className="discount-val">-{val.discountValue}</h4>
            )}
            <p>
              ₹<b>{price}</b>
            </p>
          </div>
        )}
        <br />
        <div className="card-action">
          <Button variant="contained" onClick={() => handleCart()}>
            Add To Cart
          </Button>
          <Button variant="contained">Buy Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
