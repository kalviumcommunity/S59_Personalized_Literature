import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Library from "./components/Library";
import DonateBooks from "./components/DonateBooks";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/donate_books" element={<DonateBooks />} />
      </Routes>
    </>
  );
}

export default App;
