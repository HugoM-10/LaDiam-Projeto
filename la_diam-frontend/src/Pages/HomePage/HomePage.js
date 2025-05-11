import React from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./_Home/Home";
import FAQ from "./FAQ/Faq";
import AboutUs from "./AboutUs/AboutUs";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <FAQ />
      <AboutUs />
    </div>
  );
};

export default HomePage;
