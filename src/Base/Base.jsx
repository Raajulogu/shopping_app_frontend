import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React, {  useState } from "react";
  import MenuIcon from "@mui/icons-material/Menu";
  import { useNavigate } from "react-router-dom";
  import "./Base.css";
  import HomeIcon from '@mui/icons-material/Home';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  
  const Base = ({ children,cart }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navigate = useNavigate();
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

  
    const handleCloseNavMenu = (url) => {
      setAnchorElNav(null);
    };
  

  
    return (
      <div className="base-container">
        <header className="base-header">
          <nav>
            <AppBar position="static"
            sx={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(31,50,96,1) 37%, rgba(0,212,255,1) 100%)"}}
            >
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
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
                    <img
                      src="https://w7.pngwing.com/pngs/784/183/png-transparent-shopify-logo-e-commerce-business-super-sale-angle-text-service.png"
                      style={{
                        height: "100px",
                        width: "100px",
                        display: { xs: "none", md: "flex" },
                      }}
                      alt=""
                    />
                  </Typography>
  
                  <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
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
                      <MenuItem onClick={() => navigate("/")}>
                        <Typography textAlign="center">Home</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/cart")}>
                        <Typography textAlign="center">Cart<sup>{cart.length}</sup></Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
  
                  <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    <Button
                      onClick={() => navigate("/")}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <HomeIcon/>
                    </Button>
                    <Button
                      onClick={() => navigate("/cart")}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      <ShoppingCartIcon/><sup>{cart.length}</sup>
                    </Button>
                  </Box>
  
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="User">
                      <IconButton sx={{ p: 0 }}>
                        <Avatar
                          src="/static/images/avatar/2.jpg"
                          sx={{ height: "70px", width: "70px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          </nav>
        </header>
        <main className="main-child">{children}</main>
      </div>
    );
  };
  
  export default Base;