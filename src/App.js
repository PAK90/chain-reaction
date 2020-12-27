import logo from "./logo.svg";
import styles from "./App.module.scss";
import ControlSidebar from "./ControlSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import ReactionField from "./ReactionField";
import { useState } from "react";

function App() {
  const [horizontalCount, setHorizontalCount] = useState(10);
  const [verticalCount, setVerticalCount] = useState(10);

  return (
    <div className={styles.App}>
      <div className={styles.sidebar}>
        <ControlSidebar
          horizontalCount={horizontalCount}
          setHorizontalCount={setHorizontalCount}
          verticalCount={verticalCount}
          setVerticalCount={setVerticalCount}
        />
      </div>
      <div className={styles.main}>
        <ReactionField
          horizontalCount={horizontalCount}
          verticalCount={verticalCount}
        />
      </div>
    </div>
  );
}

export default App;
