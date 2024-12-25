import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container, Fade } from "@mui/material";
import { keyframes } from "@emotion/react";

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

function WelcomeContent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Fade in={show} timeout={1000}>
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'orange',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, 
            animation: `${slideInFromLeft} 1s ease-out forwards`,
            mb: 1, 
          }}
        >
          Wisdom Nexus
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{
            fontStyle: 'italic',
            color: 'text.secondary',
            animation: `${fadeIn} 1s ease-out 0.5s forwards`,
            opacity: 0,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }, 
          }}
        >
          "If you don't like to read, you haven't found the right book." - J.K. Rowling
        </Typography>
      </Box>
    </Fade>
  );
}

function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        py: 4, 
      }}
    >
      <Container 
        maxWidth="md" 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4, 
          pt: { xs: 4, sm: 6, md: 8 }, 
        }}
      >
        <Box
          component="img"
          src="https://media.giphy.com/media/3oz8xEp3XnQSYzvBlu/giphy.gif?cid=790b76119bwmdeg7ietulhpibgyghynru51tr03qazoehwvt&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          alt="LandingImage"
          sx={{
            width: { xs: '100%', sm: '80%', md: '70%' },
            height: 'auto',
            maxHeight: { xs: '300px', sm: '350px', md: '400px' },
            objectFit: "contain",
            display: 'block',
            mx: 'auto',
            mt: { xs: 2, sm: 3, md: 4 }, 
          }}
        />
        <WelcomeContent />
        <Button
          component={Link}
          to="/library"
          variant="contained"
          color="primary"
          size="large"
          sx={{
         
            px: 4,
            fontSize: '1.1rem',
            textTransform: 'none',
            borderRadius: 2,
            minWidth: 200,
            '&:hover': {
              transform: 'translateY(-2px)',
              transition: 'transform 0.2s',
            },
          }}
        >
          Library
        </Button>
      </Container>
    </Box>
  );
}

export default LandingPage;

