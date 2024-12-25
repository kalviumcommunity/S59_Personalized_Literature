import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {  Routes, Route } from "react-router-dom";
import theme from "./components/theme"; 
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Library from "./components/Library";
import DonateBooks from "./components/DonateBooks";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/donate_books" element={<DonateBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
