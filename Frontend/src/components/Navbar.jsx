
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Image from '../assets/bgImg.jpeg';
import Profile from '../assets/Profile.png';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto Slab, serif',
  fontWeight: 800,
  color: theme.palette.secondary.main,
  fontSize: '2rem',
  marginLeft: theme.spacing(1),
}));

const NavButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '2px 15px 2px 15px',
  padding: '5px 10px',
  margin: '0 10px',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
  },
}));

const Navbar = () => {
  return (
    <AppBar position="fixed" color="primary" elevation={3}>
      <StyledToolbar>
        <Box display="flex" alignItems="center">
          <img src={Image} alt="Logo" style={{ height: 80, marginRight: 10 }} />
          <LogoTypography variant="h1">
            Wisdom Nexus
          </LogoTypography>
        </Box>
        <Box display="flex" alignItems="center">
          <NavButton component={Link} to="/" color="inherit">
            Home
          </NavButton>
          <NavButton component={Link} to="/donate_books" color="inherit">
            Donate Books
          </NavButton>
          <NavButton color="inherit">
            About us
          </NavButton>
          <Avatar
            component={Link}
            to="/login"
            src={Profile}
            alt="Profile"
            sx={{ 
              width: 40, 
              height: 40, 
              marginLeft: 2,
              cursor: 'pointer'
            }}
          />
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
