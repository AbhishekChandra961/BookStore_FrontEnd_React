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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "../../Css/styleIt.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CartCard() {
  const navigate = useNavigate();
  const [allCartBooks, setAllCartBooks] = React.useState([]);
  const [quantity, setQuantity] = React.useState([1]);
  const [address, setAddress] = React.useState();
  const [showAddress, setShowAddress] = React.useState(false);

  const [total, setTotal] = React.useState(0);
  const handlePlaceOrder = () => {
    setShowAddress(true);
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

  const updateQuantity = (token, cart_id, quantity) => {
    CartService.updateQuantityByToken(token, cart_id, quantity)
      .then(() => {
        // Quantity updated successfully
        console.log(token);
        console.log(cart_id);
        console.log(quantity);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDecrement = (cart_id, quantity) => {
    setQuantity(quantity + 1);
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      updateQuantity(localStorage.getItem("token"), cart_id, updatedQuantity);
      setAllCartBooks((prevCartBooks) =>
        prevCartBooks.map((book) =>
          book.cart_id === cart_id
            ? { ...book, quantity: updatedQuantity }
            : book
        )
      );
      console.log(allCartBooks);
      calculateTotal(allCartBooks);
    }
  };

  const handleIncrement = (cart_id, quantity) => {
    // setQuantity([quantity + 1]);
    // updateQuantity(localStorage.getItem("token"), cart_id, quantity);
    const updatedQuantity = quantity + 1;
    updateQuantity(localStorage.getItem("token"), cart_id, updatedQuantity);
    setAllCartBooks((prevCartBooks) =>
      prevCartBooks.map((book) =>
        book.cart_id === cart_id ? { ...book, quantity: updatedQuantity } : book
      )
    );

    console.log(allCartBooks);
    calculateTotal(allCartBooks);
  };

  const removeCart = (cart_id) => {
    const confirmed = window.confirm("Are you sure you want to delete");
    if (confirmed) {
      CartService.removeCart(cart_id)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleAddress = (event) => {
    // console.log(event.target);
    // console.log(event.target.value);
    setAddress(event.target.value);
    // console.log(address);
  };
  const PlaceOrder = () => {
    // const confirm = window.confirm("Confirm?");
    // if (confirm) {
    // OrderService.placeOrder(localStorage.getItem("token"), address)
    //   .then((responce) => {
    //     console.log(responce.data);
    //     console.log(address);

    //     navigate("/order");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     console.log(address);
    //   });
    // }
    localStorage.setItem("address", address);
    // localStorage.setItem("cart_id", allCartBooks.cart_id);
    navigate("/viewcart");
  };

  return (
    <>
      <Typography variant="h2" className="cartTitle">
        <ShoppingCartIcon fontSize="large" />
        Cart
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
                      ₹{book.bookStore.price * book.quantity}/-
                    </Typography>
                  </div>
                </div>
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Counter buttons"
                  sx={{ backgroundColor: "#228df9" }}
                >
                  <Button
                    onClick={() => handleDecrement(book.cart_id, book.quantity)}
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      backgroundColor: "#228df9",
                    }}
                  >
                    -
                  </Button>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "35px",
                      color: "black",
                    }}
                  >
                    {book.quantity || 1}
                  </Typography>
                  <Button
                    onClick={() => handleIncrement(book.cart_id, book.quantity)}
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      backgroundColor: "#228df9",
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#e90f0f",
                    padding: "8px 16px",
                    fontSize: "10px",
                    marginRight: "10px",
                    width: "100px",
                    "&:hover": {
                      backgroundColor: "#990e0e",
                    },
                  }}
                  onClick={() => removeCart(book.cart_id)}
                >
                  <RemoveCircleOutlineIcon
                    style={{
                      fontSize: "18px",
                      marginRight: "4px",
                    }}
                  />
                  Remove
                </Button>
              </Grid>
              {/* {setTotal(total + book.bookStore.price * book.quantity)} */}
            </tr>
          ))}
        </Grid>
      </Paper>
      {/* <Typography variant="h4" className="total">
        Total: ₹{total}
      </Typography> */}
      <div>
        {!showAddress && (
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              style={{
                padding: "15px 30px",
                fontSize: "1.2rem",
                margin: "10px",
              }}
              onClick={handlePlaceOrder}
            >
              Continue
            </Button>
          </div>
        )}
        {showAddress && (
          <div className="address" style={{ textAlign: "center" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
              sx={{ width: 700 }}
              value={address}
              onChange={handleAddress}
            />
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                style={{
                  padding: "15px 30px",
                  fontSize: "1.2rem",
                  margin: "10px",
                }}
                onClick={PlaceOrder}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
