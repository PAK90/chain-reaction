/**
 * Created by Arvids on 2020.12.25..
 */
import React from "react";
import Button from "react-bootstrap/Button";
import RangeSlider from "react-bootstrap-range-slider";
import PropTypes from "prop-types";

export default function ControlSidebar(props) {
  const {
    horizontalCount,
    setHorizontalCount,
    verticalCount,
    setVerticalCount,
  } = props;
  return (
    <>
      <RangeSlider
        value={horizontalCount}
        step={1}
        max={100}
        min={5}
        onChange={(e) => setHorizontalCount(e.target.value)}
      />
      <RangeSlider
        value={verticalCount}
        step={1}
        max={100}
        min={5}
        onChange={(e) => setVerticalCount(e.target.value)}
      />
    </>
  );
}

ControlSidebar.propTypes = {};
