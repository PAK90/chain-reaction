import styles from "./reactionObjectStyle.module.scss";
import { useCallback, useEffect, useState } from "react";
import isPointInRange from "../../helpers/isPointInRange";
import getMidpoint from "../../helpers/getMidpoint";
import fireFlipEvent from "../../helpers/fireFlippedEvent";

export default function ReactionObject(props) {
  const {
    circleSize,
    circlePadding,
    state = "unhovered",
    blastRadius,
    position,
  } = props;

  const [flipped, setFlipped] = useState(false);
  // need to useCallback for the props being passed and updated as the reactionField changes.
  const flipHandler = useCallback(
    (e) => {
      // console.log("flipper! ", e.detail);
      const { eventSource, radiusOverride, reset } = e.detail.additionalData;
      if (reset) {
        setFlipped(false);
      } else {
        const radiusToUse = radiusOverride || blastRadius;

        const midpoint = getMidpoint(
          position.x,
          position.y,
          circleSize,
          circlePadding
        );
        const isInRadius = isPointInRange(
          eventSource.x,
          eventSource.y,
          midpoint.x,
          midpoint.y,
          radiusToUse
        );
        if (isInRadius) {
          setFlipped(true);
          document.removeEventListener("flipped", flipHandler);
          fireFlipEvent({ eventSource: midpoint });
        }
      }
    },
    [circleSize, circlePadding, blastRadius]
  );
  useEffect(() => {
    document.addEventListener("flipped", flipHandler);
    return () => document.removeEventListener("flipped", flipHandler);
  }, []);

  // let colour = "purple";
  // if (state === "hovered") {
  //   colour = "red";
  // } else if (state === "flipped") {
  //   colour = "blue";
  // }
  return (
    <div
      style={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        margin: `${circlePadding}px`,
        backgroundColor: flipped
          ? "blue"
          : state === "unhovered"
          ? "purple"
          : "red",
      }}
      className={styles.container}
    />
  );
}
