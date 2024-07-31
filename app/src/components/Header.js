import React from "react";
import logo from "../images/logo.png";
import Navbar from "./Navbar";

const HeroSection = () => (
  
    <div className="Header mt-5 pt-4 text-center">
      <div className="mt-1 mb-1">
        <h5 className="headline">Ford Fiesta Treffen & Events</h5>
        <img src={logo} alt="Logo" height="50" />
        <hr className="hr1 shadow-lg" />
      </div>
      <Navbar />
    </div>
    
  
);

export default HeroSection;
