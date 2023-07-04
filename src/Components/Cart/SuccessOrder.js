import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../Assert/Animation/success.gif";
import ReactPlayer from "react-player";
import { Button, Typography } from "@mui/material";

export default function SuccessOrder() {
  const navigate = useNavigate();
  const continueShopping = () => {
    localStorage.removeItem("address");
    navigate("/");
  };
  return (
    <>
      <img
        src={image}
        alt="image"
        style={{
          display: "block",
          margin: "0 auto",
          width: "50%",
          height: "auto",
        }}
      />
      <Typography
        variant="h4"
        style={{
          display: "block",
          margin: "0 auto",
          width: "50%",
          height: "auto",
        }}
      >
        Order Placed Successfull
      </Typography>
      <Button
        variant="outlined"
        onClick={continueShopping}
        style={{
          display: "block",
          margin: "0 auto",
          width: "50%",
          height: "auto",
        }}
      >
        {" "}
        Continue Shopping
      </Button>
    </>
  );
}
