import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";

//import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./InitialData.css";
import Loader from "../UI/loader.gif";
//import Cover2 from "../images/cover2.jpeg";
import CoverD from "../images/png/coverdrk2.png";
import CoverD2 from "../images/png/cover2drk.png";
//import CoverD3 from "../images/png/coverdrk3.png";
//import Ep from "../images/flippeace.png";
import Close from "../images/close.svg";

const portalElement = document.getElementById("overlayMain");

const InitialData = () => {
  const [chars, setChars] = useState([]);
  const [eps, setEps] = useState([]);
  //const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCharacter, setShowCharacter] = useState(false);
  const [charId, setCharId] = useState("");
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    const baseUrl = "https://rickandmortyapi.com/api";

    const loadData = async () => {
      //   const rIds = Array.from({ length: 4 }, () =>
      //     Math.floor(Math.random() * 40)
      //   );
      try {
        const rIds = Array(6)
          .fill()
          .map(() => Math.round(Math.random() * 40));
        //const lIds = [3, 4, 22, 24, 32, 36, 38, 40];
        const epIds = [1, 3, 5, 7, 9, 13, 15, 17];

        const charsRreq = await axios(`${baseUrl}/character/${rIds}`);
        //console.log(rIds);
        setChars(charsRreq.data);

        const epsRreq = await axios(`${baseUrl}/episode/${epIds}`);
        setEps(epsRreq.data);
        //console.log(epsRreq.data);

        // const locationsRreq = await axios(`${baseUrl}/location/${lIds}`);
        // setLocations(locationsRreq.data);
        // console.log(locationsRreq.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const getCharacter = async () => {
      setIsLoading(true);
      const baseUrl = "https://rickandmortyapi.com/api";

      try {
        if (charId > 0) {
          const charSingleRreq = await axios(`${baseUrl}/character/${charId}`);
          console.log(charId);
          console.log(charSingleRreq.data);
          setCharData(charSingleRreq.data);
          setShowCharacter(true);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getCharacter();
  }, [charId]);

  const handleCloseModal = () => {
    setShowCharacter(false);
    setCharId(0);
  };

  // *** USEFUL SNIPPET
  // let history = useHistory();

  // const redirect = (event) => {
  //   setTimeout(() => {
  //     history.push("/not");
  //   }, 1500);
  //   event.preventDefault();
  // };
  // ****

  // const slideSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3.2,
  //   // slidesToScroll: 0,
  //   focusOnSelect: true,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   arrows: false,
  // };

  return (
    <>
      <section className="cardsContainer">
        <h1 className="homeTitle">THE DATA DUMP</h1>
        {showCharacter && (
          <div>
            {ReactDOM.createPortal(
              <div
                className="overlay animate__animated animate__fadeIn "
                onClick={handleCloseModal}
              ></div>,
              portalElement
            )}
            {ReactDOM.createPortal(
              <motion.div
                className="modal"
                initial="pageInitial"
                animate="pageAnimate"
                exit="pageExit"
                variants={{
                  pageInitial: {
                    // opacity: 0,
                    scale: 0.4,
                  },
                  pageAnimate: {
                    // opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.7,
                      type: "spring",
                    },
                  },
                  pageExit: {
                    scale: 1.4,
                    opacity: 0,
                    //filter: `invert()`,
                    transition: {
                      duration: 0.4,
                    },
                  },
                }}
              >
                <div className="modalClose">
                  <img src={Close} alt="close" onClick={handleCloseModal} />
                </div>
                <div className="modalImg">
                  <img src={charData.image} alt="character" />
                </div>
                <div className="modalText">
                  <p className="modalName">{charData.name}</p>
                  <p className="modalInfo">
                    {charData.name} is of the {charData.species} species,
                    <br /> current status : {charData.status},
                    <br /> gender: {charData.gender}, <br />
                    originally from : {charData.origin.name},
                    <br /> last known location : {charData.location.name},
                    <br /> first appearance: episode{" "}
                    {charData.episode[0].substr(40)}
                  </p>
                </div>
              </motion.div>,
              portalElement
            )}
          </div>
        )}
        {isLoading && (
          <div className="loaderBox">
            <img src={Loader} alt="loading..." />
          </div>
        )}
        {!isLoading && (
          <div className="cardsContainerContent">
            <div className="homeCard">
              <div className="homeCardContent">
                <div className="cardBigImg">
                  <div className="cardBigImgB">
                    <img src={CoverD2} alt="Characters" />
                  </div>
                  <div className="cardBigOverlay">
                    <h2>CHARACTERS</h2>
                  </div>
                </div>
                <div className="cardRight">
                  <div className="mbBox">
                    <Link to="/characters">
                      <button className="moreBtn">All Characters</button>
                    </Link>
                  </div>
                  <div className="cardSmallImgs">
                    {chars !== undefined &&
                      chars.map((char) => (
                        <motion.div className="cardSmallImg" key={char.id}>
                          <img
                            src={char.image}
                            alt={char.name}
                            onClick={() => setCharId(char.id)}
                          />
                          <p>{char.name}</p>
                        </motion.div>
                      ))}
                  </div>

                  {/* <Slider {...slideSettings} className="cardSmallSlides">
                      {chars !== undefined &&
                        chars.map((char) => (
                          <div className="cardSlidesImg" key={char.id}>
                            <img
                              src={char.image}
                              alt={char.name}
                              onClick={() => setCharId(char.id)}
                            />
                            <p>{char.name}</p>
                          </div>
                        ))}
                    </Slider> */}
                </div>
              </div>
            </div>

            <div className="homeCard">
              <div className="homeCardContent2">
                <div className="cardBox">
                  <div className="mbBox2">
                    <Link to="/episodes">
                      <button className="moreBtn">All Episodes</button>
                    </Link>
                  </div>
                  <ul className="cardEps">
                    {eps !== undefined &&
                      eps.map((ep) => (
                        <div className="cardEp" key={ep.id}>
                          {/* <img src={item.image} alt={item.name} /> */}
                          <li>{ep.episode}</li>
                          <p>{ep.name}</p>
                        </div>
                      ))}
                  </ul>
                </div>
                <div className="cardBoxL">
                  <div className="cardBigImg">
                    <div className="cardBigImgB2">
                      <img src={CoverD} alt="Characters" />
                    </div>
                    <div className="cardBigOverlay2">
                      <h2>EPISODES</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="homeCard">
              <div className="homeCardContent">
                <div className="cardBox2">
                  <ul className="cardLocs">
                    {locations !== undefined &&
                      locations.map((locale) => (
                        <div className="cardLoc" key={locale.id}>
                          <li>Dimension : {locale.dimension}</li>
                          <p>Location: {locale.name}</p>
                        </div>
                      ))}
                  </ul>
                </div>
                <div className="cardBoxL2">
                  <div className="mbBox">
                    <button className="moreBtn">All Locations</button>
                  </div>
                  <div className="cardBigImg">
                    <div className="cardBigImgB2">
                      <img src={CoverD3} alt="Characters" />
                    </div>
                    <div className="cardBigOverlay2">
                      <h2>LOCATIONS</h2>
                    </div>
                  </div>
                </div>
                <div className="cardBox2">
                  <ul className="cardLocs">
                    {locations !== undefined &&
                      locations.map((locale) => (
                        <div className="cardLoc2" key={locale.id}>
                          <li>Dimension : {locale.dimension}</li>
                          <p>Location: {locale.name}</p>
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </section>
    </>
  );
};

export default InitialData;
