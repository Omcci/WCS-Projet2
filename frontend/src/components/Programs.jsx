import React from "react";
import PropTypes from "prop-types";
import Start from "./Start";

// import Week from "@components/Week";

function Programs({ week }) {
  console.warn(Array.from({ length: week }, (v, k) => k + 1));

  return (
    <>
      <h2>Here are our programs</h2>
      <p>Start here</p>
      <Start />
    </>
  );
}

export default Programs;

Programs.propTypes = {
  week: PropTypes.number.isRequired,
};