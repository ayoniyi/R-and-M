import React from "react";

import Hero from "../UI/Hero";
import InitialData from "../components/InitialData";

import HeroImg from "../images/png/guns.png";
import Header from "../UI/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero heroImg={HeroImg} />
      <InitialData />
    </div>
  );
};

export default Home;
