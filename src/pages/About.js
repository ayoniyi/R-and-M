import React from "react";

import HeroImg from "../images/scape02.png";

import Header from "../UI/Header";

const About = () => {
  return (
    <div>
      <Header />
      <div className="heroBox">
        <div className="heroContent">
          <img className="heroImg3" src={HeroImg} alt="Rick And Morty" />
        </div>
      </div>
      <section className="cardsContainer">
        <h1 className="subTitle">ABOUT</h1>
        <div className="cardsContainerContent">
          <div className="aboutTextBox">
            <p className="aboutText">
              The Rick and Morty Data Dump is (like the name suggests) a data
              dump project based on the television show Rick and Morty.
            </p>
            <p className="aboutText">
              It contains hundreds of character info and episode info.{" "}
            </p>
            <p className="aboutText">
              The project is filled with canonical information as seen on the TV
              show and was built out of boredom.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
