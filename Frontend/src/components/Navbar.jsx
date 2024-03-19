import Image from '../assets/bgImg.jpeg';
import Profile from '../assets/Profile.png';
import './Navbar.css'; 
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav>
        <div id="left-nav">
          <img src={Image} alt="Image" />
          <p>Wisdom Nexus</p>
        </div>
        <div id="right-nav">
          <div className="inactive">
            <Link
              to={"/"}
              className="homeLink"
              style={{ textDecoration: "none" }}>
              <p>Home</p>
            </Link>
          </div>
          <div className="inactive">
            <Link to={"/donate_books"}  style={{textDecoration: "none"}} >
                    <p>Donate Books</p>
                    </Link>
          </div>
          <div className="inactive">
            <p>About us</p>
          </div>

          <img src={Profile} alt="Profile" className="profile"  />
        </div>
      </nav>
    );
};

export default Navbar;

