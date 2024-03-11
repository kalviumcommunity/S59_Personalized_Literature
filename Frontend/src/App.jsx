import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Library from "./components/Library";

function App() {
  return (
    <>

      <Navbar />
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </>
  );
}

export default App;
