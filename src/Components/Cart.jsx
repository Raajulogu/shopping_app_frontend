import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import axios from "axios";
import asserts from "../assert";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import "./Cart.css";

let api_url = asserts.backend_url;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = ({ cart, setCart }) => {
  let [data, setData] = useState(null);
  let [amount, setAmount] = useState(0);

  useEffect(() => {
    //Fetching data
    let fetchAllData = async () => {
      try {
        const response = await axios.get(`${api_url}/get-all-products`);

        let temp = response.data.products.all_products.filter((val) => {
          if (cart.includes(val._id)) {
            return val;
          } else {
            return false;
          }
        });
        setData([...temp]);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, []);

  useEffect(() => {
    //Fetching data
    let fetchAllData = async () => {
      try {
        const response = await axios.get(`${api_url}/get-all-products`);

        let temp = response.data.products.all_products.filter((val) => {
          if (cart.includes(val._id)) {
            return val;
          } else {
            return false;
          }
        });
        setData([...temp]);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
    //Calling fetch function
    fetchAllData();
  }, [cart]);

  //Handle Buy
  function handleBuy() {
    setAmount(0);
    setCart([]);
    handleOpen();
  }

  //Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Base cart={cart}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thank you for buying our Products
          </Typography>
        </Box>
      </Modal>
      {data && (
        <div className="home-container">
          <div className="cart-box">
            <div className="products">
              {data
                ? data.map((val, index) => (
                    <Card
                      key={index}
                      val={val}
                      cart={cart}
                      setCart={setCart}
                      amount={amount}
                      setAmount={setAmount}
                    />
                  ))
                : ""}
            </div>
            <div className="card-amount">
              <p>SubTotal({cart.length} items)</p>
              <p>Total: {amount}</p>
              <Button onClick={handleBuy} variant="contained" color="warning">
                Proceed to Buy
              </Button>
            </div>
          </div>
        </div>
      )}
    </Base>
  );
};

const Card = ({ val, cart, setCart, amount, setAmount }) => {
  let [price, setPrice] = useState("");
  let [qty, setQty] = useState(1);

  useEffect(() => {
    if (val.discountType === "Flat") {
      setPrice(val.price - val.discountValue);
    } else if (val.discountType === "Percentage") {
      setPrice(val.price - (val.price * val.discountValue) / 100);
    } else if (val.discountType === "Combo") {
      setPrice(val.price);
    }
  }, []);

  useEffect(() => {
    let temp = Number(amount) + Number(price);
    setAmount(temp);
  }, [price]);

  //Handle Cart
  function handleCart(id) {
    let temp = cart.filter((data) => {
      if (data !== id) {
        return data;
      }
    });
    setAmount(amount - qty * price);
    setCart([...temp]);
  }

  //Handle Qty
  function handleQty({ val }) {
    let temp = (val - qty) * price;
    setAmount(amount + temp);
    setQty(val);
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
          <Button
            variant="contained"
            color="error"
            onClick={() => handleCart(val._id)}
          >
            Remove
          </Button>
          <TextField
            value={qty > 0 ? qty : 1}
            onChange={(e) => handleQty({ val: e.target.value })}
            sx={{ width: "8ch" }}
            id="outlined-number"
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
