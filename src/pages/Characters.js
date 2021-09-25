import React from "react";
import ReactDOM from "react-dom";
//import Hero from "../UI/Hero";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import HeroImg from "../images/flipn.png";
//import HeroImg from "../images/rm2.png";
import Close from "../images/close.svg";
import Loader from "../UI/loader.gif";
import "./Characters.css";
import Header from "../UI/Header";

const portalElement = document.getElementById("overlayMain");

const Characters = () => {
  const [chars, setChars] = useState([]);
  const [charName, setCharName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCharacter, setShowCharacter] = useState(false);
  const [charId, setCharId] = useState("");
  const [charData, setCharData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [showNext, setShowNext] = useState(false);
  // const [showPrev, setShowPrev] = useState(false);

  useEffect(() => {
    const baseUrl = "https://rickandmortyapi.com/api";

    const loadData = async () => {
      setIsLoading(true);
      try {
        const charsRreq = await axios(
          `${baseUrl}/character/?name=${charName}&page=${currentPage}`
        );
        setChars(charsRreq.data.results);
        setTotalPages(charsRreq.data.info.pages);
        //console.log(charsRreq.data.info.pages + "pagesssss");
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    loadData();
  }, [charName, currentPage]);

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

  const nextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
    setCharName("");
  };
  const prevPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage - 1);
    }
    setCharName("");
  };

  return (
    <>
      <Header />
      <div className="heroBox">
        <div className="heroContent">
          <img className="heroImg2" src={HeroImg} alt="Rick And Morty" />
        </div>
      </div>
      <section className="cardsContainer2">
        <h1 className="subTitle">CHARACTERS</h1>
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

        <div className="searchBox-container">
          <input
            className="searchInput"
            placeholder="SEARCH CHARACTER"
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
          />
        </div>
        {isLoading && (
          <div className="loaderBox">
            <img src={Loader} alt="loading..." />
          </div>
        )}
        {!isLoading && (
          <div className="cardsContainerContent">
            <div className="charSmallImgs">
              {chars !== undefined &&
                chars.map((char) => (
                  <motion.div className="charSmallImg" key={char.id}>
                    <img
                      src={char.image}
                      alt={char.name}
                      onClick={() => setCharId(char.id)}
                    />
                    <p>{char.name}</p>
                  </motion.div>
                ))}
            </div>
            <div className="paginateBox">
              {currentPage > 1 && (
                <button className="pgBtns" onClick={prevPage}>
                  {"<<"}
                </button>
              )}
              {currentPage < totalPages && (
                <button className="pgBtns2" onClick={nextPage}>
                  {">>"}
                </button>
              )}
            </div>
            {!isLoading && (
              <p className="pgTxt">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Characters;
