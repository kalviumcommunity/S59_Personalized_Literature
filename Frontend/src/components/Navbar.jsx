import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Image from "../assets/bgImg.jpeg";
import Profile from "../assets/Profile.png";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../hooks/use-auth";

function LoginButton() {
    const { isLoggedIn, logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="auth-button"
                aria-controls={open ? "auth-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <Avatar
                    src={Profile}
                    alt="Profile"
                    sx={{
                        width: 40,
                        height: 40,
                        marginLeft: 2,
                        cursor: "pointer",
                    }}
                />
            </Button>
            <Menu
                id="auth-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "auth-button",
                }}
            >
                {isLoggedIn ? (
                    <>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem
                            onClick={async () => {
                                await logout();
                                handleClose();
                            }}
                        >
                            Logout
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem onClick={handleClose} component={Link} to="/login">
                            Login
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/register">
                            Register
                        </MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Roboto Slab, serif",
    fontWeight: 800,
    color: theme.palette.secondary.main,
    fontSize: "2rem",
    marginLeft: theme.spacing(1),
}));

const NavButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: "2px 15px 2px 15px",
    padding: "5px 10px",
    margin: "0 10px",
    "&:hover": {
        backgroundColor: theme.palette.background.default,
    },
}));

const Navbar = () => {
    return (
        <AppBar position="fixed" color="primary" elevation={3}>
            <StyledToolbar>
                <Box display="flex" alignItems="center" component={Link} to="/" style={{textDecoration: "none"}}>
                    <img src={Image} alt="Logo" style={{ height: 80, marginRight: 10 }} />
                    <LogoTypography variant="h1">Wisdom Nexus</LogoTypography>
                </Box>
                <Box display="flex" alignItems="center">
                    <NavButton component={Link} to="/" color="inherit">
                        Home
                    </NavButton>
                    <NavButton component={Link} to="/donate_books" color="inherit">
                        Donate Books
                    </NavButton>
                    <NavButton color="inherit">About us</NavButton>
                    <LoginButton />
                </Box>
            </StyledToolbar>
        </AppBar>
    );
};

export default Navbar;
