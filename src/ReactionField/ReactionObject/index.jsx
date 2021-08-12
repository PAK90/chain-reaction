import styles from "./reactionObjectStyle.module.scss";
import { useEffect, useState } from "react";
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
    flipChance,
  } = props;

  const [flipped, setFlipped] = useState(false);
  // const flipHandler = useCallback(
  const flipHandler = (e) => {
    // console.log("flipper! ", e.detail);
    const {
      eventSource,
      radiusOverride,
      chanceOverride,
      reset,
    } = e.detail.additionalData;
    if (reset) {
      setFlipped(false);
    } else {
      const radiusToUse = radiusOverride || blastRadius;
      const chanceToUse = chanceOverride || flipChance;

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

      if (isInRadius && Math.random() < chanceToUse) {
        document.removeEventListener("flipped", flipHandler);
        setTimeout(() => {
          setFlipped(true);
          fireFlipEvent("flipped", { eventSource: midpoint });
        }, 300);
      }
    }
  };
  //   [circleSize, circlePadding, blastRadius]
  // );
  useEffect(() => {
    // document.removeEventListener("flipped", flipHandler);
    document.addEventListener("flipped", flipHandler);
    return () => document.removeEventListener("flipped", flipHandler);
  }, [circleSize, circlePadding, blastRadius, flipChance]);

  const resetFlip = () => {
    setFlipped(false);
    //FIXME: this adds the original one which is tied to default settings.
    document.addEventListener("flipped", flipHandler);
  };

  useEffect(() => {
    document.addEventListener("resetFlips", resetFlip);
    return () => document.removeEventListener("resetFlips", resetFlip);
  }, []);

  return (
    <div
      style={{
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        margin: `${circlePadding}px`,
        backgroundColor: flipped
          ? "turquoise"
          : state === "unhovered"
          ? "purple"
          : "red",
      }}
      className={styles.container}
    />
  );
}
