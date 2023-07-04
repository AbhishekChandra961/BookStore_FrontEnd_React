import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Stack from "@mui/material/Stack";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "../../Css/styleIt.css";
import shadows from "@mui/material/styles/shadows";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserData from "../../Service/UserService/UserData";
import ButtonGroup from "@mui/material/ButtonGroup";

const pages = ["About"];
const settings = ["Profile", "Orders", "Logout"];

function Header({ userDetails }) {
  const navigate = useNavigate();
  let initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: null,
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(initialValue);
  const hasToken = localStorage.getItem("token");
  // console.log(hasToken);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenSetting = (setting) => {
    if (setting === "Profile") {
      navigate("/");
    } else if (setting === "Orders") {
      navigate("/order");
    } else if (setting === "Logout") {
      localStorage.clear();
      window.location.reload();
    }
  };

  let userData = () => {
    UserData.getUserByToken(localStorage.getItem("token"))
      .then((response) => {
        console.log(response.data);
        let obj = response.data;
        setUser(obj);
        userDetails(obj);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    userData();
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BOOK STORE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MenuItem
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </MenuItem>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalLibraryIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BOOK STORE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {hasToken ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Button
                    variant="contained"
                    href="#contained-buttons"
                    style={{ background: "white", color: "#1976d2" }}
                  >
                    Welcome {user.firstName} {user.lastName}
                  </Button>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleOpenSetting(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Stack direction="row" spacing={1}>
                <Link to={"/signup"}>
                  <Button
                    variant="contained"
                    startIcon={<LockOpenIcon />}
                    style={{
                      background: "white",
                      color: "#1976d2",
                    }}
                  >
                    SignUp
                  </Button>
                </Link>
                <Link to={"/signin"}>
                  <Button variant="contained" endIcon={<VpnKeyIcon />}>
                    SignIn
                  </Button>
                </Link>
              </Stack>
            </ButtonGroup>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
