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

function ResetPassword({ email }) {
  const navigate = useNavigate();
  //   const email = useParams();
  //   const [errors, setErrors] = useState("");
  const [reset, setReset] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //   let name, value;
  const handleInput = (event) => {
    const { name, value } = event.target;
    // setReset({ [name]: value });
    // setConfirmPassword(value);
    if (name === "password") {
      // setReset({ [name]: value });
      setReset((prevReset) => ({
        ...prevReset,
        password: value,
      }));
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setError(reset.password !== value ? "Password does not match" : "");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let object = {
      email: { email }.email,
      password: reset.password,
    };
    console.log(object);
    console.log(reset);
    BookStoreReset.reset(object.email, object.password)
      .then(() => {
        // console.log(value.data);
        alert("Password Changed");
        navigate("/signin");
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
            Enter Password
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="PASSWORD"
                  name="password"
                  autoComplete="password"
                  //   value={email.email}
                  onChange={handleInput}
                  // error={!!error}
                  // helperText={error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ConfirmPassword"
                  label="ConfirmPassword"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  //   value={email.email}
                  onChange={handleInput}
                  error={!!error}
                  helperText={error}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Change
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default ResetPassword;
