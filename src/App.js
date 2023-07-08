import logo from "./logo.svg";
import "./App.css";
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/Login/SignUp";
import OtpVerify from "./Components/Login/OtpVerify";
// import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";
import OtpVerifyReset from "./Components/Login/OtpVerifyReset";
import HomePage from "./Components/HomePage/HomePage";
import BookAdd from "./Components/BookAdmin/BookAdd";
import PlaceOrders from "./Components/PlaceOrder/PlaceOrders";
import ViewCart from "./Components/Cart/ViewCart";
import Cart from "./Components/Cart/Cart";
import SuccessOrder from "./Components/Cart/SuccessOrder";
import About from "./Components/About/About";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const handleEmail = (email) => {
    setEmail(email);
  };
  const [emId, setEmId] = useState("");
  const handleEmId = (emId) => {
    setEmId(emId);
  };
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp onEmail={handleEmId} />}></Route>
        <Route path="/otpVerify" element={<OtpVerify emailId={emId} />}></Route>
        <Route
          path="/forgot"
          element={<ForgotPassword onEmailChange={handleEmail} />}
        ></Route>
        <Route path="/reset" element={<ResetPassword email={email} />}></Route>
        <Route
          path="/otpVerifyReset"
          element={<OtpVerifyReset email={email} />}
        ></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/addbook" element={<BookAdd />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/viewcart" element={<ViewCart />}></Route>
        <Route path="/order" element={<PlaceOrders />}></Route>
        <Route path="/success" element={<SuccessOrder />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default App;
