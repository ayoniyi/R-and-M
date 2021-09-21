import React from "react";
//import Header from "../UI/Header";
import Hero from "../UI/Hero";

import HeroImg from "../images/flippeace2.png";

const NotFound = () => {
  return (
    <div>
      {/* <Header /> */}
      <Hero heroImg={HeroImg} />
      <h1>Not Found</h1>
    </div>
  );
};

export default NotFound;
