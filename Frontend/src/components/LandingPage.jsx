
import { Link } from "react-router-dom";

import "./LandingPage.css";
import LandingImage from "../assets/landingImage.jpg";

function LandingPage() {
  return (
    <div className="landingDiv">


      <div className="container">
        <img src={LandingImage} alt="LandingImage" className="LandingImage" />
        <div id="welcome">
          <h1>Wisdom Nexus</h1>
          <p>
            &quot;If you don&apos;t like to read, you haven&apos;t found the
            right book.&quot; - J.K. Rowling{" "}
          </p>
        </div>
      </div>

      <Link to={"/library"} className="libraryLink">
        <button className="landingPageButton">Library</button>
      </Link>

    </div>
  );
}

export default LandingPage;
