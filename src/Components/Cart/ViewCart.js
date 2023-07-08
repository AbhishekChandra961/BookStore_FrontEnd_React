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
import Header from "../HomePage/Header";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "../../Css/styleIt.css";
// import OrderService from "../../Service/PlaceOrderService/OrderService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ViewCart() {
  const navigate = useNavigate();
  const [allCartBooks, setAllCartBooks] = React.useState([]);

  const [total, setTotal] = React.useState(0);

  const handlePlaceOrder = () => {
    const confirm = window.confirm("Confirm?");
    if (confirm) {
      OrderService.placeOrder(
        localStorage.getItem("token"),
        localStorage.getItem("address")
      )
        .then(() => {
          console.log("order placed");
          navigate("/success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  React.useEffect(() => {
    cartData();
    // calculateTotal(allCartBooks);
  }, []);
  let cartData = () => {
    CartService.getById(localStorage.getItem("token"))
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
  const backButton = () => {
    navigate("/cart");
  };

  return (
    <>
      <Header />
      <Typography variant="h2" className="cartTitle">
        <LuggageIcon fontSize="large" />
        Order View
      </Typography>
      <Paper
        sx={{
          width: "800px",
          margin: "auto auto",
        }}
      >
        <Grid container spacing={2} className="cartBooks">
          {allCartBooks.map((book) => (
            <tr key={book.cart_id}>
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
                <div>
                  <div style={{ marginLeft: 130 }}>
                    <Typography
                      variant="h4"
                      component="div"
                      className="bookPrice"
                    >
                      ₹{book.bookStore.price} X
                    </Typography>
                  </div>
                </div>

                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "35px",
                    color: "black",
                  }}
                >
                  {book.quantity}
                </Typography>

                <Typography variant="h6">{book.address}</Typography>
                {/* {book.cancel ? (
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
                ) : (
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
                )} */}
              </Grid>
            </tr>
          ))}
        </Grid>
      </Paper>
      <Typography variant="h4" className="total">
        Total: ₹{total}
      </Typography>

      <div style={{ display: "flex", justifyContent: "center", gap: "400px" }}>
        <div>
          <Button
            variant="outlined"
            style={{
              padding: "15px 30px",
              fontSize: "1.2rem",
              margin: "10px",
            }}
            onClick={backButton}
          >
            Back
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            style={{
              padding: "15px 30px",
              fontSize: "1.2rem",
              margin: "10px",
            }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
}
