import React from "react";
import logo from "../images/logo.png";
import Navbar from "./Navbar";

const HeroSection = () => (
  <div className="Header text-center sticky-top">
    <Navbar />
    <div>
      <h1 className="mt-3 headline">Ford Fiesta Treffen & Events</h1>
      <img src={logo} alt="Logo" height="100" />
      <hr className="hr1 shadow-lg" />
    </div>
  </div>
);

export default HeroSection;
