import Image from '../assets/bgImg.jpeg';
import Profile from '../assets/Profile.png';
import './Navbar.css'; 

const Navbar = () => {
    return (
     <nav>
        <div id="left-nav">
            <img src={Image} alt="Image"/>
            <p>Wisdom Nexus</p>
        </div>
        <div id="right-nav">
            <div className="inactive">
                <p>Home</p>
            </div>
            <div className="inactive"> 
                    <p>Contacts</p>
                   </div>
            <div className="inactive">
                    <p>About us</p>
                </div>

            <img src={Profile} alt="Profile" className='profile'/>
        </div>
    </nav>
    );
};

export default Navbar;
