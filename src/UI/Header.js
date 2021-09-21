import React, { useState } from "react";
//import { NavLink } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
//import { Howl } from "howler";
import { motion } from "framer-motion";
import ReactHowler from "react-howler";

import "./Header.css";
import "./Menu.css";

import Logo from "../images/rmlog.png";
// import NavIcon from "../images/nav.svg";
// import Close from "../images/close.svg";

import Audio from "../sound/theme.mp3";
import musicLogo from "../images/music.svg";

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  //const [showMenu, setshowMenu] = useState(false);
  const [showMenuList, setshowMenuList] = useState(false);

  // const playTheme = (event) => {
  //   const sound = new Howl({
  //     src: [Audio],
  //     volume: 0.3,
  //   });
  //   sound.play();
  // };

  return (
    <div className="headerBox">
      <ReactHowler
        //src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
        src={Audio}
        playing={isPlaying}
      />
      {/* **** USEFUL SNIPPET ****
      <NavLink activeClassName="activeLink" to="/not">
        <p>Not Found Page</p>
      </NavLink> ****
      */}
      <div className="headerContent">
        <div className="logoBox">
          <Link to="/">
            <img className="logo" src={Logo} alt="Logo" />
          </Link>

          <div className="toggleBox">
            <img className="musicLogo" src={musicLogo} alt="music" />
            <label className="switch-toggle">
              <input
                onChange={() => setIsPlaying(!isPlaying)}
                type="checkbox"
                name="2fa"
                //defaultChecked
              />
              <span className="slider-toggle round"></span>
            </label>
          </div>
        </div>
        {/* <img className="navIcon" src={NavIcon} alt="Menu" /> */}
        {/* Mobile Menu */}
        <div className="menu-wrap ">
          <input
            type="checkbox"
            className="toggler"
            onChange={() => setshowMenuList(!showMenuList)}
          />
          <div className="hamburger">
            <div></div>
          </div>
          <div className="menu showMenuX">
            {/* <div className="menuClose"> */}
            {/* <img className="menuClose" src={Close} alt="close" /> */}
            {/* </div> */}

            <div>
              <div>
                {showMenuList && (
                  <ul>
                    <motion.li
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {
                          opacity: 0,
                          scale: 0.2,
                        },
                        visible: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            delay: 0.4,
                            duration: 0.4,
                          },
                        },
                      }}
                    >
                      <NavLink to="/characters">CHARACTERS</NavLink>
                    </motion.li>
                    <motion.li
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {
                          opacity: 0,
                          scale: 0.2,
                        },
                        visible: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            delay: 0.6,
                            duration: 0.4,
                          },
                        },
                      }}
                    >
                      <Link to="/episodes">EPISODES</Link>
                    </motion.li>
                    <motion.li
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {
                          opacity: 0,
                          scale: 0.2,
                        },
                        visible: {
                          scale: 1,
                          opacity: 1,
                          transition: {
                            delay: 0.8,
                            duration: 0.4,
                          },
                        },
                      }}
                    >
                      <Link to="#connect">ABOUT</Link>
                    </motion.li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* .... */}
      </div>
    </div>
  );
};

export default Header;
