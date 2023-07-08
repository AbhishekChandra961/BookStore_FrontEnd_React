import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../Assert/Animation/success.gif";
import ReactPlayer from "react-player";
import { Button, Typography } from "@mui/material";
import Header from "../HomePage/Header";

export default function SuccessOrder() {
  const navigate = useNavigate();
  const continueShopping = () => {
    localStorage.removeItem("address");
    navigate("/");
  };
  return (
    <>
      <Header />
      <img
        src={image}
        alt="image"
        style={{
          display: "block",
          margin: "0 auto",
          width: "500px",
          height: "500px",
        }}
      />
      <Typography
        variant="h4"
        style={{
          display: "flex",
          margin: "0 auto",
          justifyContent: "center",
          width: "50%",
          height: "auto",
        }}
      >
        Order Placed Successfull
      </Typography>
      <Typography
        variant="h5"
        style={{
          display: "flex",
          margin: "0 auto",
          justifyContent: "center",
          width: "50%",
          height: "auto",
        }}
      >
        Address : {localStorage.getItem("address")}
      </Typography>
      <Button
        variant="outlined"
        onClick={continueShopping}
        style={{
          display: "block",
          margin: "0 auto",
          width: "20%",
          height: "auto",
        }}
      >
        Continue Shopping
      </Button>
    </>
  );
}
