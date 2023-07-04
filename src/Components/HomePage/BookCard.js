import * as React from "react";
import Card from "@mui/material/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../../Css/styleIt.css";
import { Margin } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CartService from "../../Service/Cart/CartService";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookAddService from "../../Service/BookAdmin/BookAddService";
import UserData from "../../Service/UserService/UserData";
import { isTimeView } from "@mui/x-date-pickers/internals/utils/time-utils";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function BookCard(props) {
  const navigate = useNavigate();
  const [allBook, setAllBook] = React.useState({ bookDetails: [] });

  const [cart, setCart] = React.useState({
    book_id_1: { isAdded: false },
    book_id_2: { isAdded: false },
    // Add more books with their respective book_ids
  });
  const [viewCart, setViewCart] = React.useState(false);
  const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    fontSize: "40px",
    maxWidth: "400px",
  }));

  let display = () => {
    BookAddService.allBook().then((response) => {
      console.log(response.data);
      setAllBook({ bookDetails: response.data });
    });
  };

  React.useEffect(() => {
    display();
  }, []);

  const handleAddToCart = (bookId) => {
    if (localStorage.getItem("token")) {
      setCart((prevCart) => ({
        ...prevCart,
        [bookId]: {
          ...prevCart[bookId],
          isAdded: true,
          cart: true,
        },
      }));
      setViewCart(true);
      let obj = {
        token: localStorage.getItem("token"),
        book_id: bookId,
        quantity: 1,
      };
      console.log(obj);
      CartService.addToCart(obj)
        .then(() => {
          alert("Book Added to Cart");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("SignIn Before Adding to Cart");
    }
  };
  const toCart = () => {
    navigate("/cart");
  };
  return (
    <div className="homeContainer">
      {/* <img src={image}></img> */}
      {allBook.bookDetails &&
        allBook.bookDetails.map((book, index) => (
          <tr key={index}>
            <div style={{ width: "100" }}>
              <Card
                // sx={{ maxWidth: 345 }}
                className="bookCard"
                style={{ margin: 20, marginTop: 30 }}
              >
                <CardMedia
                  sx={{ height: 300 }}
                  image={book.logo}
                  title="book"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h8"
                    component="div"
                    sx={{
                      maxHeight: "50px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      "-webkit-line-clamp": 1,
                      "-webkit-box-orient": "vertical",
                    }}
                  >
                    <CustomTooltip title={book.name}>
                      <span>
                        {book.description.length > 60
                          ? `${book.name.slice(0, 60)}...`
                          : book.name}
                      </span>
                    </CustomTooltip>
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      maxHeight: "30px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      "-webkit-line-clamp": 1,
                      "-webkit-box-orient": "vertical",
                    }}
                  >
                    <Tooltip title={book.description}>
                      <span>
                        {book.author.length > 30
                          ? `${book.author.slice(0, 30)}...`
                          : book.author}
                      </span>
                    </Tooltip>
                  </Typography>

                  <Typography variant="h4" color="#1976d2">
                    ₹{book.price}/-
                  </Typography>
                  <div className="addtocart">
                    {/* <Typography variant="h5">Add to Cart</Typography>
                    <AddShoppingCartIcon
                      fontSize="large"
                      style={{ marginLeft: 0 }}
                    /> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(book.book_id)}
                      disabled={cart[book.book_id]?.isAdded}
                    >
                      {cart[book.book_id]?.isAdded
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </Button>
                    <AddShoppingCartIcon
                      fontSize="large"
                      style={{ marginLeft: 0 }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </tr>
        ))}
      <Box
        sx={{ "& > :not(style)": { m: 1 } }}
        style={{ position: "absolute", bottom: 20, left: 20 }}
      >
        <Fab
          variant="extended"
          color="info"
          disabled={!viewCart}
          onClick={toCart}
        >
          {viewCart ? (
            <>
              <VisibilityIcon sx={{ mr: 1 }} />
              View Cart
            </>
          ) : (
            <>
              <VisibilityOffIcon sx={{ mr: 1 }} />
              View Cart
            </>
          )}
        </Fab>
      </Box>
      {/* <Button
        variant="contained"
        disabled={!viewCart}
        style={{ position: "absolute", top: 120, left: 20 }}
      >
        View Cart
      </Button> */}
    </div>
  );
}
