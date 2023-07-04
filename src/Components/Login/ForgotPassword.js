// import * as React from "react";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookStoreReset from "../../Service/BookStoreReset";
import BookStoreService from "../../Service/BookStoreService";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Done } from "@mui/icons-material";
// import { Link, useNavigate, useParams } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function ForgotPassword({ onEmailChange }) {
  const navigate = useNavigate();
  //   const email = useParams();
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState({
    email: "",
  });
  //   let name, value;
  const handleInput = (event) => {
    const { name, value } = event.target;
    setEmail({ [name]: value });
    onEmailChange(value);

    if (name === "email") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
        // errorMessage = "Email is required";
      } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email format",
        }));
        // errorMessage = "Invalid email format";
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
        // errorMessage = "email can not be empty";
      }
    }
  };

  const handleSubmit = (event) => {
    // console.log(email.email);
    const e = email.email;
    console.log(e);
    BookStoreReset.forgot(e)
      .then((value) => {
        console.log(value.data);
        if (value.data) {
          alert("OTP sent...");
          navigate("/otpVerifyReset");
        } else {
          alert("Email id does not Exist....Register");
          navigate("/signup");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(result);
    // if (BookStoreReset.forgot(email)) {
    //   alert("OTP sent");
    //   navigate("/otpVerifyReset");
    // } else {
    //   alert("Email Id Does not Exist....Register");
    // }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Email
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="EMAIL"
                  name="email"
                  autoComplete="email"
                  value={email.email}
                  onChange={handleInput}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                {/* <MuiOtpInput onChange={handleInput} /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Send Otp
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default ForgotPassword;
