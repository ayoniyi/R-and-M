import React from "react";

import "./Hero.css";

const Hero = (props) => {
  return (
    <div className="heroBox">
      <div className="heroContent">
        <img className="heroImg" src={props.heroImg} alt="Rick And Morty" />
      </div>
    </div>
  );
};

export default Hero;
