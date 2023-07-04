// import * as React from "react";
import React, { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
// import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { Link } from "@mui/material";
// import { CenterFocusStrong } from "@mui/icons-material";
// import Stack from '@mui/material/Stack';
// import "../CSS/Form.css";
// import AddressbookService from "../Services/AddressbookService";
// import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
import BookStoreService from "../../Service/BookStoreService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import OtpVerify from "./OtpVerify";
// import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp({ onEmail }) {
  // const [day, setDay] = useState(dayjs("01-01-2000"));
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [formValidate, setFormValidate] = useState(false);
  let initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: null,
  };

  const styles = {
    form: {
      display: "flex",
      // backgroundColor: "blue",
    },
  };
  const [user, setUser] = useState(initialValue);
  let name, value;

  // const handleDateInputs = (event) => {
  //   setDay(event.format("DD-MM-YYYY"));
  //   console.log(event.format("DD-MM-YYYY"));
  // };
  const handleInputs = (event) => {
    console.log(event.target);
    console.log(event.target.value);
    const { name, value } = event.target;

    // name = event.target.name;
    // value = event.target.value;
    setUser((prevuser) => ({ ...user, [name]: value }));

    // let errorMessage = "";
    //Validate FirstName
    if (name === "firstName") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "First Name is required",
        }));
        // errorMessage = "First Name is required";
      } else if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "First Name should start with a capital letter",
        }));
        // errorMessage = "First Name should start with a capital letter";
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: "",
        }));
        // errorMessage = "First Name Can not be empty";
      }
    }
    //Validate LastName
    if (name === "lastName") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: "Last Name is required",
        }));
        // errorMessage = "Last Name is required";
      } else if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: "Last Name should start with a capital letter",
        }));
        // errorMessage = "Last Name should start with a capital letter";
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: "",
        }));
        // errorMessage = "Last Name can not be empty";
      }
    }
    //Validate Email
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
    //Validate password
    if (name === "password") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
        // errorMessage = "Password is required";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password should contain at least one lowercase letter, one uppercase letter, and one special character",
        }));
        // errorMessage =
        //   "Password should contain at least one lowercase letter, one uppercase letter, and one special character";
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
        // errorMessage = "password can not be empty";
      }
    }
    // setFormValidate(errorMessage === "");
    // setErrors(errorMessage);
  };

  const onSub = (event) => {
    event.preventDefault();
    console.log(user);
    const formattedDob = dayjs(user.dob).format("DD-MM-YYYY");
    // const userWithFormattedDob = {
    //   ...user,
    //   dob: formattedDob,
    // };
    let object = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      dob: formattedDob,
    };
    onEmail(object.email);
    console.log(object);
    // async function register() {
    BookStoreService.addUser(object)
      .then((value) => {
        // localStorage.setItem("email", user.email);
        console.log(value.data);
        if (value.data) {
          alert("OTP Sent...");
          navigate("/otpVerify");
        } else {
          alert("User Already Exist...Login");
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // }
    // register();
  };
  // const SignUp = () => {
  //   return <OtpVerify emailData={user.email} />;
  // };

  return (
    <Grid className="form">
      {/* <div>
        <OtpVerify email={user.email} />
      </div> */}
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
            <Box>
              <Typography component="h1" variant="h5">
                SignUp
                <Link to="/">
                  <CancelIcon sx={{ pt: 1, pl: 1 }} />
                </Link>
              </Typography>
            </Box>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputs}
                    autoFocus
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputs}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer
                      item
                      xs={5}
                      components={["DatePicker", "DatePicker"]}
                    > */}
                    <DatePicker
                      label="Date Of Birth"
                      value={user.dob}
                      onChange={(newValue) =>
                        setUser((prevUser) => ({
                          ...prevUser,
                          dob: newValue,
                        }))
                      }
                      // renderInput={(params) => <TextField {...params} />}
                    />
                    {/* </DemoContainer> */}
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    autoComplete="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
              </Grid>
              <Box>
                <Link to="/">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, width: 400 }}
                    onClick={onSub}
                    // disabled={!formValidate}
                  >
                    SignUp
                  </Button>
                </Link>
              </Box>
              <Grid item xs={12} marginLeft={2} marginTop={5}>
                <Link to="/">{"Already have a account? Sign In"}</Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Grid>
  );
}
