import React, { useState } from "react";
import CartCard from "./CartCard";
import Header from "../HomePage/Header";
import "../../Css/styleIt.css";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import OrderService from "../../Service/PlaceOrderService/OrderService";

export default function Cart() {
  // const [order, setOrder] = useState("");
  // const handleOrder = (order) => {
  //   setOrder(order);
  // };

  return (
    <>
      <Header />
      <Box className="cartContainer">
        <CartCard />
      </Box>
    </>
  );
}
