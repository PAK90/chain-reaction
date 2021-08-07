import logo from "./logo.svg";
import styles from "./App.module.scss";
import ControlSidebar from "./ControlSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import ReactionField from "./ReactionField";
import { useRef, useState } from "react";

function App() {
  const [horizontalCount, setHorizontalCount] = useState(10);
  const [verticalCount, setVerticalCount] = useState(10);
  const [circleSize, setCircleSize] = useState(20);
  const [circlePadding, setCirclePadding] = useState(0);
  const [mouseSize, setMouseSize] = useState(50);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        />
        <div>{`${mousePos.x}, ${mousePos.y}`}</div>
      </div>
      <div
        className={styles.main}
        ref={fieldRef}
        onMouseMove={(e) => {
          // console.log(e, fieldRef);
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
        />
      </div>
    </div>
  );
}

export default App;
