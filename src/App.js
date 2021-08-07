import logo from "./logo.svg";
import styles from "./App.module.scss";
import ControlSidebar from "./ControlSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import ReactionField from "./ReactionField";
import React, { useRef, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";

function App() {
  const [horizontalCount, setHorizontalCount] = useState(10);
  const [verticalCount, setVerticalCount] = useState(10);
  const [circleSize, setCircleSize] = useState(20);
  const [circlePadding, setCirclePadding] = useState(0);
  const [mouseSize, setMouseSize] = useState(50);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blastRadius, setBlastRadius] = useState(30);
  const [flipChance, setFlipChance] = useState(1);

  const fieldRef = useRef(null);

  return (
    <div className={styles.App}>
      <div className={styles.sidebar}>
        <ControlSidebar
          horizontalCount={horizontalCount}
          setHorizontalCount={setHorizontalCount}
          verticalCount={verticalCount}
          setVerticalCount={setVerticalCount}
          circleSize={circleSize}
          setCircleSize={setCircleSize}
          circlePadding={circlePadding}
          setCirclePadding={setCirclePadding}
          mouseSize={mouseSize}
          setMouseSize={setMouseSize}
          blastRadius={blastRadius}
          setBlastRadius={setBlastRadius}
          flipChance={flipChance}
          setFlipChance={setFlipChance}
        />
        <div>{`${mousePos.x}, ${mousePos.y}`}</div>
      </div>
      <div
        className={styles.main}
        ref={fieldRef}
        onMouseMove={(e) => {
          const { offsetLeft, offsetTop } = fieldRef.current;
          setMousePos({ x: e.clientX - offsetLeft, y: e.clientY - offsetTop });
        }}
      >
        <ReactionField
          circleSize={circleSize}
          circlePadding={circlePadding}
          mouseSize={mouseSize}
          mousePos={mousePos}
          horizontalCount={horizontalCount}
          verticalCount={verticalCount}
          blastRadius={blastRadius}
          flipChance={flipChance}
        />

        {/*<div className={styles.sidebar}>*/}
        {/*  <RangeSlider*/}
        {/*    value={blastRadius}*/}
        {/*    step={1}*/}
        {/*    max={100}*/}
        {/*    min={5}*/}
        {/*    onChange={(e) => setBlastRadius(Number(e.target.value))}*/}
        {/*  />*/}
        {/*  <RangeSlider*/}
        {/*    value={flipChance}*/}
        {/*    step={0.01}*/}
        {/*    max={1}*/}
        {/*    min={0.01}*/}
        {/*    onChange={(e) => setFlipChance(Number(e.target.value))}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default App;
