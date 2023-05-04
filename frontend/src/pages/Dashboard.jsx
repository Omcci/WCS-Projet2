/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { Pagination } from "swiper";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Day from "../components/Day";
import mb1 from "../assets/mb1.png";
import bw1 from "../assets/bw1.png";
import backarrow from "../assets/back-arrow.svg";

export default function Dashboard({ day, exercises, mb, bw }) {
  const dayArr = Array.from({ length: day }, (v, k) => k + 1);
  const weekArr = Array.from({ length: 12 }, (v, k) => k + 1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [weekLeft, setWeekLeft] = useState(12);
  const [openPopUp, setOpenPopUp] = useState(false);

  const handleCheck = (e) => {
    e.stopPropagation();
    if (e.target.checked) {
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, "3000");
    }
  };
  const progMuscleBuilding = weekArr.map((a, i) => {
    return (
      <div key={weekArr.indexOf(a)}>
        <Accordion
          sx={{
            backgroundColor: "white !important",
            borderRadius: "16px !important",
            border: "none",
            color: "black",
            margin: "4px auto 4px auto",
            width: "100%",
            fontFamily: "Arial !important",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <input
              type="checkbox"
              className="validate"
              onClick={(e) => {
                handleCheck(e);
                setWeekLeft(11 - i);
              }}
            />
            <p>Week {i + 1}</p>
          </AccordionSummary>
          <AccordionDetails>
            {dayArr.map((e, index) => {
              return (
                <Day
                  key={dayArr.indexOf(e)}
                  prog={mb[index]}
                  exercises={exercises}
                  index={index}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });
  const progBodyweight = weekArr.map((a, i) => {
    return (
      <div key={weekArr.indexOf(a)}>
        <Accordion
          sx={{
            backgroundColor: "white !important",
            borderRadius: "16px !important",
            border: "none",
            color: "black",
            margin: "4px auto 4px auto",
            width: "100%",
            fontFamily: "Arial !important",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <input
              type="checkbox"
              className="validate"
              onClick={(e) => {
                handleCheck(e);
                setWeekLeft(11 - i);
              }}
            />
            <p>Week {i + 1}</p>
          </AccordionSummary>
          <AccordionDetails>
            {dayArr.map((e, index) => {
              return (
                <Day
                  key={dayArr.indexOf(e)}
                  prog={bw[index]}
                  exercises={exercises}
                  index={index}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nav = useNavigate();

  const handleNav = () => {
    nav(-1);
  };

  const [imgSelect, setImgSelect] = useState(1);

  return (
    <>
      <div className="dashboard-container">
        <div className="arrow-title">
          <Link to="/" onClick={handleNav}>
            <img className="backarrow" src={backarrow} alt="backarrow" />
          </Link>
          <h2>Dashboard</h2>
        </div>
        <p id="dash-title">My programs</p>
        <div id="swiper-dash">
          <Swiper
            spaceBetween={30}
            pagination
            modules={[Pagination]}
            onSlideChange={(swiper) =>
              setTimeout(() => {
                setActiveIndex(swiper.activeIndex);
              }, "100")
            }
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="imgprog" src={mb1} alt="musclebuilding" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="imgprog" src={bw1} alt="bodyweight" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="gallery-dash">
          <img
            src={mb1}
            alt=""
            className={imgSelect === 1 ? "imgprog selected" : "imgprog"}
            onClick={() => {
              setImgSelect(1);
              setTimeout(() => {
                setActiveIndex(0);
              }, "100");
            }}
          />
          <img
            src={bw1}
            alt=""
            className={imgSelect === 2 ? "imgprog selected" : "imgprog"}
            onClick={() => {
              setImgSelect(2);
              setTimeout(() => {
                setActiveIndex(1);
              }, "100");
            }}
          />
          <div className="emptyprog" />
          <div className="emptyprog" />
        </div>
        <div className="dashboard1">
          {activeIndex === 0 && progMuscleBuilding}
        </div>
        <div className="dashboard2">{activeIndex !== 0 && progBodyweight}</div>
      </div>
      <div className={openPopUp ? "popup-week alert" : "popup-week"}>
        <p>
          {weekLeft > 0
            ? `Keep going ! ${weekLeft} ${
                weekLeft === 1 ? "week" : "weeks"
              } to go !`
            : `Congratulations ! You did it !`}
        </p>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  day: PropTypes.number.isRequired,
  mb: PropTypes.arrayOf(PropTypes.shape).isRequired,
  bw: PropTypes.arrayOf(PropTypes.shape).isRequired,
  exercises: PropTypes.arrayOf(PropTypes.shape).isRequired,
};