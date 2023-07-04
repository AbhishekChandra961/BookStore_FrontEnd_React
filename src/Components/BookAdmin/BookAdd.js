import * as React from "react";
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
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AttachmentIcon from "@mui/icons-material/Attachment";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InputLabel from "@mui/material/InputLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BookAddService from "../../Service/BookAdmin/BookAddService";
import { Link, useNavigate, useParams } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function BookCard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState();
  let initialValue = {
    bookName: "",
    authorName: "",
    description: "",
    logo: null,
    price: "",
    quantity: "",
  };
  const [book, setBook] = React.useState(initialValue);

  const Input = styled("input")({
    display: "none",
  });

  const handleInputs = (event) => {
    console.log(event.target);
    console.log(event.target.value);
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      name: book.bookName,
      author: book.authorName,
      description: book.description,
      logo: book.logo,
      price: book.price,
      quantity: book.quantity,
    };
    console.log(obj);
    BookAddService.addBook(obj)
      .then(() => {
        console.log("added");
        alert("added");
        navigate("/");
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
            ADD BOOK
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="bookName"
                  required
                  fullWidth
                  id="bookName"
                  label="Book Name"
                  value={book.bookName}
                  onChange={handleInputs}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="authorName"
                  label="Author Name"
                  name="authorName"
                  value={book.authorName}
                  onChange={handleInputs}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={book.description}
                  onChange={handleInputs}
                  autoComplete="description"
                />
              </Grid>

              {/* <input
                color="primary"
                accept="image/*"
                type="file"
                // onChange={onChange}
                id="icon-button-file"
                style={{ display: "none" }}
              /> */}

              <FormControl
                sx={{ ml: 2, mt: 1, mb: 0, width: 182 }}
                variant="outlined"
              >
                <OutlinedInput
                  id="price"
                  name="price"
                  onChange={handleInputs}
                  value={book.price}
                  endAdornment={
                    <InputAdornment position="end">₹</InputAdornment>
                  }
                />
                <FormHelperText id="outlined-weight-helper-text">
                  Price
                </FormHelperText>
              </FormControl>
              <FormControl
                sx={{ ml: 2, mr: 0, mt: 1, width: 192 }}
                variant="outlined"
              >
                <OutlinedInput
                  id="quantity"
                  name="quantity"
                  onChange={handleInputs}
                  value={book.quantity}
                  endAdornment={
                    <InputAdornment position="end">books</InputAdornment>
                  }
                />
                <FormHelperText id="outlined-weight-helper-text">
                  Quantity
                </FormHelperText>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    {/* <InputLabel
                      htmlFor="outlined-adornment-upload"
                      shrink
                    ></InputLabel> */}
                    <OutlinedInput
                      id="logo"
                      onChange={handleInputs}
                      value={book.logo}
                      style={{ width: "100%" }}
                      // type={showPassword ? "text" : "password"}
                      type="file"
                      accept="image/*"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle upload visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {/* <FileUploadIcon /> */}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="upload"
                    />
                  </FormControl>
                </Grid>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
