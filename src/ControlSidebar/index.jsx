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
    circleSize,
    setCircleSize,
    circlePadding,
    setCirclePadding,
    mouseSize,
    setMouseSize,
  } = props;
  return (
    <>
      Width
      <RangeSlider
        value={horizontalCount}
        step={1}
        max={100}
        min={5}
        onChange={(e) => setHorizontalCount(e.target.value)}
      />
      Height
      <RangeSlider
        value={verticalCount}
        step={1}
        max={100}
        min={5}
        onChange={(e) => setVerticalCount(e.target.value)}
      />
      Target size
      <RangeSlider
        value={circleSize}
        step={1}
        max={100}
        min={5}
        onChange={(e) => setCircleSize(Number(e.target.value))}
      />
      Target padding
      <RangeSlider
        value={circlePadding}
        step={1}
        max={100}
        min={0}
        onChange={(e) => setCirclePadding(Number(e.target.value))}
      />
      Mouse size
      <RangeSlider
        value={mouseSize}
        step={1}
        max={100}
        min={5}
        onChange={(e) => setMouseSize(Number(e.target.value))}
      />
    </>
  );
}

ControlSidebar.propTypes = {};
