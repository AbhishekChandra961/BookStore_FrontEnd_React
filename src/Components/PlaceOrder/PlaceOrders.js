import * as React from "react";
import { styled } from "@mui/material/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import CartService from "../../Service/Cart/CartService";
import OrderService from "../../Service/PlaceOrderService/OrderService";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import LuggageIcon from "@mui/icons-material/Luggage";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "../../Css/styleIt.css";
import Header from "../HomePage/Header";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CartCard() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [allCartBooks, setAllCartBooks] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [total, setTotal] = React.useState(0);
  const handlePlaceOrder = () => {
    navigate("/");
  };

  React.useEffect(() => {
    cartData();
    // calculateTotal(allCartBooks);
  }, []);
  let cartData = () => {
    OrderService.getByToken(localStorage.getItem("token"))
      .then((response) => {
        setAllCartBooks(response.data);
        console.log(allCartBooks);
        console.log(response.data);
        calculateTotal(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculateTotal = (cartBooks) => {
    let sum = 0;
    for (const book of cartBooks) {
      sum = sum + book.bookStore.price * book.quantity;
    }
    setTotal(sum);
    // console.log(cartBooks);
  };

  const cancelOrders = (order_id) => {
    console.log(order_id);
    const token = localStorage.getItem("token");
    console.log(token);
    const confirm = window.confirm("Confirm?");
    if (confirm) {
      OrderService.cancelOrder(token, order_id)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Header />
      <Typography variant="h2" className="cartTitle">
        <LuggageIcon fontSize="large" />
        Orders
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Cancelled Orders" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Paper
            sx={{
              width: "800px",
              margin: "auto auto",
            }}
          >
            <Grid container spacing={2} className="cartBooks">
              {allCartBooks.map((book) => (
                <tr key={book.cart_id}>
                  {!book.cancel ? (
                    <Grid item className="cardContainer">
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        {book.bookStore.logo && (
                          <Img alt="complex" src={book.bookStore.logo} />
                        )}
                      </ButtonBase>
                      <div className="cardText">
                        <Typography gutterBottom variant="h6" component="div">
                          {book.bookStore.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {book.bookStore.author}
                        </Typography>
                      </div>

                      <Typography variant="h6">
                        Address : {book.address}
                      </Typography>

                      <Button
                        variant="outlined"
                        sx={{
                          // backgroundColor: "#e90f0f",
                          padding: "8px 16px",
                          fontSize: "10px",
                          marginRight: "10px",
                          width: "100px",
                          "&:hover": {
                            backgroundColor: "#e90f0f",
                            color: "white",
                          },
                        }}
                        onClick={() => cancelOrders(book.order_id)}
                      >
                        <RemoveCircleOutlineIcon
                          style={{
                            fontSize: "18px",
                            marginRight: "4px",
                          }}
                        />
                        Cancel
                      </Button>
                    </Grid>
                  ) : (
                    <Typography></Typography>
                  )}
                </tr>
              ))}
            </Grid>
          </Paper>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Paper
            sx={{
              width: "800px",
              margin: "auto auto",
            }}
          >
            <Grid container spacing={2} className="cartBooks">
              {allCartBooks.map((book) => (
                <tr key={book.cart_id}>
                  {book.cancel ? (
                    <Grid item className="cardContainer">
                      <ButtonBase sx={{ width: 128, height: 128 }}>
                        {book.bookStore.logo && (
                          <Img alt="complex" src={book.bookStore.logo} />
                        )}
                      </ButtonBase>
                      <div className="cardText">
                        <Typography gutterBottom variant="h6" component="div">
                          {book.bookStore.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {book.bookStore.author}
                        </Typography>
                      </div>

                      <Typography variant="h6">
                        Address : {book.address}
                      </Typography>
                      {/* {book.cancel ? ( */}
                      <Button
                        variant="contained"
                        style={{
                          padding: "15px 30px",
                          fontSize: "1.2rem",
                          margin: "10px",
                        }}
                        disabled
                      >
                        Cancelled
                      </Button>
                    </Grid>
                  ) : (
                    <Typography></Typography>
                  )}
                </tr>
              ))}
            </Grid>
          </Paper>
        </CustomTabPanel>
      </Box>

      <div style={{ display: "flex", justifyContent: "center", gap: "400px" }}>
        <div>
          <Button
            variant="outlined"
            style={{
              padding: "15px 30px",
              fontSize: "1.2rem",
              margin: "10px",
            }}
            onClick={handlePlaceOrder}
          >
            Back
          </Button>
        </div>
      </div>
    </>
  );
}
