import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import axios from "axios";
import asserts from "../assert";
import { Button } from "@mui/material";
import "./Combo.css";
import { useNavigate, useParams } from "react-router-dom";

let api_url = asserts.backend_url;

const Combo = ({ cart, setCart }) => {
  let [data, setData] = useState(null);
  let { type } = useParams();

  useEffect(() => {
    //Fetching data
    let fetchAllData = async () => {
      try {
        const response = await axios.get(`${api_url}/get-product-by-type`, {
          headers: {
            type: type,
          },
        });
        console.log(response.data.products);
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
    <h1>Select one more product to get the Combo offer</h1>
      {data && (
        <div className="home-container">
          <div className="cart-box">
            <div className="products">
              {data
                ? data.map((val, index) => (
                    <Card key={index} val={val} cart={cart} setCart={setCart} />
                  ))
                : ""}
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

const Card = ({ val, cart, setCart }) => {
  let navigate = useNavigate("");

  //Handle Cart
  function handleCart(id) {
    setCart([...cart, val._id]);
    navigate("/");
  }

  return (
    <div className="card-container">
      <div className="card-box">
        <div className="img-box">
          <img className="img" src={val.img} alt="" />
        </div>
        <h4>{val.name}</h4>
        <div className="price-details">
          <h4>M.R.P: </h4> <p>₹{val.price}</p>
        </div>
        <br />
        <div className="card-action">
          <Button variant="contained" onClick={() => handleCart(val._id)}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Combo;
