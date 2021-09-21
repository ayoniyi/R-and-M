import React from "react";
import ReactDOM from "react-dom";
//import Hero from "../UI/Hero";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import HeroImg from "../images/flipn.png";
import ImgE from "../images/img.jpeg";
//import HeroImg from "../images/rm2.png";
import Close from "../images/close.svg";
import Loader from "../UI/loader.gif";

import Header from "../UI/Header";

const portalElement = document.getElementById("overlayMain");

const Episodes = () => {
  const [eps, setEps] = useState([]);
  const [epName, setEpName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showEpisode, setShowEpisode] = useState(false);
  const [epId, setEpId] = useState("");
  const [epData, setEpData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const baseUrl = "https://rickandmortyapi.com/api";

    const loadData = async () => {
      setIsLoading(true);
      try {
        const epsReq = await axios(
          `${baseUrl}/episode/?name=${epName}&page=${currentPage}`
        );
        setEps(epsReq.data.results);
        setTotalPages(epsReq.data.info.pages);
        console.log(epsReq.data.info.pages + "pagesssss");
        console.log(epsReq.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    loadData();
  }, [epName, currentPage]);

  useEffect(() => {
    const getepacter = async () => {
      setIsLoading(true);
      const baseUrl = "https://rickandmortyapi.com/api";

      try {
        if (epId > 0) {
          const epSingleRreq = await axios(`${baseUrl}/episode/${epId}`);
          console.log(epId);
          console.log(epSingleRreq.data);
          setEpData(epSingleRreq.data);
          setShowEpisode(true);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getepacter();
  }, [epId]);

  const handleCloseModal = () => {
    setShowEpisode(false);
    setEpId(0);
  };

  const nextPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
    setEpName("");
  };
  const prevPage = () => {
    if (currentPage <= totalPages) {
      setCurrentPage(currentPage - 1);
    }
    setEpName("");
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
        <h1 className="subTitle">EPISODES</h1>
        {showEpisode && (
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
                  <img src={ImgE} alt="epacter" />
                </div>
                <div className="modalText">
                  <p className="modalName">{epData.name}</p>
                  <p className="modalInfo">
                    {epData.name} episode. ({epData.episode})<br /> First aired
                    on {epData.air_date}.
                    <br />
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
            placeholder="SEARCH EPISODE"
            value={epName}
            onChange={(e) => setEpName(e.target.value)}
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
              {eps !== undefined &&
                eps.map((ep) => (
                  <motion.div className="charSmallImg" key={ep.id}>
                    <img
                      src={ImgE}
                      alt={ep.name}
                      onClick={() => setEpId(ep.id)}
                    />
                    <p>{ep.name}</p>
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
            <p className="pgTxt">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Episodes;
