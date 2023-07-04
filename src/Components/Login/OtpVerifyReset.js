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
import BookStoreService from "../../Service/BookStoreService";
import BookStoreReset from "../../Service/BookStoreReset";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Done } from "@mui/icons-material";
// import { Link, useNavigate, useParams } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function OtpVerify({ email }) {
  const navigate = useNavigate();
  //   const email = useParams();
  const [otp, setOtp] = useState({});
  let name, value;
  const handleInput = (event) => {
    // name = event.target.name;
    // const { name, value } = event.target;
    console.log(event.target.value);
    // const { value } = event.target;
    // const otpValue = value.replace(/\D/g, "");
    // const otpDigits = otpValue.slice(0, 6);
    setOtp({ otp: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(localStorage.getItem("email"));
    console.log({ email }.email);
    let obj = {
      email: { email }.email,
      // emailData: email,
      otp: otp.otp,
    };
    console.log(obj);
    BookStoreReset.verifyResetOtp(obj)
      .then((value) => {
        console.log(value.data);
        if (value.data) {
          alert("Verified");
          navigate("/reset");
        } else {
          alert("Wrong Otp");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
            OTP Verify
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  name="otp"
                  autoComplete="otp"
                  onChange={handleInput}
                  // value={user.otp}
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
              Verify
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default OtpVerify;
